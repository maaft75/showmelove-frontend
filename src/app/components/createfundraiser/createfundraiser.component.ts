import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-createfundraiser',
  templateUrl: './createfundraiser.component.html',
  styleUrls: ['./createfundraiser.component.css']
})
export class CreatefundraiserComponent implements OnInit {

  
  private user : any;
  private userId : Number;
  fundraiserForm : FormGroup;

  constructor(private fb : FormBuilder, private authService : AuthService) { 
    this.fundraiserForm = this.fb.group({
      "title" : ["", Validators.required],
      "purpose" : ["", Validators.required],
      "type" : ["", Validators.required],
      "amount_Goal" : ["", Validators.required],
      "postalCode" : ["", Validators.required],
      "image" : [""],
      "description" : ["", Validators.required],
      "campaignOwner" : this.fb.group({
        "id": ["", Validators.required],
        "first_Name": ["", Validators.required],
        "last_Name": ["", Validators.required],
        "phone_Number": ["", Validators.required],
        "email_Address": ["", Validators.required],
        "password": ["", Validators.required],
        "status": ["", Validators.required],
        "created_At": ["", Validators.required],
        "updated_At": ["", Validators.required]
      })
    })
  }

  ngOnInit(): void {
    this.userId = Number(this.authService.getID());

    this.authService.getUserDetails(this.userId).subscribe(
      (data) => 
      {
        this.user = data;
        this.fundraiserForm = this.fb.group({
          "title" : ["", Validators.required],
          "purpose" : ["", Validators.required],
          "type" : ["", Validators.required],
          "amount_Goal" : ["", Validators.required],
          "postalCode" : ["", Validators.required],
          "image" : [""],
          "description" : ["", Validators.required],
          "campaignOwner" : this.fb.group({
            "id": [this.user.id],
            "first_Name": [this.user.first_Name],
            "last_Name": [this.user.last_Name],
            "phone_Number": [this.user.phone_Number],
            "email_Address": [this.user.email_Address]
          })
        })
    });

  }

  Create(){
    console.log(this.fundraiserForm.value);
  }

  get title(){
    return this.fundraiserForm.get("title");
  }

  get purpose(){
    return this.fundraiserForm.get("purpose");
  }

  get type(){
    return this.fundraiserForm.get("type");
  }

  get amount_Goal(){
    return this.fundraiserForm.get("amount_Goal");
  }

  get postalCode(){
    return this.fundraiserForm.get("purpose");
  }

  get description(){
    return this.fundraiserForm.get("description");
  }

}
