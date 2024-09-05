import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { CartComponent } from './layout/pages/cart/cart.component';
import { ForgetPasswordComponent } from './layout/additions/forget-password/forget-password.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { WishlistComponent } from './layout/pages/wishlist/wishlist/wishlist.component';
import { CategorydetailsComponent } from './layout/additions/CategoryDetails/categorydetails/categorydetails.component';
import { ShippingAddressComponent } from './layout/additions/shippingAddress/shipping-address/shipping-address.component';
import { AllordersComponent } from './layout/additions/allorders/allorders.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent,canActivate:[authGuard]},
    {path:'product',component:ProductsComponent,canActivate:[authGuard]},
    {path:'categories',component:CategoriesComponent,canActivate:[authGuard]},
    {path:'brands',component:BrandsComponent,canActivate:[authGuard]},
    {path:'cart',component:CartComponent,canActivate:[authGuard]},
    {path:'wishlist',component:WishlistComponent,canActivate:[authGuard]},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'productdetails/:Id',component:ProductDetailsComponent,canActivate:[authGuard]},
    {path:'allorders',component:AllordersComponent,canActivate:[authGuard]},

    {path:'categorydetails/:Id',component:CategorydetailsComponent,canActivate:[authGuard]},

    {path:'shipingAddress/:cardId',component:ShippingAddressComponent,canActivate:[authGuard]},

    {path:'forgetpassword',component:ForgetPasswordComponent},
    {path:'**',component:NotfoundComponent}
];
