import { Component, ComponentRef } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { NotifierService } from 'angular-notifier';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-create-new-voucher',
  templateUrl: './create-new-voucher.component.html',
  styleUrls: ['./create-new-voucher.component.css']
})
export class CreateNewVoucherComponent implements IModalDialog {


  scan_completed = false;
  title = "Create New Voucher";

  fname= '';
  lname= '';
  flight_date= '';
  flight_number= '';
  flight_origin= '';
  flight_destination='';
  price = 0;
  airline = '';
  email = '';
  verify_email = '';
  service = '';

  packages:any[] = [];
  route = 'departure';
  torchEnabled = false;
  tryHarder = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);




  actionButtons: IModalDialogButton[] = [];
  closeSubject!: Subject<void>;
  compartment_code: string = "";



  private readonly notifier: NotifierService;
  classes: any = [{"name":"Economy"}, {"name":"Business"}, {"name":"First Class"}];
  airlines: any;
  services: any = [];


  wrong_airline: boolean = false;
  wrong_flight_destination: boolean = false;
  wrong_flight_origin: boolean = false;
  wrong_flight_number: boolean = false;
  wrong_flight_date: boolean = false;
  wrong_lname: boolean = false;
  wrong_fname: boolean = false;
  wrong_service: boolean = false;
  wrong_email : boolean = false;
  wrong_class: boolean = false;
  has_error: boolean = false;



  constructor (  
    notifierService: NotifierService,
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private dataStore: DataStoreService, ) { 
      this.notifier = notifierService;
    this.actionButtons = [
      
      { text: 'Close', onAction: () => true }
    ]
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    // no processing needed
    this.closeSubject = options.closeDialogSubject!;
    options.actionButtons = this.actionButtons;
    options.title = this.title;

  }

  ngOnInit(): void {
    this.getServices();
    console.log("Getting Activity Packages")
    this.dataStore.chosen_activity_packages.subscribe((data)=>{
      this.packages = data;
    });

    

    this.api.getAirlines().subscribe((airlines)=>{
      this.dataStore.setAirlines(airlines);
    });

    this.dataStore.airlines.subscribe((data)=>{
      this.airlines = data;
    });
    
  }

  saveNewEntry(){

    this.has_error = false; 

    if(this.fname == ''){
      this.wrong_fname = true;
      this.has_error = true;

    }else{
      this.wrong_fname = false;
    };


    if(this.lname == ''){
      this.wrong_lname = true;
      this.has_error = true;

    }else{
      this.wrong_lname = false;
    };
    
    if(this.flight_date == ''){
      this.wrong_flight_date = true;
      this.has_error = true;

    }else{
      this.wrong_flight_date = false;
    };;

    if(this.flight_number == ''){
      this.wrong_flight_number = true;
      this.has_error = true;

    }else{
      this.wrong_flight_number = false;
    };;


    if(this.flight_origin == ''){
      this.wrong_flight_origin = true;
      this.has_error = true;

    }else{
      this.wrong_flight_origin = false;
    };;


    if(this.flight_destination == ''){
      this.wrong_flight_destination = true;
      this.has_error = true;

    }else{
      this.wrong_flight_destination = false;
    };;


    if(this.airline == ''){
      this.wrong_airline = true;
      this.has_error = true;

    }else{
      this.wrong_airline = false;
    };;


    if(this.service == ''){
      this.wrong_service = true;
      this.has_error = true;

    }else{
      this.wrong_service = false;
    };


    if(this.email == ''){
      this.wrong_email = true;
      this.has_error = true;

    }else{
      this.wrong_email = false;
    };


    
    if(this.compartment_code == ''){
      this.wrong_class = true;
      this.has_error = true;

    }else{
      this.wrong_class = false;
      
    };


    if(this.email != this.verify_email){
      this.wrong_email = true;
      this.has_error = true;

    }else{
      this.wrong_email = false;
    };


    if(this.has_error){
     return;

    };


    
    
    

    this.ngxService.start();

    this.api.getUserInfo()
      .subscribe((user_data:any)=>{
        this.dataStore.setUserInfo(user_data);
        console.log("User Info" , user_data);
        this.api.getUserAgentData(user_data.id)
          .subscribe((user_agent_data:any)=>{
            this.dataStore.setUserAgentData(user_agent_data);
            const entry_payload = {
              first_name : this.fname,
              last_name : this.lname,
              airline : this.airline,
              flight_number : this.flight_number,
              class : this.compartment_code,
              route : this.route,
              price : user_agent_data.voucher_price,
              company_id : user_data.company_id,
              flight_date : this.flight_date,
              origin : this.flight_origin,
              destination : this.flight_destination,
              redeemed : 0 ,
              guest_email : this.email ,
              agent_id : user_agent_data.agent_user.agent_id,
              service : this.service
            };

            this.api.saveNewEntry(entry_payload)
              .subscribe((save_entry_data)=>{

                  this.api.getDashboardInfo()
                  .subscribe((data :any)=>{
                    // this.dataStore.setDashboardInfo(data);
                    this.dataStore.setDashboardInfo(data);
                    this.closeSubject.next(); 
                    this.ngxService.stop();
                    this.notifier.notify('success', 'Voucher Generated Successfully!');

                    return true

                  });
              });
          });
      });

    
  }

  async getServices(){
    this.services = await this.api.getCIPLoungePackages().toPromise();
  }



}
