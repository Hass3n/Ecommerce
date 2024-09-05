import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserOrder } from '../../interface/userorder';
import { Envirnoment } from '../../../base/Envirnoment';

@Injectable({
  providedIn: 'root'
})
export class UserorderService {

  constructor(private _HttpClient :HttpClient) { }


  getuserOrder(userId:string):Observable<UserOrder>
  {


    return this._HttpClient.get<UserOrder>(`${Envirnoment.baseUrl}/api/v1/orders/user/${userId}`);
    

  }
}
