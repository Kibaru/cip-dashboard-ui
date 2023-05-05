import { Component, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, ModalDialogService, IModalDialogOptions } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-add-new-singular-agebased-pricing-date',
  templateUrl: './add-new-singular-agebased-pricing-date.component.html',
  styleUrls: ['./add-new-singular-agebased-pricing-date.component.css']
})
export class AddNewSingularAgebasedPricingDateComponent implements IModalDialog {

  actionButtons: IModalDialogButton[] = [];
  adult_pricing : any = { 1 : "0000" };
  child_pricing : any = { 1 : "0000" };
  infant_pricing : any = { 1 : "0000" };

  persons : string = '';
  fr_date: string = '';
  chosen_date : string = '';

  constructor(
    private dataStore: DataStoreService,
    private router: Router,
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef
  ) {
    this.actionButtons = [
      { text: 'Save ', onAction: () => this.saveDate() },
      { text: 'Close', onAction: () => true }
    ];
  }
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {

    


    // no processing needed
    options.actionButtons = this.actionButtons;
    options.title = "Add New Range";

  }

  getKVarray(element : any){
    return Object.keys(element);
  }

  addAdultPriceset(){
    var keys = Object.keys(this.adult_pricing);
    var new_key = parseInt(keys[keys.length - 1]) + 1;

    this.adult_pricing[new_key] = "0000";

    // var new_set = { new_key : "0000" };
    console.log(this.adult_pricing);
  }
  removeAdultPriceset(){
    var keys = Object.keys(this.adult_pricing);
    var last_key = (keys[keys.length - 1]);

    if (parseInt(last_key) > 1){
      delete this.adult_pricing[last_key];
    }
    
    // var new_set = { new_key : "0000" };
    console.log(this.adult_pricing);
  }

  addChildPriceset(){
    var keys = Object.keys(this.child_pricing);
    var new_key = parseInt(keys[keys.length - 1]) + 1;

    this.child_pricing[new_key] = "0000";

    // var new_set = { new_key : "0000" };
    console.log(this.child_pricing);
  }
  removeChildPriceset(){
    var keys = Object.keys(this.child_pricing);
    var last_key = (keys[keys.length - 1]);

    if (parseInt(last_key) > 1){
      delete this.child_pricing[last_key];
    }
    
    // var new_set = { new_key : "0000" };
    console.log(this.child_pricing);
  }

  addInfantPriceset(){
    var keys = Object.keys(this.infant_pricing);
    var new_key = parseInt(keys[keys.length - 1]) + 1;

    this.infant_pricing[new_key] = "0000";

    // var new_set = { new_key : "0000" };
    console.log(this.infant_pricing);
  }
  removeInfantPriceset(){
    var keys = Object.keys(this.infant_pricing);
    var last_key = (keys[keys.length - 1]);

    if (parseInt(last_key) > 1){
      delete this.infant_pricing[last_key];
    }
    
    // var new_set = { new_key : "0000" };
    console.log(this.infant_pricing);
  }

  updateAdultPricingPersons( event: any , old_key :any){

    var new_key = event.target.value;

    // var new_pair = {
    //   new_key : this.pricing[old_key]
    // };

    this.adult_pricing[new_key] = this.adult_pricing[old_key];
    delete this.adult_pricing[old_key];

    console.log("change "+ event.target.value);
  }
  updateChildPricingPersons( event: any , old_key :any){

    var new_key = event.target.value;

    // var new_pair = {
    //   new_key : this.pricing[old_key]
    // };

    this.child_pricing[new_key] = this.child_pricing[old_key];
    delete this.child_pricing[old_key];

    console.log("change "+ event.target.value);
  }
  updateInfantPricingPersons( event: any , old_key :any){

    var new_key = event.target.value;

    // var new_pair = {
    //   new_key : this.pricing[old_key]
    // };

    this.infant_pricing[new_key] = this.infant_pricing[old_key];
    delete this.infant_pricing[old_key];

    console.log("change "+ event.target.value);
  }

  saveDate(){
    console.log(this.adult_pricing);
    console.log(this.child_pricing);
    console.log(this.infant_pricing);

    var pricings = {
      date : this.chosen_date,
      adult_price : this.adult_pricing,
      child_price : this.child_pricing,
      infant_price : this.infant_pricing
    }
    var activity = this.dataStore.chosen_activity.getValue();

    var date = this.chosen_date ;
    console.log(date);


    this.ngxService.start()
    this.api.addNewStandardSeasonalPricingDate(activity.id , pricings ).subscribe((data)=>{
      this.api.getActivity(activity.id).subscribe((data1)=>{
        this.dataStore.setChosenActivity(data1);
        this.ngxService.stop();
      });
    });

    // console.log(this.dataStore.chosen_activity.getValue().id);
  }
}
