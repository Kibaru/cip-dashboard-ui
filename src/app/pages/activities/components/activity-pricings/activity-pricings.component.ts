import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';
import { AddNewSingularAgebasedPricingDateComponent } from '../../modals/add-new-singular-agebased-pricing-date/add-new-singular-agebased-pricing-date.component';
import { AddNewSingularAgebasedPricingRangeComponent } from '../../modals/add-new-singular-agebased-pricing-range/add-new-singular-agebased-pricing-range.component';
import { AddNewSingularPricingDateComponent } from '../../modals/add-new-singular-pricing-date/add-new-singular-pricing-date.component';
import { AddNewSingularPricingRangeComponent } from '../../modals/add-new-singular-pricing-range/add-new-singular-pricing-range.component';

@Component({
  selector: 'app-activity-pricings',
  templateUrl: './activity-pricings.component.html',
  styleUrls: ['./activity-pricings.component.css']
})
export class ActivityPricingsComponent implements OnInit {

  activity!: any;
  standard_pricing_keys! :any;
  adult_pricing_keys! :any;
  child_pricing_keys! :any;
  infant_pricing_keys! :any;

  standard_pricing! : any;
  seasonal_pricings_ranges: any[] = [];
  seasonal_pricings_individuals: any[] = [];
  private readonly notifier: NotifierService;

  constructor(
    private dataStore: DataStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef,
    notifierService: NotifierService

  ) { 
    this.notifier = notifierService;

  }

  ngOnInit(): void {
    this.dataStore.chosen_activity.subscribe((data)=>{
      this.activity = data;
      this.seasonal_pricings_ranges = [];
      this.seasonal_pricings_individuals = [];
      this.activity.pricings = this.activity.pricings.reverse();
      this.activity.pricings.forEach((element: {
        infant_price: {};
        child_price: {};
        adult_price: {};
        date: any;
        individual_dates: any;
        seasonal_type: number;
        base_price: {}; pricing_type: number; 
      }) => {
        if(data.type == 2){
          if(element.pricing_type == 1){
            this.standard_pricing = element;
            this.adult_pricing_keys = Object.keys(element.adult_price);
            this.child_pricing_keys = Object.keys(element.child_price);
            this.infant_pricing_keys = Object.keys(element.infant_price);
          }else if(element.seasonal_type == 1){
            this.seasonal_pricings_ranges.push(element);
          }else if(element.seasonal_type == 2){
            this.seasonal_pricings_individuals.push(JSON.parse(JSON.stringify(element)));

          }
        }else{
          if(element.pricing_type == 1){
            this.standard_pricing = element;
            this.standard_pricing_keys = Object.keys(element.base_price);
          }else if(element.seasonal_type == 1){
            this.seasonal_pricings_ranges.push(element);
          }else if(element.seasonal_type == 2){
            this.seasonal_pricings_individuals.push(JSON.parse(JSON.stringify(element)));
            // var days_array = element.individual_dates.split(",");
            // days_array.forEach((day: any) => {
            //   console.log(day);
            //   element.date = day;
            //   this.seasonal_pricings_individuals.push(JSON.parse(JSON.stringify(element)));
            // });
            
          }
        }
        
      });

    });
  }

  getKVarray(element : any){
    return Object.keys(element.base_price);
  }
  getAllKVarray(element : any){
    return Object.keys(element);
  }

  addSeasonalPriceRange(){
    if(this.activity.type == 2){
      this.modalService.openDialog(this.viewRef, {
        title: 'Add New Seasonal Age Based Price Range',
        childComponent: AddNewSingularAgebasedPricingRangeComponent,
        settings:{
          modalDialogClass : 'modal-lg modal-dialog modal-dialog-centered ' 
        }
        
      });
    }else{
      this.modalService.openDialog(this.viewRef, {
        title: 'Add New Seasonal Price Range',
        childComponent: AddNewSingularPricingRangeComponent
      });
    }
    
  }
  addSeasonalPriceDate(){
    if(this.activity.type == 2){
      this.modalService.openDialog(this.viewRef, {
        title: 'Add New Seasonal Age Based Price Date',
        childComponent: AddNewSingularAgebasedPricingDateComponent,
        settings:{
          modalDialogClass : 'modal-lg modal-dialog modal-dialog-centered ' 
        }
        
      });
    }else{
      this.modalService.openDialog(this.viewRef, {
        title: 'Add New Seasonal Price Date',
        childComponent: AddNewSingularPricingDateComponent,
      });
    }
    
  }

