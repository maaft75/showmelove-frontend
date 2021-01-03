import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/Interfaces/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Registration } from 'src/app/Interfaces/Registration';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl : string = environment.authUrl + "api/users/login";
  private registrationUrl : string = environment.authUrl + "api/users/registration";

  constructor(private http : HttpClient) { }

  registration(data) : Observable<any>{
    return this.http.post<Registration>(this.registrationUrl, data);
  }

  login(data) : Observable<User>{
    return this.http.post<any>(this.loginUrl, data);
  }

  saveToken(token){
    localStorage.setItem("token", token);
  }

  saveID(id){
    localStorage.setItem("id", id);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  getID(){
    return localStorage.getItem("id");
  }

  getHeaders(){
    let headers = new HttpHeaders();
    return headers.set("Authorization", `Bearer ${this.getToken()}`);
  }

}
