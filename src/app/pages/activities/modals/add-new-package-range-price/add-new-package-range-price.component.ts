import { Component, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { IModalDialog, IModalDialogButton, ModalDialogService, IModalDialogOptions } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-add-new-package-range-price',
  templateUrl: './add-new-package-range-price.component.html',
  styleUrls: ['./add-new-package-range-price.component.css']
})
export class AddNewPackageRangePriceComponent implements IModalDialog {

  actionButtons: IModalDialogButton[] = [];
  name: string = '';
  details_url: string = '';
  fr_date: string = '';
  to_date: string = '';


  base_price : number = 0;
  persons : number = 1;

  constructor(
    private dataStore: DataStoreService,
    private router: Router,
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef
  ) {
    this.actionButtons = [
      { text: 'Save ', onAction: () => this.savePackagePrice() },
      { text: 'Close', onAction: () => true }
    ];
  }
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {

    // no processing needed
    options.actionButtons = this.actionButtons;
    options.title = "Add New Pricing For A Date";

  }

  savePackagePrice(){
    var chosen_package = this.dataStore.chosen_package.getValue();
    // console.log( this.chosen_date);
    // return;
    this.ngxService.start()
    this.api.addNewPackageRangePricing(chosen_package.id , this.base_price , this.fr_date , this.to_date).subscribe((data)=>{
      this.api.getPackage(chosen_package.id).subscribe((data1)=>{
        this.dataStore.setChosenPackage(data1);
        this.ngxService.stop();
      });
    });

    // console.log(this.dataStore.chosen_activity.getValue().id);
  }

}