  addStandardPriceset(){
    var keys = Object.keys(this.standard_pricing.base_price);
    var new_key = parseInt(keys[keys.length - 1]) + 1;

    this.standard_pricing.base_price[new_key] = "0000";
    this.standard_pricing_keys = Object.keys(this.standard_pricing.base_price);

    // var new_set = { new_key : "0000" };
    console.log(this.standard_pricing.base_price);

  }
  addAdultPriceset(){
    var keys = Object.keys(this.standard_pricing.adult_price);
    var new_key = parseInt(keys[keys.length - 1]) + 1;

    this.standard_pricing.adult_price[new_key] = "0000";
    this.adult_pricing_keys = Object.keys(this.standard_pricing.adult_price);

    // var new_set = { new_key : "0000" };
    console.log(this.standard_pricing.adult_price);

  }
  addChildPriceset(){
    var keys = Object.keys(this.standard_pricing.child_price);
    var new_key = parseInt(keys[keys.length - 1]) + 1;

    this.standard_pricing.child_price[new_key] = "0000";
    this.child_pricing_keys = Object.keys(this.standard_pricing.child_price);

    // var new_set = { new_key : "0000" };
    console.log(this.standard_pricing.child_price);
  }
  addInfantPriceset(){
    var keys = Object.keys(this.standard_pricing.infant_price);
    var new_key = parseInt(keys[keys.length - 1]) + 1;

    this.standard_pricing.infant_price[new_key] = "0000";
    this.infant_pricing_keys = Object.keys(this.standard_pricing.infant_price);

    // var new_set = { new_key : "0000" };
    console.log(this.standard_pricing.infant_price);
  }



  removeStandardPriceset(){
    var keys = Object.keys(this.standard_pricing.base_price);
    var last_key = (keys[keys.length - 1]);

    if (parseInt(last_key) > 1){
      delete this.standard_pricing.base_price[last_key];
    }
    this.standard_pricing_keys = Object.keys(this.standard_pricing.base_price);

    

    // var new_set = { new_key : "0000" };
    console.log(this.standard_pricing_keys);
    
  }  
  removeAdultPriceset(){
    var keys = Object.keys(this.standard_pricing.adult_price);
    var last_key = (keys[keys.length - 1]);

    if (parseInt(last_key) > 1){
      delete this.standard_pricing.adult_price[last_key];
    }
    this.adult_pricing_keys = Object.keys(this.standard_pricing.adult_price);

    

    // var new_set = { new_key : "0000" };
    console.log(this.standard_pricing_keys);
    
  }
  removeChildPriceset(){
    var keys = Object.keys(this.standard_pricing.child_price);
    var last_key = (keys[keys.length - 1]);

    if (parseInt(last_key) > 1){
      delete this.standard_pricing.child_price[last_key];
    }
    this.child_pricing_keys = Object.keys(this.standard_pricing.child_price);
    // var new_set = { new_key : "0000" };
    console.log(this.standard_pricing_keys);
    
  }
  removeInfantPriceset(){
      var keys = Object.keys(this.standard_pricing.infant_price);
      var last_key = (keys[keys.length - 1]);

      if (parseInt(last_key) > 1){
        delete this.standard_pricing.infant_price[last_key];
      }
      this.infant_pricing_keys = Object.keys(this.standard_pricing.infant_price);

      // var new_set = { new_key : "0000" };
      console.log(this.standard_pricing_keys);
      
  }

  addDateRangePriceset(pricing_id:any){

    console.log(pricing_id);
    var pricing_array = this.seasonal_pricings_ranges.filter((pricing)=>{
      return pricing.id == pricing_id;
    });
    console.log(this.seasonal_pricings_ranges);
    console.log(pricing_array);
    var keys = Object.keys(pricing_array[0].base_price);
    var new_key = parseInt(keys[keys.length - 1]) + 1;

    pricing_array[0].base_price[new_key] = "0000";
    // this.standard_pricing_keys = Object.keys(pricing_array[0].base_price);

    // var new_set = { new_key : "0000" };
    console.log(pricing_array[0].base_price);

  }

  removeDateRangePriceset(pricing_id:any){
    var pricing_array = this.seasonal_pricings_ranges.filter((pricing)=>{
      return pricing.id == pricing_id;
    });

    var keys = Object.keys(pricing_array[0].base_price);
    var last_key = (keys[keys.length - 1]);

    if (parseInt(last_key) > 1){
      delete pricing_array[0].base_price[last_key];
    }
    // this.standard_pricing_keys = Object.keys(pricing_array[0].base_price);

    

    // var new_set = { new_key : "0000" };
    console.log(pricing_array[0]);
    
  }

  addIndividualDateRangePriceset(pricing_id:any){

    console.log(pricing_id);
    var pricing_array = this.seasonal_pricings_individuals.filter((pricing)=>{
      return pricing.id == pricing_id;
    });
    console.log(this.seasonal_pricings_individuals);
    console.log(pricing_array);
    var keys = Object.keys(pricing_array[0].base_price);
    var new_key = parseInt(keys[keys.length - 1]) + 1;

    pricing_array[0].base_price[new_key] = "0000";
    // this.standard_pricing_keys = Object.keys(pricing_array[0].base_price);

    // var new_set = { new_key : "0000" };
    console.log(pricing_array[0].base_price);

  }

