import { Component, OnInit } from '@angular/core';
import { PrdouctServices } from '../../../shared/services/product/prdouct-services.service';
import { product } from '../../../shared/interface/product';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {


  productdetails !:product;

  isloading:boolean=true;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
   
    },
    nav: true
  }
  constructor(private _PrdouctServices:PrdouctServices ,private _ActivatedRoute:ActivatedRoute,private _CartService:CartService,private toastr: ToastrService )
  {

  }

  ngOnInit(): void {
    

    this.getProductById();
  }


  getProductById()
  {

    this.isloading=true;

    let Id :string='';

    // get data from url
    this._ActivatedRoute.params.subscribe({
      next:parm=>{


        Id=parm['Id'];
      },
      error:err=>{

      }
    });


    this._PrdouctServices.getSepecifcProduct(Id).subscribe({
      next:res=>{


        this.productdetails=res.data;

        this.isloading=false;

        console.log(res.data);
        
      },


      error:err=>{
        
        
      }

    })
  }

  
  addProductTocart(productID:string)
  {


    this._CartService.addProductToCart(productID).subscribe({
      next:res=>{


        this._CartService.cartnum.next(res.numOfCartItems)
        this.toastr.success(res.message, 'Cart!',{
          progressBar:true
        });

        
        console.log(res);
        

      }
    })
  }

}
