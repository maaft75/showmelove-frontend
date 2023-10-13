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
  private getFundraiserByUserUrl : string = environment.fundraisingApiUrl + "getbyuser";
  private getFundraiserByFundraisingIdUrl : string = environment.fundraisingApiUrl + "getbyfundraiserid"

  constructor(private http : HttpClient, private auth : AuthService) { }

  patchFundRaiser(id, data){
    return this.http.patch<any>(this.fundraiserUrl + id, data);
  }

  createFundraiser(data) : Observable<any>{
    return this.http.post<any>(this.fundraiserUrl, data);
  }

  getFundraiserByUser(id) : Observable<any>{
    return this.http.get<any>(this.getFundraiserByUserUrl + "/" + id);
  }

  getFundraiserByFundraisingId(fundraisingId) : Observable<any>{
    return this.http.get<any>(this.getFundraiserByFundraisingIdUrl + "/" + fundraisingId);
  }
}