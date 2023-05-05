import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-verify-agent-voucher',
  templateUrl: './verify-agent-voucher.component.html',
  styleUrls: ['./verify-agent-voucher.component.css']
})
export class VerifyAgentVoucherComponent implements OnInit{

  private readonly notifier: NotifierService;
  voucherDetails: any;
  boardingPassDetails: any= {
    fname: '',
    lname:'',
    flight_origin: '',
    flight_destination: '',
    flight_number : '',
    flight_date: '',
    compartment_code: '',
    airline: '',
    service: '',
    is_redeemable: '',
    voucher_id: '',
    booking_type: '',
  };
  scan_completed: boolean = false;


  wrong_compartment_code: boolean = false;
  wrong_flight_destination: boolean = false;
  wrong_flight_origin: boolean = false;
  wrong_flight_number: boolean = false;
  wrong_flight_date: boolean = false;
  wrong_lname: boolean = false;
  wrong_fname: boolean = false;
  wrong_airline: boolean = false;
  boarding_pass_match: boolean = true;

  

  qrResultString: string  = '';



  constructor(
    notifierService: NotifierService,
    private router: Router , 
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private dataStore: DataStoreService,) {
    this.notifier = notifierService;

  }
  ngOnInit(): void {
    this.initializeData();

    if(!this.voucherDetails.fname.includes(this.boardingPassDetails.fname)  ){
      this.wrong_fname = true;
      this.boarding_pass_match = false;
    }
    if(!this.voucherDetails.lname.includes(this.boardingPassDetails.lname) ){
      this.wrong_lname = true;
      this.boarding_pass_match = false;
    }
    if(!this.voucherDetails.flight_origin.includes(this.boardingPassDetails.flight_origin)){
      this.wrong_flight_origin = true;
      this.boarding_pass_match = false;
    }

    if(!this.voucherDetails.flight_destination.includes(this.boardingPassDetails.flight_destination) ){
      this.wrong_flight_destination = true;
      this.boarding_pass_match = false;
    }

    if(!this.voucherDetails.flight_number.includes(this.boardingPassDetails.flight_number) ){
      this.wrong_flight_number = true;
      this.boarding_pass_match = false;
    }

    if(!this.voucherDetails.flight_date.includes(this.boardingPassDetails.flight_date) ){
      this.wrong_flight_date = true;
      this.boarding_pass_match = false;
    }
    if(!this.voucherDetails.compartment_code.includes(this.boardingPassDetails.compartment_code)){
      this.wrong_compartment_code = true;
      this.boarding_pass_match = false;
    }
    if(!this.voucherDetails.airline.includes(this.boardingPassDetails.airline)){
      this.wrong_airline = true;
      this.boarding_pass_match = false;
    }

    
    

    
  }


  async initializeData(){
    this.voucherDetails = this.dataStore.extracted_voucher_details.getValue();
    this.boardingPassDetails = this.dataStore.bording_pass_extracted_details.getValue();
  }

  scanAgain(){
    this.router.navigateByUrl('/home/(home_view:admin)');
  }

  redeemVoucher(){
    this.ngxService.start();
      this.api.redeeemVoucher(this.voucherDetails.voucher_id)
        .subscribe((save_entry_data: any) => {

          if (save_entry_data.hasOwnProperty("error")) {
            this.notifier.notify('error', save_entry_data.error);
            this.ngxService.stop();
            return;
          } else {
            this.api.getDashboardInfo()
              .subscribe((data: any) => {
                // this.dataStore.setDashboardInfo(data);
                console.log("Getting Dashboard Info For Newly Saved Entry ", data);
                this.dataStore.setDashboardInfo(data);

                this.notifier.notify('success', 'Voucher Redeemed Successfully!');

                this.ngxService.stop();
                this.router.navigateByUrl('/home/(home_view:admin)');

                return true

              });
          }


        });
  }

}
