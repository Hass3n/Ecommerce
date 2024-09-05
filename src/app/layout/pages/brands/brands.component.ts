import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../shared/services/brand/brand.service';
import { Datum } from '../../../shared/interface/brand';


@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  brandData !:Datum[];
  isloading:boolean=false;

  constructor(private _BrandService :BrandService)
  {

  }

  ngOnInit(): void {

    if(typeof localStorage!='undefined')
    {

      localStorage.setItem('currentPage','/brands')


    }

    this.getAllBrands();
  }

  getAllBrands()
  {
    this.isloading=true;
    this._BrandService.getBrands().subscribe({
      next:res=>{

        this.isloading=false;

        this.brandData=res.data


      }
    })
  }
}
