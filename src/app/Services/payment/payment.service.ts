import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Transactions } from '../../Models/Transactions'

@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  private validatePaymentUrl : string = environment.paymentUrl + "validatepayment";
  private initiatePaymentUrl : string = environment.paymentUrl + "initiatecardpayment";
  private saveTransactionDetailsUrl : string = environment.paymentUrl + "savetransactiondetails";
  private initiatePaymentWithPinUrl : string = environment.paymentUrl + "initiatecardpayment/pin";
  private saveTransactionResponseUrl : string = environment.paymentUrl + "savetransactionresponse";
  
  constructor(private http : HttpClient) { }

  initiateCardPayment(cardData) : Observable<any>{
    return this.http.post<any>(this.initiatePaymentUrl , cardData);
  }

  initiateCardPaymentWithPin(cardData) : Observable<any>{
    return this.http.post<any>(this.initiatePaymentWithPinUrl , cardData);
  }

  validatePayment(validationData) : Observable<any>{
    return this.http.post<any>(this.validatePaymentUrl, validationData);
  }

  saveTransactionResponse(tranResp){
    return this.http.post<any>(this.saveTransactionResponseUrl, tranResp);
  }

  saveTransactionDetails(tranDeets){
    return this.http.post<Transactions>(this.saveTransactionDetailsUrl, tranDeets);
  }

}
