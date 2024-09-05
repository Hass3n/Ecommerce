import { Component, EventEmitter, Output, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-code-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './code-form.component.html',
  styleUrl: './code-form.component.scss'
})
export class CodeFormComponent {

  isLoading:boolean=false;


  @Output() codeformflag = new EventEmitter<boolean>();

  @Output() errMaessage = new EventEmitter<string>();


  constructor(private _AuthService:AuthService)
  {

  }


  codeForm:FormGroup=new FormGroup(
    {
      resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{4,}$/)])
    },


  );


  submitCodeForm()
  {
    if(this.codeForm.valid)
    {
      this.isLoading=true;

      this._AuthService.verifyResetCode(this.codeForm.value).subscribe({


        next:res=>{

          this.isLoading=false;
        
          this.codeformflag.emit(false)

        },

        error:err=>{
          this.isLoading=false;
          this.errMaessage.emit(err.error.message);

          

        }
      })
    }
  }

}
