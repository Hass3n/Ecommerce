import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Envirnoment } from '../../../base/Envirnoment';
import { Token } from '@angular/compiler';
import { BehaviorSubject, Observable } from 'rxjs';
import { wishlistResponse } from '../../interface/wishlist';
import { whishlistData } from '../../interface/wishlist-data';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {


  bgcolor:BehaviorSubject<any>=new BehaviorSubject('');
  constructor(private _HttpClient :HttpClient) { }

  addProductToWishlist(productID:string):Observable<wishlistResponse>
  {


   return this._HttpClient.post<wishlistResponse>(`${Envirnoment.baseUrl}/api/v1/wishlist`,{productId:productID},{
      headers:{token:localStorage.getItem('userToken')||''}
    })
    

  }

  getAllWishListData():Observable<whishlistData>
  {
   return this._HttpClient.get<whishlistData>(`${Envirnoment.baseUrl}/api/v1/wishlist`,{
      headers:{token:localStorage.getItem('userToken')||''}
    })
  }

  removeProductFromwishlist(productID:string):Observable<wishlistResponse>
  {
   return this._HttpClient.delete<wishlistResponse>(`${Envirnoment.baseUrl}/api/v1/wishlist/${productID}`,
      {
        headers:{token:localStorage.getItem('userToken')||''}
      }


    )
  }
}
