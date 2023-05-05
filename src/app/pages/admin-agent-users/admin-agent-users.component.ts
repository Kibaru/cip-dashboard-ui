import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';
import { AddNewAgentUserComponent } from '../activities/modals/add-new-agent-user/add-new-agent-user.component';
import { ChangePasswordComponent } from '../activities/modals/change-password/change-password.component';

@Component({
  selector: 'app-admin-agent-users',
  templateUrl: './admin-agent-users.component.html',
  styleUrls: ['./admin-agent-users.component.css']
})
export class AdminAgentUsersComponent implements OnInit {

  company_id : any = 0;
  users : any = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  agentUsersSubscription!: Subscription;


  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
  dtInstance!: DataTables.Api;



  private readonly notifier: NotifierService;
  constructor(
    notifierService: NotifierService,
    private dataStore: DataStoreService,
    private router: Router,
    private api: ApiService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef,
    private ngxService: NgxUiLoaderService) {

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

    this.agentUsersSubscription = this.dataStore.all_agent_users.subscribe((data)=>{
      this.users = data;
      this.rerender();
    });

    // this.company_id = this.route.snapshot.paramMap.get('company_id') ;
    this.ngxService.start();
    this.refreshAllAgentUsers();
    this.ngxService.stop();
    // alert(this.company_id);
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

  editActivity(activity_id : number){
    this.router.navigate(['/activity', activity_id]);
  }

  ngOnDestroy(): void {
    this.agentUsersSubscription.unsubscribe();
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  addAgentUser(){
    const agent_data =  this.dataStore.dashboardInfo.getValue().agent;
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

  changeUserPassword(){
    this.modalService.openDialog(this.viewRef, {
      title: 'Change Password',
      childComponent: ChangePasswordComponent,
      closeDialogSubject: new Subject(),
      settings:{
        modalDialogClass : 'modal-lg modal-dialog modal-dialog-centered ' 
      }
    });
  }

  deleteAgentUser(user_id:number , name:string){

    var result = confirm("Are you sure you want to delete "+ name +" as a user?");
    if (!result) {
        return
    }

    this.ngxService.start();
    this.api.deleteAgentUser(user_id).subscribe((data)=>{
      this.api.getAllAgentUsers()
            .subscribe((data: any) => {
              this.dataStore.setAllAgentUsers(data);
              this.ngxService.stop();
              this.notifier.notify('warning', ' User Deleted Successfully!');
              return true;
            });
    });
  }

  toggleAdminUser(user_id: any){
    this.ngxService.start();
    this.api.toggleAdminUser(user_id).subscribe((data)=>{
      this.refreshAllAgentUsers();
      this.ngxService.stop();
      this.notifier.notify('warning', ' Admin Status Changed Successfully!');
    });
  } 

  async refreshAllAgentUsers(){

      const adata = await this.api.getAllAgentUsers().toPromise();
      this.dataStore.setAllAgentUsers(adata);
   

  }
  

}
