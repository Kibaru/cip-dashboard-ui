import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject, Subscription } from 'rxjs';
import { ConfirmInvalidateVoucherComponent } from 'src/app/pages/activities/modals/confirm-invalidate-voucher/confirm-invalidate-voucher.component';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-vouchers-table',
  templateUrl: './vouchers-table.component.html',
  styleUrls: ['./vouchers-table.component.css']
})
export class VouchersTableComponent implements OnInit {

  company_id : any = 0;
  entries : any = [];
  entries_store : any = [];
  airlines : any = [];
  airline : any = 0;
  services : any = [];
  service : any = '';
  status : any = '0';
  start_date : any = '';
  end_date  : any = '';

  entriesSubscription!: Subscription;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
  dtInstance!: DataTables.Api;

  private readonly notifier: NotifierService;

  constructor(
    notifierService: NotifierService,
    private dataStore: DataStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef
  ) { 
    this.notifier = notifierService;

  }

  ngAfterViewInit(){
    this.dtTrigger.next();
  }

  ngOnInit(): void {
    this.getServices();

    this.dataStore.airlines.subscribe((data)=>{
      this.airlines = data;
    });

    // alert("init")
    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      paging: true,
      order: [[0, 'desc']],
      responsive : true,
      dom: 'Bfrtip',
    };

    this.entriesSubscription = this.dataStore.entries.subscribe((data)=>{
      this.entries = data;
      // console.log("Subscription : " , this.entries);
      if(this.entries.length != 0){
        // console.log("Rerendering..");
        this.rerender();
      }else{
        // console.log("Empty..");
      }
    });

    // this.company_id = this.dataStore.dashboardInfo.getValue().company.id ;
    // console.log("Company ID", JSON.stringify(this.dataStore.dashboardInfo.getValue() ));

    this.dataStore.dashboardInfo.subscribe((data)=>{

      this.ngxService.start();
      // console.log("Subdcription for Getting Entries.." , data);

      if(data.agent != null){
        this.fetchEntriesData(data.agent.id ); 
      }
      this.dtTrigger.next();
      this.ngxService.stop();
      

    });

    // this.ngxService.start();
    // console.log("Getting Entries..", this.dataStore.dashboardInfo.getValue() );
    // this.api.getEntries(this.company_id )
    //   .subscribe((data: any) => {
    //     console.log("Entries received :",data);
    //     // this.dataStore.setRestaurants(data);
    //     this.entries = data;
    //     this.dataStore.setEntries(data);
    //     this.dtTrigger.next();
    //     this.ngxService.stop();
    //     return;
    //   });
    // alert(this.company_id);
  }

  async fetchEntriesData(agent_id:any) {
    
    var entry_data = await this.api.getAgentEntries(agent_id).toPromise() 

    // this.entries = entry_data;
    this.entries_store = JSON.stringify(entry_data);
    this.dataStore.setEntries(entry_data);

  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    // this.entriesSubscription.unsubscribe();
    this.dtTrigger.unsubscribe();
    this.entriesSubscription.unsubscribe()
  }

  rerender(): void {
    try {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    } catch (err) {
      console.log(err);
    }
  }

  refresh(){
    this.ngxService.start();

    this.api.getDashboardInfo()
    .subscribe((data :any)=>{
      // this.dataStore.setDashboardInfo(data);
      console.log("Getting Dashboard Info For Entries",data);
      this.dataStore.setDashboardInfo(data);
      this.ngxService.stop();

    });
}

invalidateVoucher(voucher: any){
  this.dataStore.setChosenInvalidationVoucher(voucher);
  this.modalService.openDialog(this.viewRef, {
    title: 'Invalidate Voucher',
    childComponent: ConfirmInvalidateVoucherComponent,
    closeDialogSubject: new Subject(),
    settings:{
      modalDialogClass : 'modal-lg modal-dialog modal-dialog-centered ' 
    }
  });
}

async getServices(){
  this.services = await this.api.getCIPLoungePackages().toPromise();
}

getEntries(): void {
  // Do not forget to unsubscribe the event
  // this.dtTrigger.unsubscribe();

  // console.log(this.report_month);
  var entries = JSON.parse(this.entries_store);
  if(this.airline != 0){
    entries = entries.filter((item :any) =>
    {
      if(item.airline != null){
        return item.airline.iata_code == this.airline;
      }else{
        return false;
      };
      
    });
  }

  if(this.service != ''){
    entries = entries.filter((item :any) =>
    {
      return item.service == this.service;
    });
  }

  if((this.start_date.trim() != "") && (this.end_date.trim() != "")){
    entries = entries.filter((item :any) =>
    {
      // console.log(item.created_at.slice(0, 7).trim());
      const dateToCheck = new Date( item.created_at.slice(0, 10));
      const startDate = new Date(this.start_date);
      const endDate = new Date(this.end_date);
      return startDate <= dateToCheck && dateToCheck <= endDate;
      // return item.created_at.slice(0, 10).trim() == this.report_month;
    });
  }

  if(this.status.trim() != "0"){
    entries = entries.filter((item :any) =>
    {
      if(this.status == "Redeemed"){
        return item.redeemed == 1;
      }
      if(this.status == "Expected"){
        return item.redeemed == 0;
      }
      if(this.status == "Invalid"){
        return item.is_valid == 0;
      }else{
        return false;
      }
      
      // console.log(item.created_at.slice(0, 7).trim());
      
    });
  }

  console.log(entries);
  this.dataStore.setEntries(entries);
}
}

