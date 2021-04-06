import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FundraiserService {

  private fundraiserUrl : string = environment.fundraisingApiUrl;
  private getFundraiserByUserUrl : string = environment.fundraisingApiUrl + "GetFundRaisingByUser";
  private getFundraiserByFundraisingIdUrl : string = environment.fundraisingApiUrl + "GetFundRaisingByFundraisingId"

  constructor(private http : HttpClient, private auth : AuthService) { }

  getFundraiserByUser(id) : Observable<any>{
    let headers = this.auth.getHeaders()
    return this.http.get<any>(this.getFundraiserByUserUrl + "/" + id, {headers});
  }

  createFundraiser(data) : Observable<any>{
    let headers = this.auth.getHeaders()
    return this.http.post<any>(this.fundraiserUrl, data, {headers});
  }

  getFundraiserByFundraisingId(fundraisingId) : Observable<any>{
    let headers = this.auth.getHeaders()
    return this.http.get<any>(this.getFundraiserByFundraisingIdUrl + "/" + fundraisingId, {headers});
  }
}