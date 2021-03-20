export interface InitiateCardPaymentWithPin{
  cardno: string,
  cvv: string,
  expirymonth: string,
  expiryyear: string,
  currency: string,
  pin: string,
  amount: string,
  email: string,
  firstname: string,
  lastname: string,
  phonenumber: string
}