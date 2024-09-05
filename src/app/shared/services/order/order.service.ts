import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Envirnoment } from '../../../base/Envirnoment';
import { Address } from '../../interface/data';
import { Observable } from 'rxjs';
import { checkoutResponse } from '../../interface/checkout-data';
import { Token } from '@angular/compiler';
import { CasheRespone } from '../../interface/cashe';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _HttpClient :HttpClient) { }

  checkOut(cartId:string,data:Address):Observable<checkoutResponse>
  {
  return  this._HttpClient.post<checkoutResponse>(`${Envirnoment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${Envirnoment.baseUrlWebsite}`,{
      shippingAddress:data
      
    },
    {
      headers:{token:localStorage.getItem('userToken') ||''}

    }
      

    )
  }

  CreateCasheOrder(cartId:string,data:Address):Observable<CasheRespone>
  {

    return  this._HttpClient.post<CasheRespone>(`${Envirnoment.baseUrl}/api/v1/orders/${cartId}`,{
      shippingAddress:data
      
    },
    {
      headers:{token:localStorage.getItem('userToken') ||''}

    }
      

    )

  }
}
