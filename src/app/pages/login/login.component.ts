import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  login_disabled : boolean = true;
  private readonly notifier: NotifierService;
  

  constructor(
    notifierService: NotifierService,
    private dataStore: DataStoreService,
    private router: Router , 
    private api: ApiService, 
    private modalService: ModalDialogService, 
    private viewRef: ViewContainerRef,
    private ngxService: NgxUiLoaderService) { 
      this.notifier = notifierService;
    }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')!=null) {
      this.router.navigateByUrl('/home');
   
    }else{
      this.router.navigateByUrl('/login');
    };
  }

  initiateLogIn(){
    this.ngxService.start();
    // alert("Loggon");
    this.api.login(this.email , this.password)
    .subscribe((data : any)=>{
      if( data.hasOwnProperty("access_token")){
        console.log(data);
        sessionStorage.setItem('token', data.access_token);
        this.ngOnInit();
        this.ngxService.stop();
        return;
      }else{
        this.notifier.notify('error', data.error);
        this.ngxService.stop();
        return;
      }
    });
  }

  resolved(captchaResponse: string) {
    if( captchaResponse == null){
      this.login_disabled = true;
    }else{
      this.login_disabled = false;
    }
    
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

}
