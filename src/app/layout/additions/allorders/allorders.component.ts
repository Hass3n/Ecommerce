import { Component, OnInit } from '@angular/core';
import { UserorderService } from '../../../shared/services/userorder/userorder.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CartItem, order, UserOrder } from '../../../shared/interface/userorder';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent  implements OnInit{

  isloading:boolean=false;

  userOrderinfo !:order[];
  constructor(private _UserorderService:UserorderService,private _AuthService :AuthService)
  {

  }



  ngOnInit(): void {

    this._AuthService.userData.subscribe({
      next:userID=>{
       this.getAllOrder(userID['id'])
        
      }
    })
    
  }

  getAllOrder(userID:string)
  
  {

    this.isloading=true;

    this._UserorderService.getuserOrder(userID).subscribe({

      next:res=>{


        this.isloading=false;
 

     

         this.userOrderinfo=res;
     console.log('userdata',this.userOrderinfo);
        
      }

    })
   
  }

}
