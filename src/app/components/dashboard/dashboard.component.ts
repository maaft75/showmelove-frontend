import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { FundraiserService } from 'src/app/Services/fundraiser/fundraiser.service';
import { fundRaisersByLoggedInUser } from 'src/app/Models/FundRaisersByLoggedInUser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private Id : string;
  public loggedInUser : string;
  public fundRaisersByLoggedInUser : fundRaisersByLoggedInUser;

  constructor(private authService : AuthService, private fundraiserService : FundraiserService) { }

  ngOnInit(): void {

    this.Id =  this.authService.getID();

    //Get Logged in User
    this.authService.getUserDetails(Number(this.Id)).subscribe(
      (data) => { 
        this.loggedInUser = data.first_Name + " " + data.last_Name;
    })

    //Get Fundraiser created by Logged in User
    this.fundraiserService.getFundraiser(1).subscribe(
      (data) => 
      {
        this.fundRaisersByLoggedInUser = data;
      });
  }

}
