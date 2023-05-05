import { Component, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, ModalDialogService, IModalDialogOptions } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-add-new-availability-date',
  templateUrl: './add-new-availability-date.component.html',
  styleUrls: ['./add-new-availability-date.component.css']
})
export class AddNewAvailabilityDateComponent implements IModalDialog {

  actionButtons: IModalDialogButton[] = [];
  pricing : any = { 1 : "0000" };
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
    options.title = "Add New Date";

  }

  

  saveDate(){
    console.log(this.pricing);
    var activity = this.dataStore.chosen_activity.getValue();

    var date = this.chosen_date ;
    console.log(date);


    this.ngxService.start()
    this.api.addNewAvailabilityDate(activity.id , date ).subscribe((data)=>{
      this.api.getActivity(activity.id).subscribe((data1:any)=>{
        this.dataStore.setChosenActivityAvailabilities(data1.availabilities);
        this.dataStore.setChosenActivity(data1);
        this.ngxService.stop();
      });
    });

    console.log(this.dataStore.chosen_activity.getValue().id);
  }
}
