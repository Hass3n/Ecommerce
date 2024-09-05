import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../interface/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(productList:product[],serchword:string): product[] {
    return productList.filter((item)=>{
      return item.title.toLowerCase().includes(serchword.toLowerCase())
    });
  }

}
