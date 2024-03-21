import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tambon } from "./tambon.model";

@Injectable({
  providedIn: 'root'
})
export class TambonService {
  readonly APIUrl: string = "http://localhost:3000/tambon";
  constructor(private http: HttpClient) { }

  getTambon(code=null) {
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
