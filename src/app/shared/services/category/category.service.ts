import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Envirnoment } from '../../../base/Envirnoment';
import { Observable } from 'rxjs';
import { category, CategoryResponse } from '../../interface/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) { }

  getCategory():Observable<CategoryResponse>
  {

  return  this._HttpClient.get<CategoryResponse>(`${Envirnoment.baseUrl}/api/v1/categories`);
  }


  getSpecificCategory(productID:string):Observable<category>
  {

   return this._HttpClient.get<category>(`${Envirnoment.baseUrl}/api/v1/categories/${productID}`);

  }
}
