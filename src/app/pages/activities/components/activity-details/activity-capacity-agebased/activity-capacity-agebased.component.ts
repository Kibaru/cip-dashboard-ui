import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-activity-capacity-agebased',
  templateUrl: './activity-capacity-agebased.component.html',
  styleUrls: ['./activity-capacity-agebased.component.css']
})
export class ActivityCapacityAgebasedComponent implements OnInit {


  activity!: any;
  private readonly notifier: NotifierService;


  constructor(
    private dataStore: DataStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef,
    notifierService: NotifierService,

    ) {
      this.notifier = notifierService;
  
     }

  ngOnInit(): void {
    this.dataStore.chosen_activity.subscribe((data)=>{
      this.activity = data;
    });
  }

  updateActivityCapacity(){
    console.log(this.activity);

    this.ngxService.start();
    this.api.updateActivityCapacity(this.activity.id , this.activity)
            .subscribe((data:any)=>{
              var activity = this.dataStore.chosen_activity.getValue();

              this.notifier.notify('success',data.message);

              this.api.getActivity(activity.id).subscribe((data1)=>{
                this.dataStore.setChosenActivity(data1);
                this.ngxService.stop();
              });
            });
  }

}
