import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../shared/services/category/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [],
  templateUrl: './categorydetails.component.html',
  styleUrl: './categorydetails.component.scss'
})
export class CategorydetailsComponent implements OnInit {

  constructor(private _CategoryService :CategoryService,private  _ActivatedRoute :ActivatedRoute)
  {




  }

  ngOnInit(): void {
    
    this.getAllSpecificCategory();
  }


  getAllSpecificCategory()
  {


    let Id:string='';

    this._ActivatedRoute.params.subscribe({
      next:parm=>{
        Id=parm['Id']

        console.log('id',Id);
        
      },
      error:err=>{
        console.log(err);
        
      }
    })

    // get id from url

    this._CategoryService.getSpecificCategory(Id).subscribe({
      next:res=>{
        console.log('specific',res);
        
      }
    })

  }



}
