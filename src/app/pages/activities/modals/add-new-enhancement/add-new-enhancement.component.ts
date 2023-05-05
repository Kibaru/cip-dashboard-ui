import { Component, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, ModalDialogService, IModalDialogOptions } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-add-new-enhancement',
  templateUrl: './add-new-enhancement.component.html',
  styleUrls: ['./add-new-enhancement.component.css']
})
export class AddNewEnhancementComponent implements IModalDialog {

  actionButtons: IModalDialogButton[] = [];
  name: string = '';
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
      { text: 'Save ', onAction: () => this.saveEnhancement() },
      { text: 'Close', onAction: () => true }
    ];
  }
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {

    


    // no processing needed
    options.actionButtons = this.actionButtons;
    options.title = "Add New Range";

  }



  saveEnhancement(){
    var activity = this.dataStore.chosen_activity.getValue();

    this.ngxService.start()
    this.api.addNewEnhancement(activity.id , this.name, this.base_price ).subscribe((data)=>{
      this.api.getActivity(activity.id).subscribe((data1)=>{
        this.dataStore.setChosenActivity(data1);
        this.ngxService.stop();
      });
    });

    console.log(this.dataStore.chosen_activity.getValue().id);
  }
}
