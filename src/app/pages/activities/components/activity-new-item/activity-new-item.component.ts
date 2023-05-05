import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Stepper from 'bs-stepper';
import { ImagePickerConf } from 'ngp-image-picker';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';
import { threadId } from 'worker_threads';


@Component({
  selector: 'app-activity-new-item',
  templateUrl: './activity-new-item.component.html',
  styleUrls: ['./activity-new-item.component.css']
})
export class ActivityNewItemComponent implements OnInit {

  pax_dependant: any = true;
  age_dependant: any = false;
  activity_type: any = 1;
  packages_and_sessions: any = "none";

  standard_pricing_keys!: any;
  infant_pricing_keys!: any;
  children_pricing_keys!: any;
  adult_pricing_keys!: any;



  standard_pricing: any = {
    base_price: {
      1: 0
    },
    infant_price: {
      1: 0
    },
    children_price: {
      1: 0
    },
    adult_price: {
      1: 0
    }
  };

  session_pricing_keys!: any;
  session_pricing: any = {
    base_price: {
      1: 0
    }
  };

  infant_pricing: any = {
    infant_price: {
      1: 0
    }
  };

  children_pricing: any = {
    children_price: {
      1: 0
    }
  };

  adult_pricing: any = {
    adult_price: {
      1: 0
    }
  };
  

  singular_session_pricing_data: any = [
    {
      base_price: {
        1: 200
      },
      start_time: "00:00",
      end_time: "23:59",
      description: ""
    }
  ];
  singular_package_pricing_data: any = [
    {
      base_price: {
        1: 200
      },
      description: "",
      name: "Package 1"
    }
  ];
  agebased_package_pricing_data: any = [

    {
      base_price: {
        1: 0
      },
      infant_price: {
        1: 0
      },
      children_price: {
        1: 0
      },
      adult_price: {
        1: 0
      },
      description: "",
      name: "Package 1"
    }
  ];
  agebased_session_pricing_data: any = [

    {
      base_price: {
        1: 0
      },
      infant_price: {
        1: 0
      },
      children_price: {
        1: 0
      },
      adult_price: {
        1: 0
      },
      start_time: "00:00",
      end_time: "23:59",
      description: ""
    }
  ];

  seasonal_pricings_ranges: any[] = [];
  seasonal_pricings_individuals: any[] = [];

  activity_scheduled_days: any[] = [];
  activity_scheduled_days_id!: number;

  initialImage: any = '';
  imageEncoding: string = '';
  activity_id = 1;

  activity_ = {
    activity_type: 3,
    company_id: 0,
    name: "Tangezi Restaurant Reservation",
    desc: "Tangezi Restaurant Reservation",
    short_desc: "Tangezi Restaurant Reservation",
    min_adults: 1,
    max_adults: 10,
    min_children: 0,
    max_children: 10,
    min_infants: 0,
    max_infants: 10,
    min_capacity: 1,
    max_capacity: 10,
    pricings: [
      {
        pricing_type: 1,
        seasonal_type: 1,
        date_range: "",
        individual_dates: "",
        elapsed_days_range: "",
        number_of_days_booked: "",
        is_age_based: 0,

        child_price: {
          1: 100
        },
        infant_price: {
          1: 100
        },
        adult_price: {
          1: 100
        },
        base_price: {
          1: 100
        }
      }
    ],
    features: [],
    availabilities: [
      {
        availability_type: 1,
        scheduled_days: "MONDAY , TUESDAY, WEDNESDAY , THURSDAY , FRIDAY , SATURDAY , SUNDAY"
      }
    ],
    photos: [
      { encoding: "", ext: "" }
    ],
    sessions: [],
    packages: []
  }

  activity = {
    name: '',
    desc: '',
    type: 3,
    max_capacity: 10,
    min_capacity: 0
  };


  imagePickerConf: ImagePickerConf = {
    borderRadius: '4px',
    language: 'en',
    width: '160px',
    height: '120px',
  };

