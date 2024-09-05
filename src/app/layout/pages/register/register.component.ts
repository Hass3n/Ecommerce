import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
   errMssg!:string;
   isLoading:boolean=false;

  constructor(private _authservices :AuthService,private  _Router:Router)
  {


  }

  // Reactive forms 
registerForm:FormGroup=new FormGroup({

  name:new FormControl(null,[Validators.required,Validators.minLength(3) ,Validators.maxLength(8)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z 0-9]{8,}$/)]),
  rePassword:new FormControl(null,[Validators.required]),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
},this.checkRepasswordMatch);
  

checkRepasswordMatch(g:AbstractControl)
{

  if(g.get('password')?.value===g.get('rePassword')?.value)
  {
    return null;
  }

  else
  {

    g.get('rePassword')?.setErrors({mismatch:true});
    return {mismatch:true}
  }

}



submitRegsiter()
{
  if(this.registerForm.valid)
  {
    // conatct with api

    this.isLoading=true;

    this._authservices.signUp(this.registerForm.value).subscribe({
      next:(res)=>{

        this._Router.navigate(['/login'])

        this.isLoading=false;
        console.log(res);
        
      },
      error:(err)=>{

        this.errMssg=err.error.message;

        this.isLoading=false;
        console.log(err);
        
      }
    })

  }
}





}
