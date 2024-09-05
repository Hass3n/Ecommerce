import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../../shared/services/wishlist/wishlist.service';
import { Datum } from '../../../../shared/interface/wishlist-data';
import { CartService } from '../../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  wishlistData !:Datum[];

  isloading:boolean=false;
  isclick !:string;
  whishlistID:string[]=[];
  
    constructor(private _CartService:CartService,private toastr: ToastrService ,private _WishlistService:WishlistService )
    {
    
      
  
    }
  
    ngOnInit(): void {
  
  
      
       
     //getwishlist()
     this.getAllWishlist();
  
  
  
     
  
  
      // last page 
      if(typeof localStorage !='undefined')
      {
  
        localStorage.setItem('currentPage','/wishlist');
  
  
      }
  
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
  
  
  
  
      
  
     let newarray=  this.whishlistID.filter((x)=>   productID===x
        
       )
  
  
  
       if(productID===newarray[0])
        {
  
  
  
          // remove from wishlist
  
          this._WishlistService.removeProductFromwishlist(productID).subscribe({
  
            next:res=>{
  
          
  
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
            
    
    
    
    
               
            
          }
        })
       }
  
      
    
  
    }
  
    getAllWishlist()
    {
  
      
      
      this.whishlistID.length=0;
  
  
      this.isloading=true;
  
          this._WishlistService.getAllWishListData().subscribe({
            next:res=>{
      
      
  

              this.wishlistData=res.data;


              this.isloading=false;
  
      
      
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
