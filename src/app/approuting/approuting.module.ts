import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Guards/AuthGuard/auth-guard.guard';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { FundraiserComponent } from '../components/fundraiser/fundraiser.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { PaymentresponseComponent } from '../components/paymentresponse/paymentresponse.component';
import { CreatefundraiserComponent } from '../components/createfundraiser/createfundraiser.component';
import { InitiatepaymentComponent } from '../components/initiatepayment/initiatepayment.component';

export const AppRoutes : Routes = [
  {path : "home" , component : HomeComponent },
  {path : "signin" , component : LoginComponent },
  {path : "signup" , component : RegistrationComponent },
  {path : "fr/:fundraiserId", component : FundraiserComponent},
  {path : "initiatepayment" , component : InitiatepaymentComponent},
  {path : "paymentresponse" , component : PaymentresponseComponent},
  {path : "dashboard" , component : DashboardComponent, canActivate : [AuthGuard] },
  {path : "startfundraiser", component : CreatefundraiserComponent, canActivate : [AuthGuard]},
  {path : "**", redirectTo : "/home", pathMatch : "full"}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule
  ],
  exports :[
    RouterModule
  ]
})

export class ApproutingModule { }
