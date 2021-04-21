export interface InitiateCardPayment{
    cardno: string,
    cvv: string,
    expirymonth: string,
    expiryyear: string,
    currency: string,
    amount: string,
    email: string,
    phonenumber: string,
    txRef : string,
    firstname : string,
    lastname : string
  }