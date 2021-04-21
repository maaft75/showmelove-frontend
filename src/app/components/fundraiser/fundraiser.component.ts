import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Fundraiser } from 'src/app/Interfaces/Fundraiser';
import { FundraiserService } from 'src/app/Services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-fundraiser',
  templateUrl: './fundraiser.component.html',
  styleUrls: ['./fundraiser.component.css']
})
export class FundraiserComponent implements OnInit {

  public fundraiserId : string;
  public fundraiser : Fundraiser;
  constructor(private activatedRoute : ActivatedRoute, private fundraiserService : FundraiserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (param) => {
        //console.log(param.fundraiserId);
        this.fundraiserId = param.fundraiserId;
        this.fundraiserService.getFundraiserByFundraisingId(param.fundraiserId).subscribe(
          data => {this.fundraiser = data;}
        )
      }
    )
  }

}
