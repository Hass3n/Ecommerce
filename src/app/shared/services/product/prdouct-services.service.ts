import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Envirnoment } from '../../../base/Envirnoment';
import { Observable } from 'rxjs';
import { product, productResponse } from '../../interface/product';

@Injectable({
  providedIn: 'root'
})
export class PrdouctServices {

  constructor(private _HttpClient:HttpClient) {

   }


   getAllProduct():Observable<productResponse>
   {
   return this._HttpClient.get<productResponse>(`${Envirnoment.baseUrl}/api/v1/products`);
   }


   getSepecifcProduct(productID:string):Observable<{data:product}>
   {


  return  this._HttpClient.get<{data:product}>(`${Envirnoment.baseUrl}/api/v1/products/${productID}`)
   }
}
