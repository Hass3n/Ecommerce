import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../../shared/services/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { url } from 'node:inspector';
import { raceInit } from 'rxjs/internal/observable/race';
import { FlowbitServicesService } from '../../../../shared/services/flowbit/flowbit-services.service';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss'
})
export class ShippingAddressComponent {
    // Dropdown options
    dropdownOptions = [
      { value: 'Cashe', label: 'Cashe' ,},
      { value: 'online', label: 'online' },
    ];

    isloading=false;
  

  constructor(private _OrderService:OrderService,private _ActivatedRoute:ActivatedRoute ,private _Router:Router)
  {

  }

  shipformGroup:FormGroup=new FormGroup(
    {
      details:new FormControl(null,Validators.required),
      phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
      city:new FormControl(null,[Validators.required]),
      dropdownControl: new FormControl(this.dropdownOptions[0].value,Validators.required),
   
      
      

    }
    
  )



   cardId:string='';

  submitcheckoutOnline()
  {

    this._ActivatedRoute.paramMap.subscribe({
      next:p=>{
        
     
        this.cardId=p.get('cardId')!

      }
    })


    
    
    if(this.shipformGroup.valid)
    {

      this.isloading=true;



      if(this.shipformGroup.value['dropdownControl']=='Cashe')
       {

        this._OrderService.CreateCasheOrder(this.cardId,this.shipformGroup.value).subscribe({

          next:res=>{




            this.isloading=false;
            this._Router.navigate(['/allorders'])
            console.log('cashe',res);
            
          }
        })


        
       }

       else
       {

            this._OrderService.checkOut(this.cardId,this.shipformGroup.value).subscribe({
         next:res=>{



          this.isloading=false;
          console.log('online',res);
          

        window.open(res.session.url,'_self');
        
      }

    })
      
       }
  
    }

   
  }

}


// if(this.shipformGroup.valid)
//   {

//     this._OrderService.checkOut(p.get('cardId')!,this.shipformGroup.value).subscribe({
//       next:res=>{


//         window.open(res.session.url,'_self');
        
//       }

//     })



//   }