  constructor(
    private dataStore: DataStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef
  ) { }

  private stepper!: Stepper;


  getInfantKVarray(element : any){
    return Object.keys(element.infant_price);
  }
  getChildKVarray(element : any){
    return Object.keys(element.children_price);
  }
  getAdultKVarray(element : any){
    return Object.keys(element.adult_price);
  }

  addAgeBasedPackagePriceset() {
    this.agebased_package_pricing_data.push(
      {
        base_price: {
          1: 0
        },
        infant_price: {
          1: 0
        },
        children_price: {
          1: 0
        },
        adult_price: {
          1: 0
        },
        description: "",
        name: "Package 1"
      }
    );
  }

  removeAgeBasedPackagePriceset() {
    if (this.agebased_package_pricing_data.length == 1) {
      return;
    }
    delete this.agebased_package_pricing_data[this.agebased_package_pricing_data.length - 1];
    // var index = 0;
    this.agebased_package_pricing_data = this.agebased_package_pricing_data.filter((element: any, index: any) => {
      return index !== this.agebased_package_pricing_data.length - 1
    });
  }

  addAgeBasedSessionPriceset() {
    this.agebased_session_pricing_data.push(
      {
        base_price: {
          1: 0
        },
        infant_price: {
          1: 0
        },
        children_price: {
          1: 0
        },
        adult_price: {
          1: 0
        },
        start_time: "00:00",
        end_time: "23:59",
        description: ""
      }
    );
  }

  removeAgeBasedSessionPriceset() {
    if (this.agebased_session_pricing_data.length == 1) {
      return;
    }
    delete this.agebased_session_pricing_data[this.agebased_session_pricing_data.length - 1];
    // var index = 0;
    this.agebased_session_pricing_data = this.agebased_session_pricing_data.filter((element: any, index: any) => {
      return index !== this.agebased_session_pricing_data.length - 1
    });
  }

  addSingularSessionPriceset() {
    this.singular_session_pricing_data.push(
      {
        base_price: {
          1: 200
        },
        start_time: "00:00",
        end_time: "23:59",
        description: ""
      }
    );
  }

  removeSingularSessionPriceset() {
    if (this.singular_session_pricing_data.length == 1) {
      return;
    }
    delete this.singular_session_pricing_data[this.singular_session_pricing_data.length - 1];
    // var index = 0;
    this.singular_session_pricing_data = this.singular_session_pricing_data.filter((element: any, index: any) => {
      return index !== this.singular_session_pricing_data.length - 1
    });
  }

  addSingularPackagePriceset() {
    this.singular_package_pricing_data.push(
      {
        base_price: {
          1: 200
        },
        description: "",
        name: "Package 1"
      }
    );
  }

  removeSingularPackagePriceset() {
    if (this.singular_package_pricing_data.length == 1) {
      return;
    }
    delete this.singular_package_pricing_data[this.singular_package_pricing_data.length - 1];
    // var index = 0;
    this.singular_package_pricing_data = this.singular_package_pricing_data.filter((element: any, index: any) => {
      return index !== this.singular_package_pricing_data.length - 1
    });
  }

  choosePaxDependant(event: any) {
    console.log(this.pax_dependant);
    this.refreshActivityType();
  }
  chooseAgeDependant(event: any) {
    console.log(this.age_dependant);
    this.refreshActivityType();
  }
  choosePackageAndSessionsDependant(event: any) {
    console.log(this.packages_and_sessions);
    this.refreshActivityType();
  }
  pax_next() {

    if (!this.pax_dependant) {
      this.stepper.to(3);
    } else {
      this.stepper.next();
    }

  }
  next() {
    this.stepper.next();
  }
  previous() {
    this.stepper.previous();
  }

