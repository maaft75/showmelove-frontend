import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  loaderImage : boolean = false;
  public registrationForm : FormGroup;

  constructor( private fb : FormBuilder, 
    private auth : AuthService,
    private router : Router) {

    this.registrationForm = this.fb.group({
      "First_Name" : ["", Validators.required],
      "Last_Name" : ["", Validators.required],
      "Email_Address" : ["", Validators.required],
      "Phone_Number" : ["", Validators.required],
      "Password" : ["", Validators.required]
    })

   }

  ngOnInit(): void {
  }

  Register(){
    this.loaderImage = true;
    this.auth.registration(this.registrationForm.value).subscribe(
      (data) => { 
        alert(`Registration Complete, Please Click on OK to Proceed To Login, ${data.first_Name}.`);
        this.router.navigate(["signin"]);
      },
      (error) => {
        console.log(error); 
        alert(error["error"].error);
        location.reload();
      }
    )
  }

  get Email_Address(){
    return this.registrationForm.get("Email_Address");
  }

  get Phone_Number(){
    return this.registrationForm.get("Phone_Number");
  }

  get First_Name(){
    return this.registrationForm.get("First_Name");
  }

  get Last_Name(){
    return this.registrationForm.get("Last_Name");
  }
 
  get Password(){
    return this.registrationForm.get("Password");
  }
}
