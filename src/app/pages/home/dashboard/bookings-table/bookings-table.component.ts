import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';


@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css']
})
export class BookingsTableComponent implements AfterViewInit, OnDestroy, OnInit {


  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  
  private readonly notifier: NotifierService;
  bookings : any = [];
  bookingsCompleted : any = [];
  dtOptions1: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtInstance!: Promise<DataTables.Api>;
  


  spinner = SPINNER.pulse;



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
    // this.ngxService.startLoader('bookings-table-loader');;
    this.dtOptions1 = {
      pagingType: 'full_numbers',
      paging: true,
      order: [[0, 'desc']],
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
    };
    this.dtOptions2 = {
      pagingType: 'full_numbers',
      paging: true,
      order: [[0, 'desc']],
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
    };
    // this.ngxService.stop();

    this.dataStore.dashboardInfo
    .subscribe((data : any)=>{
      

        if(data.bookings != undefined){
          this.ngxService.startLoader('bookings-table-loader');
          this.bookings = data.bookings ;
          // console.log(data.bookings);
          this.bookingsCompleted = JSON.parse(JSON.stringify(data.bookings)).filter(function(item: { status: string; })
          {
              return item.status = "Completed";
          });

          // console.log( JSON.stringify(this.bookings));
          for (let index = 0; index < this.bookings.length; index++) {
            if(this.bookings[index].cart.cart_items != undefined){
              if (typeof this.bookings[index].cart.cart_items === 'string') {
              this.bookings[index].cart.cart_items = JSON.parse(this.bookings[index].cart.cart_items);
            }
            }else{
              this.bookings[index].cart.cart_items = [];
            }
          }

          for (let index = 0; index < this.bookingsCompleted.length; index++) {
            if(this.bookingsCompleted[index].cart.cart_items != undefined){
              if (typeof this.bookingsCompleted[index].cart.cart_items === 'string') {
              this.bookingsCompleted[index].cart.cart_items = JSON.parse(this.bookingsCompleted[index].cart.cart_items);
            }
            }else{
              this.bookingsCompleted[index].cart.cart_items = [];
            }
          }


          console.log("Bookings Available");
          this.dtTrigger.next();
          this.ngxService.stopLoader('bookings-table-loader');
        

        }else{
          this.dtTrigger.next();
          this.bookings = [];
        }
      
    });

  }

  rerender(): void {

    // If the data instance is not instantiated.. Instantiate it.
    if(this.dtElement.dtInstance == undefined){
      this.dtTrigger.next();
      this.dtOptions1 = {
        pagingType: 'full_numbers',
        paging: true,
        order: [[0, 'desc']],
        // Declare the use of the extension in the dom parameter
        dom: 'Bfrtip',
        // Configure the buttons
      };
      this.dtOptions2 = {
        pagingType: 'full_numbers',
        paging: true,
        order: [[0, 'desc']],
        // Declare the use of the extension in the dom parameter
        dom: 'Bfrtip',
        // Configure the buttons
      };
    }

    //Then rerender.
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.rerender();
    }, 2000);
    // 
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
