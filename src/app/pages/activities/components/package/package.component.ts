import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';
import { AddNewPackageDatePriceComponent } from '../../modals/add-new-package-date-price/add-new-package-date-price.component';
import { AddNewPackageRangePriceComponent } from '../../modals/add-new-package-range-price/add-new-package-range-price.component';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {

  
  package : any = null;
  package_id : any;

  date_range_pricings  : any = null;
  date_individual_pricings  : any = null;
  
  private readonly notifier: NotifierService;

  constructor(
    private dataStore: DataStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef,
    notifierService: NotifierService,

  ) {
    this.notifier = notifierService;

   }

  ngOnInit(): void {
    this.ngxService.start();
    this.package_id = this.route.snapshot.paramMap.get('package_id') ;

    this.dataStore.chosen_package.subscribe((data)=>{
        if(data.name == null){
          this.package = {
            name : '',
            activity : {
              name : ''
            }

          }; 
        }else{
          this.package = data;
          this.package.pricings = this.package.pricings.reverse();
          this.date_range_pricings = this.package.pricings.filter((pricing: {
          pricing_type: number;
          seasonal_type: number; id: any; 
        })=>{
          return (pricing.pricing_type == 2 && pricing.seasonal_type == 1 );
        });
        this.date_individual_pricings = this.package.pricings.filter((pricing: {
          pricing_type: number;
          seasonal_type: number; id: any; 
        })=>{
          return (pricing.pricing_type == 2 && pricing.seasonal_type == 2 );
        });
        }
        
        
    });
    
    this.api.getPackage(this.package_id )
      .subscribe((data: any) => {
        console.log(data);

        this.dataStore.setChosenPackage(data);
        this.ngxService.stop();
        return;
      });
  }

  getKVarray(element : any){
    console.log(element);
    return Object.keys(element);
  }

  updatePackage(){

    this.ngxService.start();
    this.api.updatePackage(this.package)
    .subscribe((data:any)=>{
      this.api.getPackage(this.package_id )
      .subscribe((data: any) => {
        console.log(data);
        this.dataStore.setChosenPackage(data);
        this.ngxService.stop();
        this.notifier.notify('success', 'Package Updated Successfully!');
        return;
      });
    });
  }

  updatePackagePricing(element : any){
    console.log(element.id);
    console.log(element.base_price);

    this.ngxService.start();
    this.api.updatePackagePricing(element.id , element)
    .subscribe((data:any)=>{
      this.api.getPackage(this.package_id )
      .subscribe((data: any) => {
        console.log(data);
        this.dataStore.setChosenPackage(data);
        this.ngxService.stop();
        this.notifier.notify('success', 'Pricing Updated Successfully!');
        return;
      });
    });
  }

  deletePackagePricing(element : any){
    console.log(element.id);
    console.log(element.base_price);

    this.ngxService.start();
    this.api.deletePackagePricing(element.id)
    .subscribe((data:any)=>{
      this.api.getPackage(this.package_id )
      .subscribe((data: any) => {
        console.log(data);
        this.dataStore.setChosenPackage(data);
        this.ngxService.stop();
        this.notifier.notify('warning', 'Pricing Deleted Successfully!');
        return;
      });
    });
  }

  addPackagePriceSet(element: any){

    var keys = Object.keys(element.pricings[0].base_price);
    var new_key = parseInt(keys[keys.length - 1]) + 1;

    element.pricings[0].base_price[new_key] = 0;

  }
  removePackagePriceSet(element: any){

    var keys = Object.keys(element.pricings[0].base_price);
    var last_key = (keys[keys.length - 1]);

    if (parseInt(last_key) > 1) {
      delete element.pricings[0].base_price[last_key];
    }

  }

  addSeasonalPackagePriceSet(element: any){

    var keys = Object.keys(element.base_price);
    var new_key = parseInt(keys[keys.length - 1]) + 1;

    element.base_price[new_key] = 0;

  }
  removeSeasonalPackagePriceSet(element: any){

    var keys = Object.keys(element.base_price);
    var last_key = (keys[keys.length - 1]);

    if (parseInt(last_key) > 1) {
      delete element.base_price[last_key];
    }

  }

  changeKey(prevKey: string | number, target: any, obj: any ) {
    const value = obj[prevKey];
    delete obj[prevKey];
    obj[target.value] = value;
  }

  addNewDatePricing(){
    this.modalService.openDialog(this.viewRef, {
      title: 'Add New Date Package',
      childComponent: AddNewPackageDatePriceComponent
    });
  }

  addNewRangePricing(){
    this.modalService.openDialog(this.viewRef, {
      title: 'Add New Range Package',
      childComponent: AddNewPackageRangePriceComponent
    });
  }

}
