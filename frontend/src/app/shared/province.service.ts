import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Province } from "../shared/province.model";

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  readonly APIUrl: string = "http://localhost:3000/province";
  constructor(private http: HttpClient) { }

  getProvince(code=null) {
    if (code)
    {
      let queryUrl = this.APIUrl+"?code="+code;

      return this.http.get(queryUrl);
    }
    else
    {
      return this.http.get(this.APIUrl);
    }
  }
}
