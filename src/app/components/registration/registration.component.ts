import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForm : FormGroup;

  constructor(private fb : FormBuilder) {
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
    console.log(this.registrationForm.value);
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
