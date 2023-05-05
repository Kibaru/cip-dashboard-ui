import { Component, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, ModalDialogService, IModalDialogOptions } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-add-new-availability-range',
  templateUrl: './add-new-availability-range.component.html',
  styleUrls: ['./add-new-availability-range.component.css']
})
export class AddNewAvailabilityRangeComponent implements IModalDialog {

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

 

  saveRange(){
    console.log(this.pricing);
    var activity = this.dataStore.chosen_activity.getValue();

    var date_range = this.fr_date + " ~ "+ this.to_date;
    console.log(date_range);


    this.ngxService.start()
    this.api.addNewAvailabilityRange(activity.id , date_range ).subscribe((data)=>{
      this.api.getActivity(activity.id).subscribe((data1:any)=>{
        this.dataStore.setChosenActivityAvailabilities(data1.availabilities);
        this.dataStore.setChosenActivity(data1);
        this.ngxService.stop();
      });
    });

    console.log(this.dataStore.chosen_activity.getValue().id);
  }
}
