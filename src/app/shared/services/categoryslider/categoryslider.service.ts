import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Envirnoment } from '../../../base/Envirnoment';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../../interface/category';

@Injectable({
  providedIn: 'root'
})
export class CategorysliderService {

  constructor(private _HttpClient:HttpClient) { 

  }

  getAllCategories():Observable<CategoryResponse>
  {


    return this._HttpClient.get<CategoryResponse>(`${Envirnoment.baseUrl}/api/v1/categories`);
  }
}
