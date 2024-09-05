import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { cartlogged, Data } from '../../../shared/interface/cartlogged';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartloggeduser !:cartlogged;
  isloading:boolean=false;

  errMssg !:string;


  constructor(private _CartService :CartService)
  {

  


  }

  ngOnInit(): void {

    if(typeof localStorage !='undefined')
    {

      localStorage.setItem('currentPage','/cart')

    }

    this.getAllloggedCartUser();


  }

  getAllloggedCartUser()
  {


    this.isloading=true;

    this._CartService.getLoggedUserCart().subscribe({
      next:res=>{



       this.isloading=false;


       

       console.log('cart',res);

       
       

        
        this.cartloggeduser=res;
      },
      error:err=>{
        this.errMssg=err.error.message;
      }
    })
  }

  updateCartquntaity(productID:string,productcount:number)
  {


    if(productcount<=0)
    {

      

      // remove  item from cart

           this.deleteItemfromcart(productID)
    }

    else{

      this._CartService.updatecartcount(productID,productcount).subscribe({
        next:res=>{
  
          this.cartloggeduser=res;

          console.log(res);
          
        }
      })
    }


  }

  deleteItemfromcart(productID:string)
  {

    this._CartService.removeSpecificCartItem(productID).subscribe({
      next:res=>{

        this._CartService.cartnum.next(this.cartloggeduser.numOfCartItems-1)



         this.cartloggeduser=res;

    


        
      }
    })

  }
}
