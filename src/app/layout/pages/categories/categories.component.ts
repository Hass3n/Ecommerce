import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { category } from '../../../shared/interface/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  categoryData!:category[];
  isloading:boolean=false;
  constructor(private _CategoryService :CategoryService)
  {

  }


  ngOnInit(): void {

    if(typeof localStorage!='undefined')
    {

      localStorage.setItem('currentPage','/categories');


    }

    this.getAllCategory();
  }

getAllCategory()
{


  this.isloading=true;

  this._CategoryService.getCategory().subscribe({
    next:res=>{


      this.isloading=false;
      this.categoryData=res.data;

      console.log(res);
      
    }
  })
}





}
