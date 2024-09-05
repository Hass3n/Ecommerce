import { Component, OnInit } from '@angular/core';
import { CategorysliderService } from '../../../../shared/services/categoryslider/categoryslider.service';
import { Category } from '../../../../shared/interface/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit {


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
        items: 7
      },
    
    },
    nav: true
  }


 categoryList !:Category[];


 isloading:boolean=false;
  constructor(private _CategorysliderService:CategorysliderService)
  {

  }

  ngOnInit(): void {
    
    this.getAllCategory();
  }

  getAllCategory()
  {

    this.isloading=true;

    this._CategorysliderService.getAllCategories().subscribe({
      next:res=>{


        this.categoryList=res.data;
        this.isloading=false;
        console.log('data is',res.data);
        
      },

      error:err=>{
        this.isloading=false;

      }
    })
  }

}
