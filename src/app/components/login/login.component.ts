import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  button : boolean = true;
  public loginForm : FormGroup;

  constructor(private fb: FormBuilder,
    private auth : AuthService,
    private router : Router) {
    this.loginForm = this.fb.group({
      "Email_Address" : ["", Validators.required],
      "Password" : ["", Validators.required]
    })
   }

  ngOnInit(): void {
  }

  Login(){
    this.button = false;
    //console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe(
      (data) => {
        this.auth.saveID(data.id);
        this.auth.saveToken(data.token);
        window.location.href = environment.frontendUrl + "dashboard";
        alert(`Logged in successfully`);
    },
      (error) => { 
        alert(`${error.error.message}`); 
        location.reload();
    }
    )}

  get Email_Address(){
    return this.loginForm.get("Email_Address");
  }

  get Password(){
    return this.loginForm.get("Password");
  }

}
