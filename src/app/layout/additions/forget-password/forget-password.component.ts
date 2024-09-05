import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { NewpassswordComponent } from '../newpasssword/newpasssword.component';
import { CodeFormComponent } from '../code-form/code-form.component';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule,NewpassswordComponent,CodeFormComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent   {

  isLoading:boolean=false;
  errMaessage !:string; 

  emailConfirmFlag:boolean=true;

  codeConfirmFlag:boolean=false;

  newPasswordFlag:boolean=false;



  
  constructor(private _AuthService:AuthService, private _Router:Router)
  {

  }

  emilForm:FormGroup=new FormGroup(
    {
      email:new FormControl(null,[Validators.required,Validators.email])
    },

    

  );


  recieveDatafromchild( flag:boolean)
  {


    

    this.codeConfirmFlag=flag;
    this.newPasswordFlag=true;

    
  }


  recieveMessage(errMssg:string)
  {
    

    this.errMaessage=errMssg;
  }

  submitEmailForm()
  {

    if(this.emilForm.valid)
    {
     

      this.isLoading=true;

      this._AuthService.Forgetpassword(this.emilForm.value).subscribe({

        next:res=>{




          this.isLoading=false;
          this.emailConfirmFlag=false;
          this.codeConfirmFlag=true;


          console.log(res);
          
          

        },

        error:err=>{

          this.isLoading=false;


         this.errMaessage= err.error.message;
          

        }

      })
      
    }

  }




}
