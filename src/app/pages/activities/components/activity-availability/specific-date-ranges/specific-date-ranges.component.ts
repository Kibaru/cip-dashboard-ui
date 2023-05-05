import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';
import { AddNewAvailabilityRangeComponent } from '../../../modals/add-new-availability-range/add-new-availability-range.component';

@Component({
  selector: 'app-specific-date-ranges',
  templateUrl: './specific-date-ranges.component.html',
  styleUrls: ['./specific-date-ranges.component.css']
})
export class SpecificDateRangesComponent implements OnInit {


  activity_availability_ranges: any[] = [];



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

      this.activity_availability_ranges = [];
      console.log(data);
      var days_array: any[] = [];
      data.forEach((element: {
        id: number;
        scheduled_days: any; 
        availability_type: number;
      }) => {
        if (element.availability_type == 2) {
          // console.log("Type 1: ", element.scheduled_days);
          this.activity_availability_ranges.push(element);
        }
      });
      console.log(this.activity_availability_ranges);


    });

  }

  addAvailabilityRange(){
    this.modalService.openDialog(this.viewRef, {
      title: 'Add New Availability Date',
      childComponent: AddNewAvailabilityRangeComponent
    });
  }
  deleteAvailability(availability_id : number){
    var activity = this.dataStore.chosen_activity.getValue();

    this.ngxService.start();
    this.api.deleteAvailability(availability_id).subscribe((data)=>{
      this.api.getActivity(activity.id).subscribe((data1:any)=>{
        this.dataStore.setChosenActivityAvailabilities(data1.availabilities);
        this.dataStore.setChosenActivity(data1);
        this.ngxService.stop();
      });
    });
  }

}
