import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';
import { AddNewAgentUserComponent } from '../../modals/add-new-agent-user/add-new-agent-user.component';
import { AddNewAirlineComponent } from '../../modals/add-new-airline/add-new-airline.component';
import { EditAgentDetailsComponent } from '../../modals/edit-agent-details/edit-agent-details.component';
import { EditAirlineDetailsComponent } from '../../modals/edit-airline-details/edit-airline-details.component';

@Component({
  selector: 'app-airlines-list',
  templateUrl: './airlines-list.component.html',
  styleUrls: ['./airlines-list.component.css']
})
export class AirlinesListComponent implements OnInit {

  company_id : any = 0;
  airlines : any = [];

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

    this.dataStore.airlines.subscribe((data)=>{
      this.airlines = data;
      console.log("Subscription : " , this.airlines);
      if(this.airlines.length != 0){
        console.log("Rerendering..");
        this.rerender();
      }else{
        console.log("Empty..");
      }
    });

    this.ngxService.start();
    this.api.getAirlines()
      .subscribe((data: any) => {
        console.log(data);
        // this.dataStore.setRestaurants(data);
        this.airlines = data;
        this.dataStore.setAirlines(data);
        this.dtTrigger.next();
        this.ngxService.stop();
        return;
      });
    // alert(this.company_id);
  }
  addNewAirline(){
    this.modalService.openDialog(this.viewRef, {
      title: 'Add New Agent',
      childComponent: AddNewAirlineComponent,
      closeDialogSubject: new Subject(),
      settings:{
        modalDialogClass : 'modal-lg modal-dialog modal-dialog-centered ' 
      }
    });
  }

  editAirline(agent_data : any){
    this.dataStore.setSelectedAirlineData(agent_data);
    this.modalService.openDialog(this.viewRef, {
      title: 'Edit Agent',
      childComponent: EditAirlineDetailsComponent,
      closeDialogSubject: new Subject(),
      settings:{
        modalDialogClass : 'modal-lg modal-dialog modal-dialog-centered ' 
      }
    });
  }


  deleteAirline(airline:any , name:string){

    var result = confirm("Are you sure you want to delete "+ name +" as an airline?");
    if (!result) {
        return
    }

    this.ngxService.start();

    this.api.deleteAirline(airline)
    .subscribe((data)=>{
      this.api.getAirlines()
        .subscribe((data: any) => {
          console.log(data);
          // this.dataStore.setRestaurants(data);
          this.airlines = data;
          this.dataStore.setAirlines(data);
          this.dtTrigger.next();
          this.notifier.notify('warning', 'Airline Deleted Successfully!');
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
