import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IModalDialog, IModalDialogButton, ModalDialogService, IModalDialogOptions } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-add-new-agent',
  templateUrl: './add-new-agent.component.html',
  styleUrls: ['./add-new-agent.component.css']
})
export class AddNewAgentComponent implements IModalDialog {

  actionButtons: IModalDialogButton[] = [];

  agent = {
    full_name: '',
    admin_email: '',
    admin_name: '',
    admin_phone_number: '',
    billing_email: '',
    billing_phone_number: '',
    daily_limit : 10
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
      { text: 'Save ', onAction: () => { return this.createAgent(); } },
      { text: 'Close', onAction: () => true }
    ];
  }
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    // no processing needed
    options.actionButtons = this.actionButtons;
    options.title = "Add New Agent";

  }

  createAgent() {

    if(this.agent.full_name == ''){
      this.notifier.notify('error', 'The Full Name is Required');
      return;
    };
    if(this.agent.admin_name  == ''){
      this.notifier.notify('error', 'The Name Of The Admin User is Required');
      return;
    };
    if(this.agent.admin_name  == ''){
      this.notifier.notify('error', 'The Admin Name is Required');
      return;
    };
    if(this.agent.admin_email  == ''){
      this.notifier.notify('error', 'The Admin Email Address is Required');
      return;
    };
    if(this.agent.billing_email  == ''){
      this.notifier.notify('error', 'The Billing Email is Required');
      return;
    };
    if(this.agent.billing_phone_number  == ''){
      this.notifier.notify('error', 'The Billing Phone Number is Required');
      return;
    };
    if(this.agent.daily_limit  == 0){
      this.notifier.notify('error', 'The Billing Phone Number is Required');
      return;
    };


    this.ngxService.start();
      this.api.addNewAgent(this.agent)
        .subscribe((data : any) => {
          if( data.hasOwnProperty("error")){
            this.notifier.notify('error', data.error);
            this.ngxService.stop();
            return;
          }
          this.api.getAgents()
            .subscribe((data: any) => {
              this.dataStore.setAgents(data);
              this.ngxService.stop();
              this.notifier.notify('success', 'New Agent Added Successfully! Login Instructions Have Been Sent To The Email.');
              return true;
            });
        });
    return true;

  }

}