  onSubmit() {
    return false;
  }

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector('#stepper1') as Element, {
      linear: true,
      animation: true
    });

    this.standard_pricing_keys = Object.keys(this.standard_pricing.base_price);
    this.infant_pricing_keys = Object.keys(this.standard_pricing.infant_price);
    this.children_pricing_keys = Object.keys(this.standard_pricing.children_price);
    this.adult_pricing_keys = Object.keys(this.standard_pricing.adult_price);
  }

  uploadPhoto() {

    this.ngxService.start();
    this.api.saveNewPhoto(this.imageEncoding, this.activity_id)
      .subscribe((data) => {
        this.api.getActivityPhotos(this.activity_id)
          .subscribe((data2) => {
            this.dataStore.setChosenActivityPhotos(data2);
            this.ngxService.stop();
          });

      });


    console.log(this.imageEncoding);
  }

  onImageChanged(event: any) {
    this.imageEncoding = event;
  }

  scheduledDaysChanged(e: any, day: string) {
    console.log(this.activity_scheduled_days_id + " - " + e.target.checked, day); // {}, true || false

    if (e.target.checked == true) {
      if (!this.activity_scheduled_days.includes(day.toUpperCase())) {
        this.activity_scheduled_days.push(day.toUpperCase());
      }
    }
    if (e.target.checked == false) {
      if (this.activity_scheduled_days.includes(day.toUpperCase())) {
        this.activity_scheduled_days = this.activity_scheduled_days.filter((fday) => {
          return fday.toUpperCase() != day.toUpperCase();
        });
      }
    }
    console.log(this.activity_scheduled_days);
    // this.ngxService.start();

    // this.api.setActivityAvailability(this.activity_scheduled_days_id , day , e.target.checked)
    //     .subscribe((data)=>{
    //       console.log(data);
    //       this.ngxService.stop();

    //     });

  }

  addStandardPriceset() {
    this.standard_pricing_keys = Object.keys(this.standard_pricing.base_price);

    var keys = Object.keys(this.standard_pricing.base_price);
    var new_key = parseInt(keys[keys.length - 1]) + 1;

    this.standard_pricing.base_price[new_key] = "0000";
    this.standard_pricing_keys = Object.keys(this.standard_pricing.base_price);

    // var new_set = { new_key : "0000" };
    console.log(this.standard_pricing.base_price);

  }

  removeStandardPriceset() {
    var keys = Object.keys(this.standard_pricing.base_price);
    var last_key = (keys[keys.length - 1]);

    if (parseInt(last_key) > 1) {
      delete this.standard_pricing.base_price[last_key];
    }
    this.standard_pricing_keys = Object.keys(this.standard_pricing.base_price);



    // var new_set = { new_key : "0000" };
    console.log(this.standard_pricing.base_price);

  }

  updateStandardPricing(pricing_id: number) {

    this.ngxService.start();
    this.api.updateStandardPricing(pricing_id, this.standard_pricing.base_price)
      .subscribe((data) => {
        var activity = this.dataStore.chosen_activity.getValue();
        this.api.getActivity(activity.id).subscribe((data1) => {
          this.dataStore.setChosenActivity(data1);
          this.ngxService.stop();
        });
      });

    console.log(pricing_id);

    console.log(this.standard_pricing.base_price);
  }

  updatePricingPersons(event: any, old_key: any) {

    var new_key = event.target.value;


    this.standard_pricing.base_price[new_key] = this.standard_pricing.base_price[old_key];
    delete this.standard_pricing.base_price[old_key];
    this.standard_pricing_keys = Object.keys(this.standard_pricing.base_price);

    console.log("change " + event.target.value);
  }


  refreshActivityType() {
    if (this.pax_dependant) {
      if (this.age_dependant) {

        switch (this.packages_and_sessions) {
          case "none":
            this.activity_type = 2;
            break;
          case "sessions":
            this.activity_type = 8;
            break;
          case "packages":
            this.activity_type = 5;
            break;

          default:
            break;
        }

      } else {

        switch (this.packages_and_sessions) {
          case "none":
            this.activity_type = 3;
            break;
          case "sessions":
            this.activity_type = 9;
            break;
          case "packages":
            this.activity_type = 6;
            break;

          default:
            break;
        }
      }
    } else {
      switch (this.packages_and_sessions) {
        case "none":
          this.activity_type = 1;
          break;
        case "sessions":
          this.activity_type = 7;
          break;
        case "packages":
          this.activity_type = 4;
          break;

        default:
          break;
      }
    }
  }

  addNewItem() {




    // return '';
   

    var encoding = this.imageEncoding.split(",")[1];
    var ext = this.imageEncoding.split(';')[0].split('/')[1];

    // console.log(this.activity_);
    this.activity_.company_id = this.dataStore.dashboardInfo.getValue().company.id;
    this.activity_.name = this.activity.name;
    this.activity_.desc = this.activity.desc;
    this.activity_.min_capacity = this.activity.min_capacity;
    this.activity_.max_capacity = this.activity.max_capacity;
    this.activity_.pricings[0].base_price = this.standard_pricing.base_price;
    this.activity_.availabilities[0].scheduled_days = this.activity_scheduled_days.join();
    this.activity_.activity_type = this.activity_type;


    this.activity_.sessions = [];
    if(this.activity_type == 8){
      this.agebased_session_pricing_data.forEach((element : any)  => {
      
        console.log(element);
        var session : any = {
          session_start: element.start_time.replace(":", ""),
          session_end :  element.end_time.replace(":", ""),
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
        session.pricings[0].base_price = element.base_price;
        session.pricings[0].infant_price = element.infant_price;
        session.pricings[0].child_price = element.children_price;
        session.pricings[0].adult_price = element.adult_price;
  
        this.activity_.sessions.push(session as never);
      });
    }else{
      this.singular_session_pricing_data.forEach((element : any)  => {
      
        console.log(element);
        var session : any = {
          session_start: element.start_time.replace(":", ""),
          session_end :  element.end_time.replace(":", ""),
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
        session.pricings[0].base_price = element.base_price;
        this.activity_.sessions.push(session as never);
      });
    }
    
    

    this.activity_.packages = [];
    if(this.activity_type == 5){
      this.agebased_package_pricing_data.forEach((element : any)  => {
      
        // console.log("AGE");
        var package_ : any = {
          name: element.name,
          description :  element.description,
          max_attendees: 1,
          min_adults: 1,
          max_adults: 10,
          min_children: 1,
          max_children: 10,
          min_infants: 1,
          max_infants: 10,
          min_capacity: 1,
          max_capacity: 10,
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
        package_.pricings[0].base_price = element.base_price;
        package_.pricings[0].infant_price = element.infant_price;
        package_.pricings[0].child_price = element.children_price;
        package_.pricings[0].adult_price = element.adult_price;
        this.activity_.packages.push(package_ as never);
      });
    }else{
      this.singular_package_pricing_data.forEach((element : any)  => {
      
        // console.log("SINGULAR");
        var package_ : any = {
          name: element.name,
          description :  element.description,
          max_attendees: 1,
          min_adults: 1,
          max_adults: 10,
          min_children: 1,
          max_children: 10,
          min_infants: 1,
          max_infants: 10,
          min_capacity: 1,
          max_capacity: 10,
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
        package_.pricings[0].base_price = element.base_price;
        this.activity_.packages.push(package_ as never);
      });
    }
    
    
    

    if (this.imageEncoding !== '') {
      this.activity_.photos[0].encoding = encoding;
      this.activity_.photos[0].ext = ext;
    } else {
      this.activity_.photos = [];
    }


    // console.log(this.activity_);
    // return;


    this.ngxService.start();
    this.api.addNewActivity(this.activity_).subscribe((data) => {

      this.ngxService.stop();
      this.router.navigateByUrl('/home/(home_view:products/activities/' + this.dataStore.dashboardInfo.getValue().company.id + ')');
    });
  }

}
