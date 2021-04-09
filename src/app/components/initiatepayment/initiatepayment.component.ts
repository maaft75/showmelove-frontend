import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-initiatepayment',
  templateUrl: './initiatepayment.component.html',
  styleUrls: ['./initiatepayment.component.css']
})
export class InitiatepaymentComponent implements OnInit {

  donateForm : FormGroup;

  constructor(private fb : FormBuilder) {
    this.donateForm = this.fb.group({
        "cardno": ["", Validators.required],
        "cvv": ["", Validators.required],
        "expirymonth": ["", Validators.required],
        "expiryyear": ["", Validators.required],
        "currency": ["NGN", Validators.required],
        "amount": ["", Validators.required],
        "email": ["", Validators.required],
        "phonenumber": ["", Validators.required]
      })
   }

  ngOnInit(): void {  }

  Initiate(){
    console.log(this.donateForm.value);
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
}
