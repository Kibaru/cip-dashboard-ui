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
import { AddNewAgentComponent } from '../../modals/add-new-agent/add-new-agent.component';
import { EditAgentDetailsComponent } from '../../modals/edit-agent-details/edit-agent-details.component';

@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.css']
})
export class AgentsListComponent implements OnInit {

  company_id : any = 0;
  agents : any = [];

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

    this.dataStore.agents.subscribe((data)=>{
      this.agents = data;
      console.log("Subscription : " , this.agents);
      if(this.agents.length != 0){
        console.log("Rerendering..");
        this.rerender();
      }else{
        console.log("Empty..");
      }
    });

    this.ngxService.start();
    this.api.getAgents()
      .subscribe((data: any) => {
        console.log(data);
        // this.dataStore.setRestaurants(data);
        this.agents = data;
        this.dataStore.setAgents(data);
        this.dtTrigger.next();
        this.ngxService.stop();
        return;
      });
    // alert(this.company_id);
  }
  addNewAgent(){
    this.modalService.openDialog(this.viewRef, {
      title: 'Add New Agent',
      childComponent: AddNewAgentComponent,
      closeDialogSubject: new Subject(),
      settings:{
        modalDialogClass : 'modal-lg modal-dialog modal-dialog-centered ' 
      }
    });
  }

  editAgent(agent_data : any){
    this.dataStore.setSelectedAgentData(agent_data);
    this.modalService.openDialog(this.viewRef, {
      title: 'Edit Agent',
      childComponent: EditAgentDetailsComponent,
      closeDialogSubject: new Subject(),
      settings:{
        modalDialogClass : 'modal-lg modal-dialog modal-dialog-centered ' 
      }
    });
  }

  addAgentUser(agent_data : any){
    this.dataStore.setSelectedAgentData(agent_data);
    this.modalService.openDialog(this.viewRef, {
      title: 'Add New Agent User',
      childComponent: AddNewAgentUserComponent,
      closeDialogSubject: new Subject(),
      settings:{
        modalDialogClass : 'modal-lg modal-dialog modal-dialog-centered ' 
      }
    });
  }

  deleteAgent(agent_id:number , name:string){

    var result = confirm("Are you sure you want to delete "+ name +" as an agent?");
    if (!result) {
        return
    }

    this.ngxService.start();

    this.api.deleteAgent(agent_id)
    .subscribe((data)=>{
      this.api.getAgents()
      .subscribe((data: any) => {
        console.log(data);
        // this.dataStore.setRestaurants(data);
        this.agents = data;
        this.dataStore.setAgents(data);
        this.dtTrigger.next();
        this.ngxService.stop();
        this.notifier.notify('warning', 'Agent Deleted Successfully!');

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
