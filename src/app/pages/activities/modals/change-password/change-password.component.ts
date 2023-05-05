import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IModalDialog, IModalDialogButton, ModalDialogService, IModalDialogOptions } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements IModalDialog {

  actionButtons: IModalDialogButton[] = [];

  user : any = {
    current_password: '',
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
      { text: 'Save ', onAction: () => { return this.changePassword(); } },
      { text: 'Close', onAction: () => true }
    ];
  }
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    // no processing needed
    options.actionButtons = this.actionButtons;
    options.title = "Change Password";

  }

  changePassword() {
    if (this.user.password == this.user.verify_password) {
      this.ngxService.start();
        // alert("Loggon");
        this.api.changeUserPassword(this.user.current_password , this.user.password)
        .subscribe((data : any)=>{
          if( data.hasOwnProperty("access_token")){
            console.log(data);
            sessionStorage.setItem('token', data.access_token);
            this.notifier.notify('success', 'Password Successfully Changed');
            this.ngxService.stop();
            return;
          }else{
            this.notifier.notify('error', data.error);
            this.ngxService.stop();
            return;
          }
        });

    } else {
      this.notifier.notify('error', 'Password and Password Confirmation Do Not Match!');
      return true;
    }
    return true;

  }



}