  removeIndividualDatePriceset(pricing_id:any){
    var pricing_array = this.seasonal_pricings_individuals.filter((pricing)=>{
      return pricing.id == pricing_id;
    });

    var keys = Object.keys(pricing_array[0].base_price);
    var last_key = (keys[keys.length - 1]);

    if (parseInt(last_key) > 1){
      delete pricing_array[0].base_price[last_key];
    }
    // this.standard_pricing_keys = Object.keys(pricing_array[0].base_price);

    

    // var new_set = { new_key : "0000" };
    console.log(pricing_array[0]);
    
  }

  updatePricingPersons( event: any , old_key :any){

    var new_key = event.target.value;


    this.standard_pricing.base_price[new_key] = this.standard_pricing.base_price[old_key];
    delete this.standard_pricing.base_price[old_key];
    this.standard_pricing_keys = Object.keys(this.standard_pricing.base_price);

    console.log("change "+ event.target.value);
  }

  updateStandardPricing(pricing_id : number){

    this.ngxService.start();
    this.api.updateStandardPricing(pricing_id , this.standard_pricing.base_price)
            .subscribe((data:any)=>{
              var activity = this.dataStore.chosen_activity.getValue();

              this.notifier.notify('success',data.message);

              this.api.getActivity(activity.id).subscribe((data1)=>{
                this.dataStore.setChosenActivity(data1);
                this.ngxService.stop();
              });
            });
    
    console.log(pricing_id);

    console.log(this.standard_pricing.base_price);
  }

  updateAdultPricing(pricing_id : number){

    this.ngxService.start();
    this.api.updateAdultPricing(pricing_id , this.standard_pricing.adult_price)
            .subscribe((data:any)=>{
              var activity = this.dataStore.chosen_activity.getValue();

              this.notifier.notify('success',data.message);

              this.api.getActivity(activity.id).subscribe((data1)=>{
                this.dataStore.setChosenActivity(data1);
                this.ngxService.stop();
              });
            });
    
    console.log(pricing_id);

    console.log(this.standard_pricing.base_price);
  }

  updateChildPricing(pricing_id : number){

    this.ngxService.start();
    this.api.updateChildPricing(pricing_id , this.standard_pricing.child_price)
            .subscribe((data:any)=>{
              var activity = this.dataStore.chosen_activity.getValue();

              this.notifier.notify('success',data.message);

              this.api.getActivity(activity.id).subscribe((data1)=>{
                this.dataStore.setChosenActivity(data1);
                this.ngxService.stop();
              });
            });
    
    console.log(pricing_id);

    console.log(this.standard_pricing.base_price);
  }

  updateInfantPricing(pricing_id : number){

    this.ngxService.start();
    this.api.updateInfantPricing(pricing_id , this.standard_pricing.infant_price)
            .subscribe((data:any)=>{
              var activity = this.dataStore.chosen_activity.getValue();

              this.notifier.notify('success',data.message);

              this.api.getActivity(activity.id).subscribe((data1)=>{
                this.dataStore.setChosenActivity(data1);
                this.ngxService.stop();
              });
            });
    
    console.log(pricing_id);

    console.log(this.standard_pricing.base_price);
  }

  updateSingularSeasonalRangePricing(pricing_id : number){

    this.ngxService.start();
    var pricing_array = this.seasonal_pricings_ranges.filter((pricing)=>{
      return pricing.id == pricing_id;
    });

    this.api.updateSingularSeasonalRangePricing(pricing_id , pricing_array[0].base_price)
            .subscribe((data)=>{
              var activity = this.dataStore.chosen_activity.getValue();
              this.api.getActivity(activity.id).subscribe((data1)=>{
                this.dataStore.setChosenActivity(data1);
                this.ngxService.stop();
              });
            });
    
    console.log(pricing_id);

    console.log(this.standard_pricing.base_price);
  }

  updateSingularSeasonalDatePricing(pricing_id : number){

    this.ngxService.start();
    var pricing_array = this.seasonal_pricings_individuals.filter((pricing)=>{
      return pricing.id == pricing_id;
    });

    this.api.updateSingularSeasonalDatePricing(pricing_id , pricing_array[0].base_price)
            .subscribe((data)=>{
              var activity = this.dataStore.chosen_activity.getValue();
              this.api.getActivity(activity.id).subscribe((data1)=>{
                this.dataStore.setChosenActivity(data1);
                this.ngxService.stop();
              });
            });
    
    console.log(pricing_id);

    console.log(this.standard_pricing.base_price);
  }

  deletePricing(pricing_id : number){

    this.ngxService.start();
    this.api.deletePricing(pricing_id).subscribe(()=>{
      var activity = this.dataStore.chosen_activity.getValue();
              this.api.getActivity(activity.id).subscribe((data1)=>{
                this.dataStore.setChosenActivity(data1);
                this.ngxService.stop();
              });
    });
  }

  deleteActivityPricing(pricing_id : number){

    this.ngxService.start();
    this.api.deleteSeasonalActivityPricing(this.activity.id , pricing_id).subscribe(()=>{
      var activity = this.dataStore.chosen_activity.getValue();
              this.api.getActivity(activity.id).subscribe((data1)=>{
                this.dataStore.setChosenActivity(data1);
                this.ngxService.stop();
              });
    });
  }
}
