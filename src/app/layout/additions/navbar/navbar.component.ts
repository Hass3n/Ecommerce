import { Component, OnInit } from '@angular/core';
import { RouterEvent, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FlowbitServicesService } from '../../../shared/services/flowbit/flowbit-services.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink ,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  islogin:boolean=false;

  z !:string;



  constructor( public _AuthService:AuthService,private  _FlowbitServicesService :FlowbitServicesService,private _CartService:CartService )
  {
   


    



  }


  ngOnInit(): void {


    
   this._CartService.cartnum.subscribe({
    next : x=>{

      console.log('data is here',x);
      
      this.z=x;

      

    }
  })

    //conatct flowbit services

    this._FlowbitServicesService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });

    



   this._AuthService.userData.subscribe(()=>{

    if(this._AuthService.userData.getValue()!=null)
    {
      this.islogin=true
    }

    else
    {
      this.islogin=false;
    }

   })
  }





}
