import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  removeButton : boolean;

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    //Alternate buttons to display whether user is logged in or not
    if(this.authService.getID() != null){ this.removeButton = true; }
    else{ this.removeButton = false; }

  }

  //Log out function
  signOut(){
    this.authService.deleteToken();
    this.authService.deleteID();
    window.location.href = environment.frontendUrl + "home";
    alert("You have logged out!");
  }

}
