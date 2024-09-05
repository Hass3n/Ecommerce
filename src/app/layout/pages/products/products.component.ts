import { Component, OnInit } from '@angular/core';
import { product } from '../../../shared/interface/product';
import { PrdouctServices } from '../../../shared/services/product/prdouct-services.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent  implements OnInit{
  isloading:boolean=false;
  searchWord:string='';
  isclick !:string;
  whishlistID:string[]=[];
    productList !:product[];


    constructor(private _PrdouctServices:PrdouctServices,private _CartService:CartService,private toastr: ToastrService ,private _WishlistService:WishlistService)
    {

    }

  ngOnInit(): void {

    if(typeof localStorage !='undefined')
    {

      localStorage.setItem('currentPage','/product');


    }

       
   //getwishlist()
   this.getAllWishlist();



   console.log('array',this.whishlistID);
   


    // last page 
    if(typeof localStorage !='undefined')
    {

      localStorage.setItem('currentPage','/home');


    }

    this.getAllproduct();
  }


  
  getAllproduct()
  {

    this.isloading=true;

    this._PrdouctServices.getAllProduct().subscribe({

      next:res=>{

        

   

        this.productList=res.data;
        console.log(res.data);

        this.isloading=false;
        
      },

      error:err=>{

        this.isloading=false;
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


  falg !:string;

  addWishlistproduct(productID:string)
  {



console.log('falg before',this.falg);

    

   let newarray=  this.whishlistID.filter((x)=>   productID===x
      
     )



     if(productID===newarray[0])
      {



        // remove from wishlist

        this._WishlistService.removeProductFromwishlist(productID).subscribe({

          next:res=>{

        
            this.falg=res.message

            this.getAllWishlist();
            console.log('removed--------------',this.falg);

            

            




          }

        });





      }
     


     else
     {
      this._WishlistService.addProductToWishlist(productID).subscribe({
        next:res=>{
  
  
  
          this. whishlistID.push(res.data[res.data.length-1])
  
          this.falg=res.message;
          
  
          console.log('sucess',res);
  
  
  
             
          
        }
      })
     }

    
  

  }

  getAllWishlist()
  {

    
    
    this.whishlistID.length=0;



        this._WishlistService.getAllWishListData().subscribe({
          next:res=>{
    
    


    
    
            for (let i=0;i<res.data.length;i++) {
          
             this. whishlistID.push(res.data[i]._id)
    
             
              
            }
    
    
    
            console.log('ids',this.whishlistID);
            
    
            
    
          }
        })

      
  
  }



iswishlist(productID:string):boolean
{





  

  for(let i=0;i<this.whishlistID.length;i++)
  {

    if(productID===this.whishlistID[i])
    {

      

      return true;


    }

  }

  return false;



}

}
