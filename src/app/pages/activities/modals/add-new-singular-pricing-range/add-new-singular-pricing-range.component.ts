import { Component, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { IModalDialog, IModalDialogButton, ModalDialogService, IModalDialogOptions } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-add-new-singular-pricing-range',
  templateUrl: './add-new-singular-pricing-range.component.html',
  styleUrls: ['./add-new-singular-pricing-range.component.css']
})
export class AddNewSingularPricingRangeComponent implements IModalDialog {

  actionButtons: IModalDialogButton[] = [];
  pricing : any = { 1 : "0000" };
  persons : string = '';
  fr_date: string = '';
  to_date : string = '';

  constructor(
    private dataStore: DataStoreService,
    private router: Router,
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef
  ) {
    this.actionButtons = [
      { text: 'Save ', onAction: () => this.saveRange() },
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

  addPriceset(){
    var keys = Object.keys(this.pricing);
    var new_key = parseInt(keys[keys.length - 1]) + 1;

    this.pricing[new_key] = "0000";

    // var new_set = { new_key : "0000" };
    console.log(this.pricing);

  }

  removePriceset(){
    var keys = Object.keys(this.pricing);
    var last_key = (keys[keys.length - 1]);

    if (parseInt(last_key) > 1){
      delete this.pricing[last_key];
    }
    

    // var new_set = { new_key : "0000" };
    console.log(this.pricing);
    
  }

  updatePricingPersons( event: any , old_key :any){

    var new_key = event.target.value;

    // var new_pair = {
    //   new_key : this.pricing[old_key]
    // };

    this.pricing[new_key] = this.pricing[old_key];
    delete this.pricing[old_key];

    console.log("change "+ event.target.value);
  }

  saveRange(){
    console.log(this.pricing);
    var activity = this.dataStore.chosen_activity.getValue();

    var date_range = this.fr_date + " ~ "+ this.to_date;
    console.log(date_range);


    this.ngxService.start()
    this.api.addNewSingularSeasonalPricingRange(activity.id , date_range, this.pricing ).subscribe((data)=>{
      this.api.getActivity(activity.id).subscribe((data1)=>{
        this.dataStore.setChosenActivity(data1);
        this.ngxService.stop();
      });
    });

    console.log(this.dataStore.chosen_activity.getValue().id);
  }
}
