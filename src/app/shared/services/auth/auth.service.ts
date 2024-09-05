import { afterNextRender, Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { code, email, loginData, NewPassword, registerData } from '../../interface/data';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Envirnoment } from '../../../base/Envirnoment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../cart/cart.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userData:BehaviorSubject<any>=new BehaviorSubject(null);


  constructor(private _httpclient:HttpClient,private _Router:Router, @Inject(PLATFORM_ID) id:Object ,private _CartService:CartService) { 

    // call when refresh page if user login you not to make logout

    // handle code run in browser
    if(isPlatformBrowser(id))
    {
      if(localStorage.getItem('userToken')!=null)
        {

          // get card number
          this._CartService.getLoggedUserCart().subscribe({
            next:res=>{
      
              this._CartService.cartnum.next(res.numOfCartItems)
            }
          })
    
         this.decodeUserData();


         

         // go to last page
         _Router.navigate([localStorage.getItem('currentPage')])


        }
    }
  }




signUp( data:registerData):Observable<any>
{
 return   this._httpclient.post(`${Envirnoment.baseUrl}/api/v1/auth/signup  `,data)
}


SignIn(data:loginData):Observable<any>
{


  return this._httpclient.post(`${Envirnoment.baseUrl}/api/v1/auth/signin`,data);
}



Forgetpassword(data:email):Observable<any>
{
 return this._httpclient.post(`${Envirnoment.baseUrl}/api/v1/auth/forgotPasswords`,data)
}


verifyResetCode(data:code):Observable<any>
{

 return this._httpclient.post(`${Envirnoment.baseUrl}/api/v1/auth/verifyResetCode`,data);
  
}
resetNewPassword(data:NewPassword):Observable<any>
{
  
  return this._httpclient.put(`${Envirnoment.baseUrl}/api/v1/auth/resetPassword`,data);

}

decodeUserData()
{

  const token =JSON.stringify(localStorage.getItem('userToken'));
const decoded = jwtDecode(token);

this.userData.next(decoded);

console.log('decode data',this.userData.getValue());
}


logOut()
{
  localStorage.removeItem('userToken');
  this.userData.next(null);
  this._Router.navigate(['/login'])

}

}
