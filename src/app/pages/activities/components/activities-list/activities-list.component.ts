import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css']
})
export class ActivitiesListComponent implements OnInit {

  company_id : any = 0;
  activities : any = [];

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

    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      paging: true,
      order: [[0, 'desc']],
    };

    this.dataStore.activities.subscribe((data)=>{
      this.activities = data;
      console.log("Subscription : " , this.activities);
      if(this.activities.length != 0){
        console.log("Rerendering..");
        this.rerender();
      }else{
        console.log("Empty..");
      }
    });

    this.company_id = this.route.snapshot.paramMap.get('company_id') ;
    this.ngxService.start();
    this.api.getActivities(this.company_id )
      .subscribe((data: any) => {
        console.log(data);
        // this.dataStore.setRestaurants(data);
        this.activities = data;
        this.dataStore.setActivities(data);
        this.dtTrigger.next();
        this.ngxService.stop();
        return;
      });
    // alert(this.company_id);
  }

  editActivity(activity_id : number){
    this.router.navigate(['/activity', activity_id]);
  }

  deleteActivity(activity_id:number){
    this.ngxService.start();

    this.api.deleteActivity(activity_id)
    .subscribe((data)=>{
      this.api.getActivities(this.company_id )
        .subscribe((data: any) => {
          console.log(data);
          // this.dataStore.setRestaurants(data);
          this.activities = data;
          this.dataStore.setActivities(data);
          this.dtTrigger.next();
          this.notifier.notify('warning', 'Product Deleted Successfully!');
          this.ngxService.stop();
          return;
        });
    });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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

}
