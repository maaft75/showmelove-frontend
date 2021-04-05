import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FundraiserService } from 'src/app/Services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-createfundraiser',
  templateUrl: './createfundraiser.component.html',
  styleUrls: ['./createfundraiser.component.css']
})
export class CreatefundraiserComponent implements OnInit {
  
  response : any;
  private user : any;
  selectedImage : any;
  tryUploadImage : boolean = true;
  uploadingImage : boolean = true;
  completedUpload : boolean = false;
  public fundraiserForm : FormGroup;
  defaultImageUrl : string = "/assets/download.png";

  constructor(
    private fb : FormBuilder, 
    private authService : AuthService, 
    private storage : AngularFireStorage,
    private fundraiserService : FundraiserService) { 
    this.fundraiserForm = this.fb.group({
      "title" : ["", Validators.required],
      "purpose" : ["", Validators.required],
      "type" : ["", Validators.required],
      "amount_Goal" : ["", Validators.required],
      "postalCode" : ["", Validators.required],
      "image" : ["", Validators.required],
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

    this.authService.getUserDetails(Number(this.authService.getID())).subscribe(
      (data) => 
      {
        this.user = data;
        this.fundraiserForm = this.fb.group({
          "title" : ["", Validators.required],
          "purpose" : ["", Validators.required],
          "type" : ["", Validators.required],
          "amount_Goal" : ["", Validators.required],
          "postalCode" : ["", Validators.required],
          "image" : ["/assets/download.png", Validators.required],
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
    this.fundraiserForm.patchValue( { image : this.response });
    //console.log(this.fundraiserForm.value);

    if(this.fundraiserForm.valid){
      
      this.fundraiserService.createFundraiser(this.fundraiserForm.value).subscribe(
        (data) => 
        { 
          alert(`Fundraiser with title : "${data.title}" successfully created.`);
          window.location.href = environment.frontendUrl + "dashboard";
        },
        (error) => 
        { 
          alert(error.error); 
          location.reload()
        }
      )}
    else
    {
      alert("Kindly ensure all fields are filled and valid.");
    }
  }

  showPreview(event : any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e : any) => this.defaultImageUrl = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.defaultImageUrl = "/assets/download.png";
      this.selectedImage = null;
    }
  }

  uploadImage(){
    this.uploadingImage = false;
    let filepath = `images/${this.selectedImage.name}_${new Date().getTime()}`;
    let fileRef = this.storage.ref(filepath);

    this.storage.upload(filepath, this.selectedImage).snapshotChanges().pipe(
      finalize( () => {
        fileRef.getDownloadURL().subscribe( (url) => {
        this.response = url;
        //console.log(this.response);
        alert('Image Uploaded!');
        this.uploadingImage = true;
        this.tryUploadImage = false;
        this.completedUpload = true;
      })
    })).subscribe()
  }
  
  get image(){
    return this.fundraiserForm.get("image");
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