import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-bookings-report',
  templateUrl: './bookings-report.component.html',
  styleUrls: ['./bookings-report.component.css']
})
export class BookingsReportComponent implements OnInit {

  company_id : any = 0;
  entries : any = [];
  entries_store : any = [];
  services: any = [];


  airlines : any = [];
  agents : any = [];

  agent : any = 0;


  booking_type : any = 0;
  airline : any = 0;

  report_month : any = '';
  service : any = '';
  status : any = '0';

  start_date : any = '';
  end_date  : any = '';

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
    // alert("init")
    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      paging: true,
      order: [[0, 'desc']],
      responsive : true,
      dom: 'Bfrtip',
      columns: [
        { visible: false },
        { visible: true , width : '100px'},
        { visible: true },
        { visible: true },
        { visible: true },
        { visible: true },
        { visible: true },
        { visible: true },
        { visible: false },
        { visible: true },
        { visible: false },
        { visible: false },
        { visible: true },
        { visible: true },
        { visible: true },
      ]
    };

    // this.datatableElement.dtOptions..column( 0 ).visible() == false;
    this.dataStore.airlines.subscribe((data)=>{
      this.airlines = data;
    });
    this.dataStore.agents.subscribe((data)=>{
      this.agents = data;
    });

    this.dataStore.entries.subscribe((data)=>{
      this.entries = data;
      this.rerender();
      // console.log("Subscription : " , this.entries);
      // if(this.entries.length != 0){
      //   // console.log("Rerendering..");
      //   this.rerender();
      // }else{
      //   // console.log("Empty..");
      // }
    });

    // this.company_id = this.dataStore.dashboardInfo.getValue().company.id ;
    // console.log("Company ID", JSON.stringify(this.dataStore.dashboardInfo.getValue() ));

    this.dataStore.dashboardInfo.subscribe((data)=>{

      this.ngxService.start();
      // console.log("Subdcription for Getting Entries.." , data);
      if(data.company != null){
        this.api.getEntries(data.company.id )
        .subscribe((data: any) => {
          // console.log(data);
          // this.dataStore.setRestaurants(data);
          this.entries = data;
          this.entries_store = JSON.stringify(data);
          this.dataStore.setEntries(data);

          this.api.getAirlines().subscribe((airlines)=>{
            this.dataStore.setAirlines(airlines);
           

            this.api.getAgents().subscribe((agents)=>{

              this.dataStore.setAgents(agents);
              this.dtTrigger.next();
              this.ngxService.stop();

              return;
            });

          });
                  
        });
      }
      

    });


  }



  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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

    if(this.booking_type != 0){
      entries = entries.filter((item :any) =>
      {
        return item.booking_type == this.booking_type;
      });
    }

    if(this.agent != 0){
      entries = entries.filter((item :any) =>
      {
        return item.agent_id == this.agent;
      });
    }

    if(this.service != ''){
      entries = entries.filter((item :any) =>
      {
        return item.service == this.service;
      });
    }

    if(this.report_month.trim() != ""){
      entries = entries.filter((item :any) =>
      {
        // console.log(item.created_at.slice(0, 7).trim());
        return item.created_at.slice(0, 7).trim() == this.report_month;
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
    // this.rerender();
    // this.dtTrigger.next();




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

async getServices() {
    this.services = await this.api.getCIPLoungePackages().toPromise();
  }
}
