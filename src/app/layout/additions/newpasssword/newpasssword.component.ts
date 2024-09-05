import { Component, EventEmitter, Input, input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { emit } from 'node:process';

@Component({
  selector: 'app-newpasssword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './newpasssword.component.html',
  styleUrl: './newpasssword.component.scss'
})
export class NewpassswordComponent  implements OnInit {
  isLoading:boolean=false;

  @Output() errMaessage = new EventEmitter<string>();


    @Input()currentemail !:string;


    ngOnInit(): void {
      
      this.newPasswordform.get('email')?.setValue(this.currentemail);
      this.newPasswordform.get('email')?.disable();
    }


  constructor(private _AuthService:AuthService, private _Router:Router)
  {

  }

  newPasswordform:FormGroup=new FormGroup(
    {

      email:new FormControl([Validators.required,Validators.email]),
      newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z 0-9]{8,}$/)])
      
    }
  )

  submitNewPassword()
  {

    console.log('newpassword',this.newPasswordform.value);
    
    if(this.newPasswordform.valid)
    {
      this.isLoading=true;

      this._AuthService.resetNewPassword({email:this.currentemail,newPassword:this.newPasswordform.value.newPassword}).subscribe({


        next:res=>{

          this.isLoading=false;

          localStorage.setItem('userToken',res.token);
          this._AuthService.decodeUserData();

          this._Router.navigate(['/home'])

        },

        error:err=>{
          this.isLoading=false;
          this.errMaessage.emit(err.error.message)

         
          

        }
      })
    }
  }
  
}
