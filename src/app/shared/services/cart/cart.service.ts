import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Envirnoment } from '../../../base/Envirnoment';
import { Token } from '@angular/compiler';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartResponse } from '../../interface/cart';
import { cartlogged } from '../../interface/cartlogged';

@Injectable({
  providedIn: 'root'
})
export class CartService {


   cartnum:BehaviorSubject<any>=new BehaviorSubject(0);
  constructor(private _HttpClient :HttpClient) { }

  addProductToCart(productID:string) :Observable<CartResponse>
  {
   return this._HttpClient.post<CartResponse>(`${Envirnoment.baseUrl}/api/v1/cart`,{productId:productID},{
      headers:{token:localStorage.getItem('userToken') ||''}
    }

    )

  }

  getLoggedUserCart():Observable<cartlogged>
  {
    

   return this._HttpClient.get<cartlogged>(`${Envirnoment.baseUrl}/api/v1/cart`,{
    headers:{token:localStorage.getItem('userToken') ||''}
   });
  }


  updatecartcount(productID:string,productcount:number):Observable<cartlogged>
  {
 return this._HttpClient.put<cartlogged>(`${Envirnoment.baseUrl}/api/v1/cart/${productID}`,{count:productcount.toString},


  {
    headers:{token:localStorage.getItem('userToken') ||''}
  }
 )

  }



  removeSpecificCartItem(productID:string):Observable<cartlogged>
  {

  return  this._HttpClient.delete<cartlogged>(`${Envirnoment.baseUrl}/api/v1/cart/${productID}`,{
      headers:{token:localStorage.getItem('userToken') ||''}
    })

  }
}

