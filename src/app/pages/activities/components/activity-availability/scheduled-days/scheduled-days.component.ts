import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trim } from 'jquery';
import { ImagePickerConf } from 'ngp-image-picker';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-scheduled-days',
  templateUrl: './scheduled-days.component.html',
  styleUrls: ['./scheduled-days.component.css']
})
export class ScheduledDaysComponent implements OnInit {

  activity_scheduled_days!: any[];
  activity_scheduled_days_id!: number;


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

    this.dataStore.chosen_activity_availabilities.subscribe((data) => {

      console.log(data);
      var days_array: any[] = [];
      data.forEach((element: {
        id: number;
        scheduled_days: any; 
        availability_type: number;
      }) => {
        if (element.availability_type == 1) {
          // console.log("Type 1: ", element.scheduled_days);
          days_array = element.scheduled_days.split(",");
          this.activity_scheduled_days_id = element.id;
        }
      });

      days_array.forEach((value , index )=>{
        days_array[index]= value.trim();
      });
      this.activity_scheduled_days = days_array;
      console.log(this.activity_scheduled_days);


    });


  }

  scheduledDaysChanged( e: any, day : string){
    console.log(this.activity_scheduled_days_id +" - "+e.target.checked, day); // {}, true || false

    this.ngxService.start();

    this.api.setActivityAvailability(this.activity_scheduled_days_id , day , e.target.checked)
        .subscribe((data)=>{
          console.log(data);
          this.ngxService.stop();

        });

  }

}
