import { Component, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { verify } from 'crypto';
import { IModalDialog, IModalDialogButton, IModalDialogOptions, ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements IModalDialog {

  actionButtons: IModalDialogButton[] = [];

  user = {
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
    options.title = "Add New User";

  }

  createUser() {
    // if (this.user.password == this.user.verify_password) {
      this.ngxService.start();
      this.api.addNewUser(this.dataStore.dashboardInfo.getValue().company.id, this.user)
        .subscribe((data:any) => {
          if( data.hasOwnProperty("error")){
            this.notifier.notify('error', data.error);
            this.ngxService.stop();
            return;
          }
          this.api.getUsers(this.dataStore.dashboardInfo.getValue().company.id)
            .subscribe((data: any) => {
              this.dataStore.setUsers(data);
     

              this.ngxService.stop();
              this.notifier.notify('success', 'New User Added Successfully!. Login Instructions Have Been Sent To The Email.');
              return true;
            });
        });
    // } else {
    //   this.notifier.notify('error', 'Password and Password Confirmation Do Not Match!');
    //   return true;
    // }
    return true;

  }

 

}
