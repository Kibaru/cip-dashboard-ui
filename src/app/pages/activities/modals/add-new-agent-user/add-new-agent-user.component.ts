import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IModalDialog, IModalDialogButton, ModalDialogService, IModalDialogOptions } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-add-new-agent-user',
  templateUrl: './add-new-agent-user.component.html',
  styleUrls: ['./add-new-agent-user.component.css']
})
export class AddNewAgentUserComponent implements IModalDialog {

  actionButtons: IModalDialogButton[] = [];

  user : any = {
    name: '',
    email: '',
    password: '',
    verify_password: ''
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
      { text: 'Save ', onAction: () => { return this.createUser(); } },
      { text: 'Close', onAction: () => true }
    ];
  }
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    // no processing needed
    options.actionButtons = this.actionButtons;
    options.title = "Add New Agent User";

  }

  createUser() {
    // if (this.user.password == this.user.verify_password) {
      this.ngxService.start();
      console.log("Create Agent User" , this.dataStore.userInfo.getValue());
      this.user.company_id = this.dataStore.userInfo.getValue().company_id;
      this.api.addNewAgentUser(this.dataStore.selected_agent_data.getValue().id , this.user)
        .subscribe((data:any) => {
          if( data.hasOwnProperty("error")){
            this.notifier.notify('error', data.error);
            this.ngxService.stop();
            return;
          }else{
            this.refreshAgentUsers();
            this.ngxService.stop();
            this.notifier.notify('success', 'New User Added Successfully!. Login Instructions Have Been Sent To The Email.');
            return true;
          }
          
        });
    // } else {
    //   this.notifier.notify('error', 'Password and Password Confirmation Do Not Match!');
    //   return true;
    // }
    return true;

  }

  async refreshAgentUsers(){

    const adata = await this.api.getAgentUsers(this.dataStore.dashboardInfo.getValue().agent.id ).toPromise();
    this.dataStore.setAgentUsers(adata);

  }

}
