import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FundraiserService } from 'src/app/Services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-fundraiser',
  templateUrl: './fundraiser.component.html',
  styleUrls: ['./fundraiser.component.css']
})
export class FundraiserComponent implements OnInit {

  public fundraiser : any;
  constructor(private activatedRoute : ActivatedRoute, private fundraiserService : FundraiserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (param) => {
        console.log(param.fundraiserId);
        this.fundraiserService.getFundraiserByFundraisingId(param.fundraiserId).subscribe(
          data => {console.log(data); this.fundraiser = data}
        )
      }
    )
  }

}
