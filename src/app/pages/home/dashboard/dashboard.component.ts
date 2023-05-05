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
// import { NgxSpinnerService } from 'ngx-spinner';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { ApiServiceService } from 'src/app/services/api-service.service';
// import { DataStoreService } from 'src/app/services/data-store.service';


import { DatePipe } from '@angular/common'
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private readonly notifier: NotifierService;
  dashboardInfo: any = {};
  packages:any[] = [];
  todays_expected_guests:any = 0;
  todays_redeemed_guests = 0;

  dashboardInfoSubscription!: Subscription;

  filterForm!: FormGroup  

  constructor(
    private datePipe: DatePipe,
    notifierService: NotifierService,
    private dataStore: DataStoreService,
    private router: Router , 
    private api: ApiService, 
    private modalService: ModalDialogService, 
    private viewRef: ViewContainerRef,
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder) { 
      this.notifier = notifierService;
    }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      days: ['1']
    })
    
    this.ngxService.start();
    this.api.getAirlines().subscribe((airlines)=>{
      this.dataStore.setAirlines(airlines);
    });
    this.getUsers()
  }


  filterByDays(): void {
    this.ngxService.start();
    this.getUsers()    
    this.ngxService.stop();
  }


  getUsers(): void {
    this.dashboardInfoSubscription = this.dataStore.dashboardInfo
    .subscribe((data)=> {
      this.dashboardInfo = data;
    });
    this.api.getActivityPackages(10203)
      .subscribe((data: any) => {
        // console.log(data);
        this.packages = data;
        this.dataStore.setChosenActivityPackages(data);
        this.dataStore.entries
          .subscribe((entries_data) =>{ 
            this.todays_expected_guests = 0;
            // console.log("NUMBER IS: ", entries_data)
            entries_data.forEach((element: { flight_date: any; created_at: any; redeemed: any; redemption_time: any; is_valid: any; }) => {
              // console.log(element.created_at);
              let today:any = new Date().toISOString().slice(0, 10);
              // let future:any = this.datePipe.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd')
              let future:any = this.datePipe.transform(new Date().setDate(new Date().getDate() + parseInt(this.filterForm.get('days')?.value)), 'yyyy-MM-dd')
            //   if(element.flight_date.startsWith(today) && element.redeemed == 0 && element.is_valid == 1 ) {
            //     this.todays_expected_guests++;
            // }  
              if(element.flight_date >= today && element.flight_date <= future && element.redeemed == 0 && element.is_valid == 1 ) {
                  this.todays_expected_guests++;
              }else if(element.redemption_time != null){
                // if(element.redemption_time.startsWith(today) && element.redeemed == 1 && element.is_valid == 1){
                //   this.todays_redeemed_guests++;
                // }
                if(element.redemption_time >= today && element.redemption_time <= future && element.redeemed == 1 && element.is_valid == 1){
                  this.todays_redeemed_guests++;
                }
              }else{
                // if(element.created_at.startsWith(today) && element.redeemed == 1 && element.is_valid == 1){
                //   this.todays_redeemed_guests++;
                // }
                if(element.created_at >= today && element.created_at <= future && element.redeemed == 1 && element.is_valid == 1){
                  this.todays_redeemed_guests++;
                }
              }
            });

            
          });
        
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
