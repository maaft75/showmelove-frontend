import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FundraiserService {

  private fundraiserUrl : string = environment.apiUrl + "fundraiser";
  private getFundraiserByUserUrl : string = environment.apiUrl + "fundraiser/GetFundRaisingByUser";

  constructor(private http : HttpClient, private auth : AuthService) { }

  getFundraiser(id) : Observable<any>{
    let headers = this.auth.getHeaders()
    return this.http.get<any>(this.getFundraiserByUserUrl + "/" + id, {headers});
  }

  createFundraiser(data) : Observable<any>{
    let headers = this.auth.getHeaders()
    return this.http.post<any>(this.fundraiserUrl, data, {headers});
  }
}