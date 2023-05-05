import { Component, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, ModalDialogService, IModalDialogOptions } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-add-new-inclusion',
  templateUrl: './add-new-inclusion.component.html',
  styleUrls: ['./add-new-inclusion.component.css']
})
export class AddNewInclusionComponent implements IModalDialog {

  actionButtons: IModalDialogButton[] = [];
  name: string = '';
  details_url: string = '';

  base_price : number = 0;

  constructor(
    private dataStore: DataStoreService,
    private router: Router,
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef
  ) {
    this.actionButtons = [
      { text: 'Save ', onAction: () => this.saveInclusion() },
      { text: 'Close', onAction: () => true }
    ];
  }
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {

    


    // no processing needed
    options.actionButtons = this.actionButtons;
    options.title = "Add New Inclusion";

  }



  saveInclusion(){
    var activity = this.dataStore.chosen_activity.getValue();

    this.ngxService.start()
    this.api.addNewInclusion(activity.id , this.name , this.details_url).subscribe((data)=>{
      this.api.getActivity(activity.id).subscribe((data1)=>{
        this.dataStore.setChosenActivity(data1);
        this.ngxService.stop();
      });
    });

    console.log(this.dataStore.chosen_activity.getValue().id);
  }
}
