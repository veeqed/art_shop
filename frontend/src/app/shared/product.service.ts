import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from "./product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly APIUrl: string = "http://localhost:3000/product";
  constructor(private http: HttpClient) { }

  getProduct(product_code=null) {

    if (product_code)
    {
      let queryUrl = this.APIUrl+"/"+product_code;
      return this.http.get(queryUrl);
    }
    else
    {
      return this.http.get(this.APIUrl);
    }
    
  }

  createProduct(formData: any)
  {
    let endpointUrl = this.APIUrl+"/create";

    return this.http.post(endpointUrl, formData);
  }

  getCartCount()
  {
    let local_storage: any;
    let cartCount: number;

    if (localStorage.getItem('cart') !== null)
    {
      local_storage = JSON.parse(localStorage.getItem('cart') || '{}');
      cartCount = local_storage.length;
    }
    else
    {
      cartCount = 0;
    }

    return cartCount;
  }

}
