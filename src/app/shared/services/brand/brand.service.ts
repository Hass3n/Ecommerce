import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Envirnoment } from '../../../base/Envirnoment';
import { Observable } from 'rxjs';
import { Category } from '../../interface/cartlogged';
import { Brandresponse } from '../../interface/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private  _HttpClient:HttpClient) {


   }

   getBrands():Observable<Brandresponse>
   {
   return this._HttpClient.get<Brandresponse>(`${Envirnoment.baseUrl}/api/v1/brands`);
   }
}
