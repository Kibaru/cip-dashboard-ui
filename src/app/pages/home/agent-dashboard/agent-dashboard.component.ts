import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';
import { CreateNewVoucherComponent } from '../../activities/modals/create-new-voucher/create-new-voucher.component';
import { ScanBoardingPassComponent } from '../../activities/modals/scan-boarding-pass/scan-boarding-pass.component';

@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.css']
})
export class AgentDashboardComponent implements OnInit {

  private readonly notifier: NotifierService;
  dashboardInfo: any = {};
  packages:any[] = [];
  todays_guests = 0;
  dashboardInfoSubscription!: Subscription;
  


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

    this.ngxService.start();

    this.dashboardInfoSubscription = this.dataStore.dashboardInfo
    .subscribe((data)=>{
      this.dashboardInfo = data;
    });


    this.api.getAirlines().subscribe((airlines)=>{
      this.dataStore.setAirlines(airlines);
    });


    // this.api.getDashboardInfo()
    // .subscribe((data :any)=>{
    //   // this.dataStore.setDashboardInfo(data);
    //   this.dashboardInfo = data;
    //   console.log("Getting Dashboard Info",this.dashboardInfo);
    //   this.dataStore.setDashboardInfo(this.dashboardInfo);

      
      

    // });

    this.api.getActivityPackages(10203)
      .subscribe((data: any) => {
        console.log(data);
        this.packages = data;
        this.dataStore.setChosenActivityPackages(data);

        this.dataStore.entries
          .subscribe((entries_data) =>{
            this.todays_guests = 0;
            entries_data.forEach((element: { created_at: any; }) => {
              // console.log(element.created_at);
              let today = new Date().toISOString().slice(0, 10);
              if(element.created_at.startsWith(today)){
                  this.todays_guests++;
              }
            });
          });
        this.ngxService.stop();
        return;
      });


  }

  scanBoardingPass(){
    this.modalService.openDialog(this.viewRef, {
      title: 'Scan Boarding Pass',
      childComponent: ScanBoardingPassComponent,
      closeDialogSubject: new Subject(),
      settings:{
        modalDialogClass : 'modal-lg modal-dialog modal-dialog-centered ' 
      }
    });
  }


  generateNewVoucher(){
    this.modalService.openDialog(this.viewRef, {
      title: 'Create New Voucher',
      childComponent: CreateNewVoucherComponent,
      closeDialogSubject: new Subject(),
      settings:{
        modalDialogClass : 'modal-lg modal-dialog modal-dialog-centered ' 
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event

    this.dashboardInfoSubscription.unsubscribe();
  } 

}
