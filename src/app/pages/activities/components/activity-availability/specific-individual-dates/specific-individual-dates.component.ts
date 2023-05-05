import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';
import { AddNewAvailabilityDateComponent } from '../../../modals/add-new-availability-date/add-new-availability-date.component';

@Component({
  selector: 'app-specific-individual-dates',
  templateUrl: './specific-individual-dates.component.html',
  styleUrls: ['./specific-individual-dates.component.css']
})
export class SpecificIndividualDatesComponent implements OnInit {

  activity_availability_dates: any[] = [];



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
      // var days_array: any[] = [];
      // data.forEach((element: {
      //   individual_dates: any;
      //   id: number;
      //   scheduled_days: any; 
      //   availability_type: number;
      // }) => {
      //   if (element.availability_type == 3) {
      //     console.log("Type 1: ", element.scheduled_days);
      //     days_array = element.individual_dates.split(",");
      //   }
      // });

      // days_array.forEach((value , index )=>{
      //   days_array[index]= value.trim();
      // });
      this.activity_availability_dates = data.filter((element:any)=>{
        return (element.availability_type == 3)
      });
      console.log(this.activity_availability_dates);
    });

  }

  deleteAvailability(availability_id : number){
    var activity = this.dataStore.chosen_activity.getValue();

    this.ngxService.start();
    this.api.deleteAvailability(availability_id).subscribe((data)=>{
      this.api.getActivity(activity.id).subscribe((data1 : any)=>{
        this.dataStore.setChosenActivityAvailabilities(data1.availabilities);
        this.dataStore.setChosenActivity(data1);
        this.ngxService.stop();
      });
    });
  }

  addAvailabilityDate(){
    this.modalService.openDialog(this.viewRef, {
      title: 'Add New Availability Date',
      childComponent: AddNewAvailabilityDateComponent
    });
  }

}
