import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FundraiserService {

  private getFundraiserByUserUrl : string = environment.apiUrl + "fundraiser/GetFundRaisingByUser";

  constructor(private http : HttpClient, private auth : AuthService) { }

  getFundraiser(id) : Observable<any>{
    let headers = this.auth.getHeaders()
    return this.http.get<any>(this.getFundraiserByUserUrl + "/" + id, {headers});
  }
}
