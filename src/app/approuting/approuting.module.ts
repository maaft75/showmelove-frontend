import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { RegistrationComponent } from '../components/registration/registration.component';

export const AppRoutes : Routes = [
  {path : "home" , component : HomeComponent },
  {path : "signin" , component : LoginComponent },
  {path : "signup" , component : RegistrationComponent },
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
