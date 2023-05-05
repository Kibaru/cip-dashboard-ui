import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDialogService } from 'ngx-modal-dialog';

import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  spinner = SPINNER.cubeGrid;

  is_admin_view : boolean = false;
  is_agent_view : boolean = false;
  is_agent_admin_view: boolean = false;
  is_portal_view: boolean = false;

  dashboardInfo: any;

  

  constructor(
    private dataStore: DataStoreService,
    private router: Router , 
    private api: ApiService, 
    private modalService: ModalDialogService, 
    private ngxService: NgxUiLoaderService,
    private viewRef: ViewContainerRef
  ) { }

  async ngOnInit(): Promise<void> {

    // this.dataStore.userInfo
    //   .subscribe((data)=>{
    //     if(data.is_travel_agent == 0){
    //       this.is_admin_view = true;
    //       this.router.navigateByUrl('/home');
    //     }else if(data.is_travel_agent == 1){
    //       this.is_agent_view = true;
    //       this.router.navigateByUrl('/home/(home_view:agent)');
    //     }
    //   });


    if ((sessionStorage.getItem('token')!=null) && sessionStorage.getItem('token')!=undefined) {

      this.ngxService.start();

      try { 

       await this.fetchDashboardInfo()
       console.log("User Info :" , this.dataStore.userInfo.getValue());
       if(this.dataStore.userInfo.getValue().is_travel_agent == 0){
        this.is_portal_view = true;
        if(this.dataStore.userInfo.getValue().is_admin == 1){
          this.is_admin_view = true;
          this.router.navigateByUrl('/home/(home_view:admin)');
        }
        this.router.navigateByUrl('/home/(home_view:admin)');
      }else if(this.dataStore.userInfo.getValue().is_travel_agent == 1){ 
        this.is_agent_view = true;
        if(this.dataStore.dashboardInfo.getValue().agent_user_is_admin == 1){
          this.is_agent_admin_view = true;
        }
        this.router.navigateByUrl('/home/(home_view:agent)');
      }

      } catch (error) {           
          console.error(error);       
      } 

      this.ngxService.stop();
    }else{
      this.router.navigateByUrl('/login');
    };
    

    
  
    
  }


  async fetchDashboardInfo() {

    var fetched_dashboard_info:any = await this.api.getDashboardInfo().toPromise();
    console.log(" Setting Dashboard Info" );
    this.dataStore.setDashboardInfo(fetched_dashboard_info);
    this.dashboardInfo = fetched_dashboard_info;

    var fetched_user_info:any  = await this.api.getUserInfo().toPromise();
    console.log("Fetched User Info ",fetched_user_info);
    this.dataStore.setUserInfo(fetched_user_info);

    if(fetched_user_info.is_travel_agent == 1){
      var fetched_user_agent_data = await this.api.getUserAgentData(fetched_user_info.id).toPromise();
      this.dataStore.setUserAgentData(fetched_user_agent_data);
    }

  }
  openNewDialog() {
    // this.modalService.openDialog(this.viewRef, {
    //   title: 'Some modal title',
    //   childComponent: MerchantChooserComponent
    // });
  }

}
