import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';
import { AddNewEnhancementComponent } from '../../modals/add-new-enhancement/add-new-enhancement.component';
import { AddNewInclusionComponent } from '../../modals/add-new-inclusion/add-new-inclusion.component';

@Component({
  selector: 'app-activity-inclusions',
  templateUrl: './activity-inclusions.component.html',
  styleUrls: ['./activity-inclusions.component.css']
})
export class ActivityInclusionsComponent implements OnInit {

  inclusions:any = []
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
      this.inclusions = data.inclusions;
    });
  }

  
  updateInclusion(inclusion: any){
    this.ngxService.start();
    this.api.updateActivityInclusion(inclusion)
    .subscribe((data)=>{
      var activity = this.dataStore.chosen_activity.getValue();
      this.api.getActivity(activity.id).subscribe((data1)=>{
        this.dataStore.setChosenActivity(data1);
        this.ngxService.stop();
      });
    });
  }

  deleteInclusion(inclusion: any){
    this.ngxService.start();
    this.api.deleteActivityInclusion(inclusion)
    .subscribe((data)=>{
      var activity = this.dataStore.chosen_activity.getValue();
      this.api.getActivity(activity.id).subscribe((data1)=>{
        this.dataStore.setChosenActivity(data1);
        this.ngxService.stop();
      });
    });
  }

  addNewInclusion(){
    this.modalService.openDialog(this.viewRef, {
      title: 'Add New Inclusion',
      childComponent: AddNewInclusionComponent
    });
  }

}
