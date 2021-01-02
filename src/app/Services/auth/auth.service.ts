import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Registration } from 'src/app/Interfaces/Registration';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registrationUrl : string = environment.registrationUrl + "api/users/registration";

  constructor(private http : HttpClient) { }

  registration(data) : Observable<any>{
    return this.http.post<Registration>(this.registrationUrl, data);
  }
}
