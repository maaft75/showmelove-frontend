import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paymentresponse',
  templateUrl: './paymentresponse.component.html',
  styleUrls: ['./paymentresponse.component.css']
})
export class PaymentresponseComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((p) => {console.log(p)})
  }

}
