import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';
import { AddNewEnhancementComponent } from '../../modals/add-new-enhancement/add-new-enhancement.component';

@Component({
  selector: 'app-activity-enhancements',
  templateUrl: './activity-enhancements.component.html',
  styleUrls: ['./activity-enhancements.component.css']
})
export class ActivityEnhancementsComponent implements OnInit {

  enhancements:any = []
  constructor(
    private dataStore: DataStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.dataStore.chosen_activity.subscribe((data)=>{
      this.enhancements = data.enhancements;
    });
  }

  
  updateEnhancement(enhancement: any){
    this.ngxService.start();
    this.api.updateActivityEnhancement(enhancement)
    .subscribe((data)=>{
      var activity = this.dataStore.chosen_activity.getValue();
      this.api.getActivity(activity.id).subscribe((data1)=>{
        this.dataStore.setChosenActivity(data1);
        this.ngxService.stop();
      });
    });
  }

  deleteEnhancement(enhancement: any){
    this.ngxService.start();
    this.api.deleteActivityEnhancement(enhancement)
    .subscribe((data)=>{
      var activity = this.dataStore.chosen_activity.getValue();
      this.api.getActivity(activity.id).subscribe((data1)=>{
        this.dataStore.setChosenActivity(data1);
        this.ngxService.stop();
      });
    });
  }

  addNewEnhancement(){
    this.modalService.openDialog(this.viewRef, {
      title: 'Add New Enhancement',
      childComponent: AddNewEnhancementComponent
    });
  }

}
