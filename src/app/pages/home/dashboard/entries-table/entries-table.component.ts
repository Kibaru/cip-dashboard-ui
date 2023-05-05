import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-entries-table',
  templateUrl: './entries-table.component.html',
  styleUrls: ['./entries-table.component.css']
})
export class EntriesTableComponent implements OnInit {

  company_id : any = 0;
  entries : any = [];
  entriesSubscription!: Subscription;
  dashboardInfoSubscription!: Subscription;


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

    console.log("Calling ON INIT");
    
    // alert("init")
    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      paging: true,
      order: [[0, 'desc']],
      responsive : true,
      dom: 'Bfrtip',
    };

    // console.log("Subscribing  Entries Datastore");
    this.entriesSubscription = this.dataStore.entries.subscribe((data)=>{
      this.entries = data;
      // console.log(" Entries Datastore Updated");
      if(this.entries.length != 0){
        // console.log("Rerendering..");
        this.rerender();
      }else{
        // console.log("Empty..");
      }
    });


    // console.log("Subscribing  Dashboard Info Datastore");
    this.dashboardInfoSubscription = this.dataStore.dashboardInfo.subscribe((data)=>{
      console.log(" Dashboard Datastore Updated");
      this.ngxService.start();
      // console.log("Subdcription for Getting Entries.." , data);
      if(data.company != null){

        this.fetchEntryData(data.company.id );

      }
      // this.dtTrigger.next();
      this.ngxService.stop();

    });

  }

  async fetchEntryData(company_id :any){
    var fetched_entry_data =  await this.api.getEntries(company_id ).toPromise();
    // this.entries = fetched_entry_data;
    // console.log("Updating Entries Datastore");
    this.dataStore.setEntries(fetched_entry_data);

  }



  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.entriesSubscription.unsubscribe();
    this.dashboardInfoSubscription.unsubscribe();
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

  async refresh(){
    this.ngxService.start();

    const fetched_dashboard_info = await this.api.getDashboardInfo().toPromise();
    this.dataStore.setDashboardInfo(fetched_dashboard_info);
    // this.rerender();
    this.ngxService.stop();
  
  }
}
