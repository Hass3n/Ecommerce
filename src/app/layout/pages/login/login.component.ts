import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  
})
export class LoginComponent {

   errMssg !:string;
   isLoading:boolean=false;

  constructor(private _AuthService: AuthService,private _Router:Router,private _CartService :CartService)
  {

  }
  loginform:FormGroup=new FormGroup({
  
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z 0-9]{8,}$/)])
    
  })


  submitLogin()
  {

    if(this.loginform.valid)
    {
      this.isLoading=true;
      this._AuthService.SignIn(this.loginform.value).subscribe({
        next:(res)=>{


          localStorage.setItem('userToken',res.token)
          this._AuthService.decodeUserData();
         this._Router.navigate(['/home']);

         this.isLoading=false;

         if(typeof localStorage !='undefined')
          {

            // get cart number count
           this._CartService.getLoggedUserCart().subscribe({
             next:res=>{
       
               this._CartService.cartnum.next(res.numOfCartItems)
             }
           })
       
         
          }
          

        },
        error:(err)=>{

          this.errMssg=err.error.message;
          this.isLoading=false;
        }
      })
      
    }

  }

 
}
