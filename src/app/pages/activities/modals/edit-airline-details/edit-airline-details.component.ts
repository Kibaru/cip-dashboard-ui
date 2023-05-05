import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IModalDialog, IModalDialogButton, ModalDialogService, IModalDialogOptions } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-edit-airline-details',
  templateUrl: './edit-airline-details.component.html',
  styleUrls: ['./edit-airline-details.component.css']
})
export class EditAirlineDetailsComponent implements IModalDialog {

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
      { text: 'Save ', onAction: () => { return this.updateAirline(); } },
      { text: 'Close', onAction: () => true }
    ];
  }
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    // no processing needed
    options.actionButtons = this.actionButtons;
    options.title = "Edit Airline Details";
    this.airline = this.dataStore.selected_airline_data.getValue();

  }

  updateAirline() {

    if(this.airline.full_name == ''){
      alert('Airline Name is Required!!');
      return;
    }
    if(this.airline.iata_code == ''){
      alert('Airline IATA Code is Required!!');
      return;
    };;

    console.log(this.airline);

    this.ngxService.start();
      this.api.updateAirline(this.airline)
        .subscribe((data : any) => {
          this.api.getAirlines()
            .subscribe((data: any) => {
              this.dataStore.setAirlines(data);
              this.ngxService.stop();
              this.notifier.notify('success', 'Airline Edited Successfully!');
              return true;
            });
        });
    return true;

  }

}
