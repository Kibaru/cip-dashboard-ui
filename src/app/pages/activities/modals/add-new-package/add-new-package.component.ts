import { Component, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IModalDialog, IModalDialogButton, ModalDialogService, IModalDialogOptions } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-add-new-package',
  templateUrl: './add-new-package.component.html',
  styleUrls: ['./add-new-package.component.css']
})
export class AddNewPackageComponent implements IModalDialog {

  actionButtons: IModalDialogButton[] = [];
  name: string = '';
  details_url: string = '';

  persons:number = 1;
  base_price : number = 0;

  private readonly notifier: NotifierService;


  constructor(
    private dataStore: DataStoreService,
    private router: Router,
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef,
    notifierService: NotifierService,
    
  ) {

    this.notifier = notifierService;

    this.actionButtons = [
      { text: 'Save ', onAction: () => this.savePackage() },
      { text: 'Close', onAction: () => true }
    ];
  }
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {

    // no processing needed
    options.actionButtons = this.actionButtons;
    options.title = "Add New Package";

  }



  savePackage(){
    var activity = this.dataStore.chosen_activity.getValue();

    this.ngxService.start()
    this.api.addNewPackage(activity.id , this.name , this.base_price).subscribe((data)=>{
      this.api.getActivityPackages(activity.id )
      .subscribe((data: any) => {
        console.log(data);
        this.dataStore.setChosenActivityPackages(data);     
        this.ngxService.stop();
        this.notifier.notify('success', 'Package Added Successfully!');
   
        return;
      });
    });

    console.log(this.dataStore.chosen_activity.getValue().id);
  }
}
