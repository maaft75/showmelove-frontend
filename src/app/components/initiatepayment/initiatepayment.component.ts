import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/Services/payment/payment.service';
import { FundraiserService } from 'src/app/Services/fundraiser/fundraiser.service';
import { Transactions } from 'src/app/Models/Transactions';
import { PatchCurrentAmount } from 'src/app/Models/PatchCurrentAmount';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-initiatepayment',
  templateUrl: './initiatepayment.component.html',
  styleUrls: ['./initiatepayment.component.css']
})
export class InitiatepaymentComponent implements OnInit {
  
  fundRaiser : any;
  flowRef : string;
  donatedBy : string;
  otpForm : FormGroup;
  patchedList : any = [];
  fundraiserId : string;
  donateForm : FormGroup;
  button : boolean = true;
  current_amount : Number;
  New_current_amount : Number;
  donateFormWithPin : FormGroup;
  chargeResponseMessage : string;
  initiateButton : boolean = true;
  pinModal : string = "display: none;";
  otpModal : string = "display: none;"
  initiateWithPinButton : boolean = true;
  validateWithOtpButton : boolean = true;
  
  constructor(private fb : FormBuilder, 
    private activatedRoute : ActivatedRoute,
    private paymentService : PaymentService,
    private fundraiserService : FundraiserService) {
      this.donateForm = this.fb.group({
        "cardno": ["", Validators.required],
        "cvv": ["", Validators.required],
        "expirymonth": ["", Validators.required],
        "expiryyear": ["", Validators.required],
        "currency": ["NGN", Validators.required],
        "amount": ["", Validators.required],
        "email": ["", Validators.required],
        "firstname": ["", Validators.required],
        "lastname": ["", Validators.required],
        "phonenumber": ["", Validators.required],
        "txRef" : [""]
      }),

      this.donateFormWithPin = this.fb.group({
        "cardno": ["", Validators.required],
        "cvv": ["", Validators.required],
        "expirymonth": ["", Validators.required],
        "expiryyear": ["", Validators.required],
        "currency": ["NGN", Validators.required],
        "amount": ["", Validators.required],
        "email": ["", Validators.required],
        "firstname": ["", Validators.required],
        "lastname": ["", Validators.required],
        "phonenumber": ["", Validators.required],
        "txRef" : ["", Validators.required],
        "pin" : ["", Validators.required],
        "suggested_auth": ["", Validators.required]
      })

      this.otpForm = this.fb.group({
        "transaction_reference" : ["", Validators.required],
        "otp" : ["", Validators.required]
      })
   }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe((params) => 
    { 
      this.fundraiserId = params.fundraiserId;

      //Get the Fundraiser
      this.fundraiserService.getFundraiserByFundraisingId(this.fundraiserId).subscribe((fundraiserResponse) => 
      {
        this.fundRaiser = fundraiserResponse;
        this.current_amount = this.fundRaiser.current_Amount;
      });
    })


  }

  //this.button = false;

  //INITIATE PAYMENT
  Initiate(){
    this.initiateButton = false;
    this.button = false;
    let dateTime = new Date();
    this.donateForm.patchValue({ txRef : `${this.fundraiserId}/${this.donateForm.get("email").value}/${dateTime.toDateString()}/${dateTime.toTimeString()}` })

    this.paymentService.initiateCardPayment(this.donateForm.value).subscribe((response) => {
      if(response.status == "success" && response.data.authModelUsed == "VBVSECURECODE" && response.data.authurl != null){
        window.location.href = response.data.authurl;
      }
      else if(response.status == "success" && response.data.suggested_auth == "PIN"){
        this.donateFormWithPin = this.fb.group({
          "cardno": [this.donateForm.get("cardno").value],
          "cvv": [this.donateForm.get("cvv").value],
          "expirymonth": [this.donateForm.get("expirymonth").value],
          "expiryyear": [this.donateForm.get("expiryyear").value],
          "currency": [this.donateForm.get("currency").value],
          "amount": [this.donateForm.get("amount").value],
          "email": [this.donateForm.get("email").value],
          "firstname": [this.donateForm.get("email").value],
          "lastname": [this.donateForm.get("email").value],
          "phonenumber": [this.donateForm.get("phonenumber").value],
          "txRef" : [this.donateForm.get("txRef").value],
          "pin" : ["", Validators.required],
          "suggested_auth": ["PIN"]
        });

        //DISPLAY THE MODAL TO ENTER PIN
        this.pinModal = "display: block;";
      }
      else if(response.status == "error"){
        alert(`${response.message}`);
        location.reload();
      }
    },
    (error) => {
      alert("An error has occurred, please try again.");
      location.reload();
    })

  }

  //Initiate the payment PIN
  InitiateWithPin(){
    this.initiateWithPinButton = false;
    this.button = false;
    this.paymentService.initiateCardPaymentWithPin(this.donateFormWithPin.value).subscribe((response) =>
    {
      if(response.status == "success" && response.data.chargeResponseCode == "02"){
        this.closePinModal();
        this.otpForm = this.fb.group({
          "transaction_reference" : [response.data.flwRef],
          "otp" : ["", Validators.required]
        });
        this.chargeResponseMessage = response.data.chargeResponseMessage;
        this.otpModal = "display: block;";
      }
      else if(response.status == "error"){
        alert(`${response.message}`);
        location.reload();
      }
    },
    (error) => {
      alert("An error has occurred, please try again.");
      location.reload();
    })
  }

  //Validate with OTP
  validateWithOtp(){
    this.validateWithOtpButton = false;
    this.button = false;
    this.paymentService.validatePayment(this.otpForm.value).subscribe((response) => {
      if(response.status == "success" && response.message == "Charge Complete"){

        //Save the response
        this.paymentService.saveTransactionResponse(response.data.tx).subscribe();  

        //Get the transaction reference
        this.flowRef = response.data.tx.flwRef;

        //Get the contributor from the transaction reference
        this.donatedBy = this.flowRef.split("/")[0];

        //Transaction details to be saved.
        let transactions = new Transactions(response.data.tx.createdAt, response.data.tx.updatedAt,
          response.data.tx.amount, response.data.tx.status, this.donatedBy, response.data.tx.flwRef, this.fundRaiser);

        //Save transaction details
        this.paymentService.saveTransactionDetails(transactions).subscribe();

        //Add the paid amount to the current amount
        this.New_current_amount = Number(this.current_amount) + Number(response.data.tx.amount);

        //patchedClass to be sent to the patch endpoint
        let patchedFundraiser = new PatchCurrentAmount("replace", "/current_Amount", this.New_current_amount);
        this.patchedList.push(patchedFundraiser);
        console.log(this.patchedList);

        //Patch Fundraiser with the updated amount
        this.fundraiserService.patchFundRaiser(this.fundraiserId, this.patchedList).subscribe((patchResp)=>
        {
          alert("Payment successful");
          window.location.href = environment.frontendUrl + "fr/" + this.fundraiserId
        });
      }
      else if(response.status == "error"){
        alert(`${response.message}`);
        location.reload();
      }
    },
    (error) => {
      alert("An error has occurred.")
    })

  }

  closePinModal(){
    this.pinModal = "display: none;";
  }

  closeOtpModal(){
    this.otpModal = "display: none;";
  }

  get cardno(){
    return this.donateForm.get("cardno");
  }

  get cvv(){
    return this.donateForm.get("cvv");
  }

  get expirymonth(){
    return this.donateForm.get("expirymonth");
  }

  get expiryyear(){
    return this.donateForm.get("expiryyear");
  }

  get currency(){
    return this.donateForm.get("currency");
  }

  get amount(){
    return this.donateForm.get("amount");
  }

  get email(){
    return this.donateForm.get("email");
  }

  get phonenumber(){
    return this.donateForm.get("phonenumber");
  }

  get firstname(){
    return this.donateForm.get("firstname");
  }

  get lastname(){
    return this.donateForm.get("lastname");
  }

  get pin(){
    return this.donateFormWithPin.get("pin");
  }

  get otp(){
    return this.otpForm.get("otp");
  }
}