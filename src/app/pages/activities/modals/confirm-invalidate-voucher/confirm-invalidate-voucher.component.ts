import { Component, ComponentRef } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-confirm-invalidate-voucher',
  templateUrl: './confirm-invalidate-voucher.component.html',
  styleUrls: ['./confirm-invalidate-voucher.component.css']
})
export class ConfirmInvalidateVoucherComponent  implements IModalDialog  {



  voucher : any = {};


  actionButtons: IModalDialogButton[] = [];
  closeSubject!: Subject<void>;
  compartment_code: string = "";



  private readonly notifier: NotifierService;
  airlines: any;



  constructor (  
    notifierService: NotifierService,
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private dataStore: DataStoreService, ) { 
      this.notifier = notifierService;
    this.actionButtons = [
      
      { text: 'Close', onAction: () => true }
    ]
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    // no processing needed
    this.closeSubject = options.closeDialogSubject!;
    options.actionButtons = this.actionButtons;
    options.title = 'Invalidate Voucher';

  }

  ngOnInit(): void {
    this.voucher = this.dataStore.chosen_invalidation_voucher.getValue();

  }

  invalidateVoucher(){
    
    

    this.ngxService.start();

    let voucher = this.dataStore.chosen_invalidation_voucher.getValue();

    this.api.invalidateVoucher(voucher.id)
    .subscribe((save_entry_data)=>{

        this.api.getDashboardInfo()
        .subscribe((data :any)=>{
          // this.dataStore.setDashboardInfo(data);
          this.dataStore.setDashboardInfo(data);
          this.closeSubject.next(); 
          this.ngxService.stop();
          this.notifier.notify('success', 'Voucher Invalidated Successfully!');

          return true

        });
    });

 

    
  }

}
