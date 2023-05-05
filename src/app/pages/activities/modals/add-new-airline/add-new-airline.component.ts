import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IModalDialog, IModalDialogButton, ModalDialogService, IModalDialogOptions } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-add-new-airline',
  templateUrl: './add-new-airline.component.html',
  styleUrls: ['./add-new-airline.component.css']
})
export class AddNewAirlineComponent implements IModalDialog {

  actionButtons: IModalDialogButton[] = [];

  airline = {
    full_name: '',
    iata_code: '',
    voucher_price: 0,
    tax_rate: 0
  }
  private readonly notifier: NotifierService;
  constructor(
    notifierService: NotifierService,
    private dataStore: DataStoreService,
    private router: Router,
    private api: ApiService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef,
    private ngxService: NgxUiLoaderService) {
    this.notifier = notifierService;

    this.actionButtons = [
      { text: 'Close', onAction: () => true }
    ];
  }
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    // no processing needed
    options.actionButtons = this.actionButtons;
    options.title = "Add New Agent";

  }

  createAirline() {

    if(this.airline.full_name == ''){
      alert('Airline Name is Required!!');
      return;
    }
    if(this.airline.iata_code == ''){
      alert('Airline IATA Code is Required!!');
      return;
    };;

    if(this.airline.voucher_price == 0){
      alert('Airline Voucher Price is Required!!');
      return;
    };;
    if(this.airline.tax_rate == undefined){
      alert('Airline Voucher Tax Rate is Required!!');
      return;
    };;

    this.ngxService.start();
      this.api.addNewAirline(this.airline)
        .subscribe((data : any) => {
          this.api.getAirlines()
            .subscribe((data: any) => {
              this.dataStore.setAirlines(data);
              this.ngxService.stop();
              this.notifier.notify('success', 'New Airline Added Successfully!');
              return true;
            });
        });
    return true;

  }

}
