import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Amphur } from "./amphur.model";

@Injectable({
  providedIn: 'root'
})
export class AmphurService {
  readonly APIUrl: string = "http://localhost:3000/amphur";
  constructor(private http: HttpClient) { }

  getAmphur(province_id = null) {

    if (province_id)
    {
      let queryUrl = this.APIUrl+"?province_id="+province_id;

      return this.http.get(queryUrl);
    }
    else
    {
      return this.http.get(this.APIUrl);
    }
  }
}
