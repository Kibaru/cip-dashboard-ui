import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-activity-session-pricings',
  templateUrl: './activity-session-pricings.component.html',
  styleUrls: ['./activity-session-pricings.component.css']
})
export class ActivitySessionPricingsComponent implements OnInit {

  activity!: any;
  standard_pricing_keys! :any;
  standard_pricing! : any;
  seasonal_pricings_ranges: any[] = [];
  seasonal_pricings_individuals: any[] = [];

  new_non_passenger_session : any = {
    session_start: "01:00",
    session_end :  "01:59",
    max_attendees: 1,
    min_adults: 1,
    max_adults: 10,
    min_children: 1,
    max_children: 10,
    min_infants: 1,
    max_infants: 10,
    min_capacity: 1,
    max_capacity: 10,
    description: "Chips with sausage",
    pricings: [
      {
          pricing_type: 1,
          seasonal_type: 1,
          date_range: "",
          individual_dates: "",
          elapsed_days_range: "",
          number_of_days_booked: "",
          child_price: {
              "1": 1500,
              "3": 2500,
              "5": 5000
          },
          infant_price: {
              "1": 1000,
              "3": 2500,
              "5": 4000
          },
          adult_price: {
              "1": 2500,
              "3": 5500,
              "5": 8000
          },
          base_price: {
            "1": 2500
        }
      }]
  };

  new_passenger_session : any = {
    session_start: "01:00",
    session_end :  "01:59",
    max_attendees: 1,
    min_adults: 1,
    max_adults: 10,
    min_children: 1,
    max_children: 10,
    min_infants: 1,
    max_infants: 10,
    min_capacity: 1,
    max_capacity: 10,
    description: "Chips with sausage",
    pricings: [
      {
          pricing_type: 1,
          seasonal_type: 1,
          date_range: "",
          individual_dates: "",
          elapsed_days_range: "",
          number_of_days_booked: "",
          child_price: {
              "1": 1500,
              "3": 2500,
              "5": 5000
          },
          infant_price: {
              "1": 1000,
              "3": 2500,
              "5": 4000
          },
          adult_price: {
              "1": 2500,
              "3": 5500,
              "5": 8000
          },
          base_price: {
            "1": 2500,
            "3": 5500,
            "5": 8000
        }
      }]
  };

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

  ngOnInit(): void {
    this.dataStore.chosen_activity.subscribe((data)=>{
      this.activity = data;
      this.seasonal_pricings_ranges = [];
      this.seasonal_pricings_individuals = [];
      this.activity.pricings = this.activity.pricings.reverse();
      this.activity.sessions.forEach((element: {
        session_end: string;
        session_start: string;
      }) => {
        if(!element.session_start.includes(":")){
          element.session_start =  [element.session_start .slice(0, 2), ':', element.session_start .slice(2)].join('');
        }
        if(!element.session_end.includes(":")){
          element.session_end = [element.session_end .slice(0, 2), ':', element.session_end .slice(2)].join('');

        }
      });

    });
  }

  getKVarray(element : any){
    console.log(element);
    return Object.keys(element);
  }

  changeKey(prevKey: string | number, target: any, obj: any ) {
    const value = obj[prevKey];
    delete obj[prevKey];
    obj[target.value] = value;
  }

  addNewNonPassengerSession(){
    this.ngxService.start();
    console.log(this.new_non_passenger_session);
    this.api.addNewSession(this.dataStore.chosen_activity.getValue().id , this.new_non_passenger_session)
      .subscribe((data)=>{
        this.api.getActivity(this.dataStore.chosen_activity.getValue().id )
        .subscribe((data: any) => {
          this.dataStore.setChosenActivity(data);
          this.ngxService.stop();
          this.notifier.notify('success','Session Added Successfully!');
        }); 
    });
  }
  addNewPassengerSession(){
    this.ngxService.start();
    console.log(this.new_passenger_session);
    this.api.addNewSession(this.dataStore.chosen_activity.getValue().id , this.new_passenger_session)
      .subscribe((data)=>{
        this.api.getActivity(this.dataStore.chosen_activity.getValue().id )
        .subscribe((data: any) => {
          this.dataStore.setChosenActivity(data);
          this.ngxService.stop();
          this.notifier.notify('success','Session Added Successfully!');
        }); 
    });
  }

  addSessionPriceSet(element: any){

    var keys = Object.keys(element.pricings[0].base_price);
    var new_key = parseInt(keys[keys.length - 1]) + 1;

    element.pricings[0].base_price[new_key] = 0;

  }
  removeSessionPriceSet(element: any){

    var keys = Object.keys(element.pricings[0].base_price);
    var last_key = (keys[keys.length - 1]);

    if (parseInt(last_key) > 1) {
      delete element.pricings[0].base_price[last_key];
    }

  }

  deleteSession(session:any){

    var session_copy = JSON.parse(JSON.stringify(session));
    session_copy.session_start = session_copy.session_start.replace(":", "");
    session_copy.session_end = session_copy.session_end.replace(":", "");

    var activity_id = session_copy.activity_id;
    var session_id = session_copy.id;

    console.log(session_copy);
    this.ngxService.start();
    this.api.deleteSession(activity_id , session_id )
    .subscribe((data)=>{
      this.api.getActivity(this.dataStore.chosen_activity.getValue().id )
      .subscribe((data: any) => {
        this.dataStore.setChosenActivity(data);
        this.ngxService.stop();
        this.notifier.notify('success', session_copy.name+ ' session Deleted Successfully!');
      });
     
    });
  }

  updateSession(session:any){

    var session_copy = JSON.parse(JSON.stringify(session));
    session_copy.session_start = session_copy.session_start.replace(":", "");
    session_copy.session_end = session_copy.session_end.replace(":", "");

    var activity_id = session_copy.activity_id;
    var session_id = session_copy.id;

    console.log(session_copy);
    this.ngxService.start();
    this.api.updateSession(activity_id , session_id , session_copy)
    .subscribe((data)=>{
      this.api.getActivity(this.dataStore.chosen_activity.getValue().id )
      .subscribe((data: any) => {
        this.ngxService.stop();
        this.notifier.notify('success', session_copy.name+ ' session Updated Successfully!');
      });
     
    });
  }

}
