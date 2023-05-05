import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';
import { AddNewUserComponent } from '../activities/modals/add-new-user/add-new-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  company_id : any = 0;
  users : any = [];

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

    this.dataStore.users.subscribe((data)=>{
      this.users = data;
      console.log("Subscription : " , this.users);
      if(this.users.length != 0){
        console.log("Rerendering..");
        this.rerender();
      }else{
        console.log("Empty..");
      }
    });

    // this.company_id = this.route.snapshot.paramMap.get('company_id') ;
    this.ngxService.start();
    this.api.getAllPortalUsers()
      .subscribe((data: any) => {
        console.log(data);
        // this.dataStore.setRestaurants(data);
        this.dataStore.setUsers(data);
        this.ngxService.stop();
        return;
      });
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
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  addNewUser(){
    this.modalService.openDialog(this.viewRef, {
      title: 'Add New User',
      childComponent: AddNewUserComponent
    });
  }

  deleteUser(user_id:number , name:string){

    var result = confirm("Are you sure you want to delete "+ name +" as a user?");
    if (!result) {
        return
    }

    this.ngxService.start();
    this.api.deleteUser(user_id).subscribe((data)=>{
      this.api.getAllPortalUsers()
            .subscribe((data: any) => {
              this.dataStore.setUsers(data);
              this.ngxService.stop();
              this.notifier.notify('warning', ' User Deleted Successfully!');
              return true;
            });
    });
  }

  toggleAdminUser(user_id: any){
    this.ngxService.start();
    this.api.togglePortalAdminUser(user_id).subscribe((data)=>{
      this.api.getUsers(this.dataStore.dashboardInfo.getValue().company.id)
            .subscribe((data: any) => {
              this.dataStore.setUsers(data);
              this.ngxService.stop();
              this.notifier.notify('success', ' Admin Status Changed Successfully!');
              return true;
            });
      
    });
  } 
  

}
