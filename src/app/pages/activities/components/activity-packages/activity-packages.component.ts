import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';
import { AddNewPackageComponent } from '../../modals/add-new-package/add-new-package.component';

@Component({
  selector: 'app-activity-packages',
  templateUrl: './activity-packages.component.html',
  styleUrls: ['./activity-packages.component.css']
})
export class ActivityPackagesComponent implements OnInit {

  company_id : any = 0;
  packages : any = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @Input() activity!: any;; 

  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
  dtInstance!: DataTables.Api;

  spinner = SPINNER.pulse;


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

    this.dataStore.chosen_activity_packages.subscribe((data)=>{
      this.ngxService.startLoader('packages-table-loader');
      this.packages = data;
      console.log("Subscription : " , this.packages);
      if(this.packages.length != 0){
        console.log("Rerendering..");
        this.rerender();
      }else{
        console.log("Empty..");
      }
      this.ngxService.stopLoader('packages-table-loader');
    });

    this.company_id = this.route.snapshot.paramMap.get('company_id') ;
    
    this.api.getActivityPackages(this.activity.id )
      .subscribe((data: any) => {
        console.log(data);
        this.packages = data;
        this.dataStore.setChosenActivityPackages(data);
        this.dtTrigger.next();
        
        return;
      });
    // alert(this.company_id);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  deletePackage(package_id:number , activity_id:number ){
    this.ngxService.start();

    this.api.deletePackage(package_id , activity_id)
    .subscribe((data)=>{
      this.api.getActivityPackages(activity_id )
        .subscribe((data: any) => {
          console.log(data);
          // this.dataStore.setRestaurants(data);
          this.packages = data;
          this.dataStore.setChosenActivityPackages(data);
          this.dtTrigger.next();
          this.notifier.notify('warning', 'Package Deleted Successfully!');
          this.ngxService.stop();
          return;
        });
    });

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

  addNewPackage(){
    this.modalService.openDialog(this.viewRef, {
      title: 'Add New Package',
      childComponent: AddNewPackageComponent
    });
  }

}
