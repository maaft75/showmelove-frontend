import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { PaymentresponseComponent } from '../components/paymentresponse/paymentresponse.component';

export const AppRoutes : Routes = [
  {path : "home" , component : HomeComponent },
  {path : "signin" , component : LoginComponent },
  {path : "dashboard" , component : DashboardComponent },
  {path : "signup" , component : RegistrationComponent },
  {path : "paymentresponse" , component : PaymentresponseComponent},
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
