import { Component, ComponentRef, OnInit } from '@angular/core';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { BarcodeFormat } from '@zxing/library';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';


@Component({
  selector: 'app-scan-boarding-pass',
  templateUrl: './scan-boarding-pass.component.html',
  styleUrls: ['./scan-boarding-pass.component.css']
})
export class ScanBoardingPassComponent implements IModalDialog {


  availableDevices!: MediaDeviceInfo[];
  deviceCurrent!: MediaDeviceInfo | undefined;
  deviceSelected!: string;

  hasDevices!: boolean;
  hasPermission!: boolean;

  qrResultString!: string;

  testing_string = "M1SURNAME/FIRSTNM      ABCDEF DARAAAKQ 9999O353C99999999 348>5184      B1A              2A             0    XB FQTVNUMBER25FQTV    Y";


  scan_completed = false;
  title = "Scan QR Code";

  fname = '';
  lname = '';
  service = 'CIP GOLD - Lounge Service Only (Adult)';
  flight_date = '';
  flight_number = '';
  flight_origin = '';
  flight_destination = '';
  booking_type: any = 'Walk-In';
  airline = '';
  voucher_number = '0';
  packages: any[] = [];
  airlines: any[] = [];
  services: any = [];


  route = 'departure';
  torchEnabled = false;
  tryHarder = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.PDF_417,
    BarcodeFormat.QR_CODE
  ];


  actionButtons: IModalDialogButton[] = [];
  closeSubject!: Subject<void>;
  compartment_code: string = "";
  is_redeemable: boolean = false;
  voucher_id: any;
  private readonly notifier: NotifierService;
  scanning_boarding_pass: boolean = false;
  scanning_barcode: boolean = true;
  is_airline_voucher: boolean = false;


  constructor(
    notifierService: NotifierService,
    private router: Router , 
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private dataStore: DataStoreService,) {
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
    this.dataStore.chosen_activity_packages.subscribe((data) => {
      this.packages = data;
    });

    this.dataStore.airlines.subscribe((data) => {
      this.airlines = data;
    });

    let code = "";
    let reading = false;

    document.addEventListener('keypress', e => {
      //usually scanners throw an 'Enter' key at the end of read
      if (e.keyCode === 13) {
        // console.log(code);
        this.qrResultString = code;

        if (code.split('-')[0] == 'CIPAG') {
          this.ngxService.start();

          this.api.getVoucherDetails(code.split('-')[1])
            .subscribe((data: any) => {

              console.log(data);

              if (data.origin == 'DAR') {
                this.route = 'departure';
              }
              if (data.destination == 'DAR') {
                this.route = 'arrival';
              }

              this.fname = data.first_name;
              this.lname = data.last_name;
              this.flight_origin = data.origin;
              this.flight_destination = data.destination;
              this.flight_number = data.flight_number;
              this.flight_date = data.flight_date;
              this.compartment_code = data.class;
              this.airline = data.airline;
              this.service = data.service;
              this.is_redeemable = true;
              this.voucher_id = data.id;
              this.booking_type = 'Agent-Voucher';

              const extracted_voucher_details = {
                fname: this.fname,
                lname: this.lname,
                flight_origin: this.flight_origin,
                flight_destination: this.flight_destination,
                flight_number : this.flight_number ,
                flight_date: this.formatDate(this.flight_date),
                compartment_code: this.compartment_code,
                airline: this.airline,
                service: this.service,
                is_redeemable: this.is_redeemable,
                voucher_id: this.voucher_id,
                booking_type: this.booking_type
              };


              this.dataStore.setExtractedVoucherDetails(extracted_voucher_details);
              this.scanning_barcode = false;
              this.ngxService.stop();
              code = "";

              this.scanning_boarding_pass = true;
            

              
            });
        } else {
          this.readKQBarcode(code);
          this.scan_completed = true;
        }
        /// code ready to use                
        code = "";
      } else {
        code += e.key; //while this is not an 'enter' it stores the every key            
      }

      //run a timeout of 200ms at the first read and clear everything
      if (!reading) {
        reading = true;
        setTimeout(() => {
          code = "";
          reading = false;
        }, 2500);  //200 works fine for me but you can adjust it
      }
    });


  }


  clearResult(): void {
    this.qrResultString = "";
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;

    if (resultString.split('-')[0] == 'CIPAG') {
      this.ngxService.start();

      this.api.getVoucherDetails(resultString.split('-')[1])
        .subscribe((data: any) => {

          if (data.origin == 'DAR') {
            this.route = 'departure';
          }
          if (data.destination == 'DAR') {
            this.route = 'arrival';
          }

          this.fname = data.first_name;
          this.lname = data.last_name;
          this.flight_origin = data.origin;
          this.flight_destination = data.destination;
          this.flight_number = data.flight_number;
          this.flight_date = data.flight_date;
          this.compartment_code = data.class;
          this.airline = data.airline;
          this.scan_completed = true;
          this.is_redeemable = true;
          this.voucher_id = data.id;
          this.booking_type = 'Agent-Voucher';
          this.ngxService.stop();
        });
    } else {
      this.readKQBarcode(resultString);
      this.scan_completed = true;
    }




    // this.title = "Verify Details ";
    // this.closeSubject.next(); 
  }

  bookingTypeChanged(){
    console.log(this.booking_type );
    if(this.booking_type == 'Airline-Voucher'){
      this.is_airline_voucher = true;
      this.service = 'CIP GOLD - Lounge Service Only (Adult)';
    }else{
      this.is_airline_voucher = false;
    }
  }


  async getServices() {
    this.services = await this.api.getCIPLoungePackages().toPromise();
  }

  formatDate(dateString : string) {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}`;
  }


  saveNewEntry() {

    if (this.airline == '' || this.airline == '0') {
      this.notifier.notify('error', 'The Airline Of the guest trip is Required');
      return;
    };
    if (this.booking_type == '' || this.booking_type == 0) {
      this.notifier.notify('error', 'The Booking Type is Required');
      return;
    };
    if (this.route == '' || this.route == '0') {
      this.notifier.notify('error', 'The Route (Arrival / Departure) is Required');
      return;
    };
    if (this.booking_type == 'Airline-Voucher' && this.voucher_number == '0') {
      this.notifier.notify('error', 'The Voucher Number is Required');
      return;
    };

    if (this.is_redeemable) {

      this.ngxService.start();
      this.api.redeeemVoucher(this.voucher_id)
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
                this.closeSubject.next();

                this.notifier.notify('success', 'Voucher Redeemed Successfully!');

                this.ngxService.stop();

                return true

              });
          }


        });
    } else {

      const entry_payload = {
        first_name: this.fname,
        last_name: this.lname,
        airline: this.airline,
        flight_number: this.flight_number,
        class: this.compartment_code,
        route: this.route,
        booking_type: this.booking_type,
        company_id: 53,
        flight_date: this.flight_date,
        origin: this.flight_origin,
        destination: this.flight_destination,
        voucher_number : this.voucher_number,
        service : this.service
      };

      this.ngxService.start();
      this.api.saveNewEntry(entry_payload)
        .subscribe((save_entry_data) => {

          this.api.getDashboardInfo()
            .subscribe((data: any) => {
              // this.dataStore.setDashboardInfo(data);
              console.log("Getting Dashboard Info For Newly Saved Entry ", data);
              this.dataStore.setDashboardInfo(data);

              this.closeSubject.next();

              this.notifier.notify('success', 'Boarding Pass Scanned Successfully!');
              this.ngxService.stop();

              return true

            });
        });
    }





  }

  

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.deviceCurrent = device;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device;
  }


  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }


  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }


  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  readKQBarcode(text: string) {

    var text_arr = text.split(/\s+/);
    console.log(text.split(/\s+/));

    var gender = text_arr[0].slice(0, 1)

    // text = text.replace(/\s/g, '');

    var format_code = text.slice(0, 1).trim();
    var number_of_legs = text.slice(1, 2).trim();
    var passenger_name = text.slice(2, 22).trim();
    var electronic_ticket_indicator = text.slice(22, 23).trim();
    var operating_carrier_code = text.slice(23, 30).trim();
    var origin_iata_code = text.slice(30, 33).trim();
    var destination_iata_code = text.slice(33, 36).trim();

    var airline_iata_code = text.slice(36, 39).trim();
    var flight_number = text.slice(39, 44).trim();

    var date_of_flight = this.julianToCalendar(parseInt(text.slice(44, 47).trim()));
    var compartment_code = text.slice(47, 48).trim();
    var seat_number = text.slice(48, 52).trim();
    var checkin_seq_number = text.slice(52, 57).trim();
    var passenger_status = text.slice(57, 60).trim();

    var fName = passenger_name.split("/")[1];
    var lName = passenger_name.split("/")[0];

    this.fname = fName;
    this.lname = lName;
    this.flight_origin = origin_iata_code;
    this.flight_destination = destination_iata_code;
    this.flight_number = airline_iata_code + flight_number;
    this.flight_date = date_of_flight;
    this.compartment_code = compartment_code;
    this.airline = airline_iata_code;

    if (origin_iata_code == 'DAR') {
      this.route = 'departure';
    }
    if (destination_iata_code == 'DAR') {
      this.route = 'arrival';
    }


    const boarding_pass_extracted_details = {
      fname: this.fname,
      lname: this.lname,
      flight_origin: this.flight_origin,
      flight_destination: this.flight_destination,
      flight_number : this.flight_number ,
      flight_date: (this.flight_date),
      compartment_code: this.compartment_code,
      airline: this.airline,
      service: this.service,
      is_redeemable: this.is_redeemable,
      voucher_id: this.voucher_id,
      booking_type: this.booking_type
    };

    if(this.scanning_boarding_pass){
      this.dataStore.setBoardingPassExtractedDetails(boarding_pass_extracted_details);
      this.scanning_boarding_pass = false;

      this.router.navigateByUrl('/home/(home_view:verify_voucher)');
    }
    





  }

  julianToCalendar(days: number) {


    var result = new Date(new Date().getFullYear(), 0, 1);
    result.setDate(result.getDate() + (days - 1));
    var day = result.getDate();
    var month = result.getMonth();

    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    let monthName = monthNames[month];

    return `${monthName} ${day}`;
  }

  julianIntToDate(julianDate: number) {

    if (!isNaN(julianDate)) {
      var a = julianDate + 32044;
      var b = Math.floor(((4 * a) + 3) / 146097);
      var c = a - Math.floor((146097 * b) / 4);
      var d = Math.floor(((4 * c) + 3) / 1461);
      var e = c - Math.floor((1461 * d) / 4);
      var f = Math.floor(((5 * e) + 2) / 153);

      var D = e + 1 - Math.floor(((153 * f) + 2) / 5);
      var M = f + 3 - 12 - Math.round(f / 10);
      var Y = (100 * b) + d - 4800 + Math.floor(f / 10)
      return (M - 1) + " " + D;
    }
    return false;
  }

  padWithZero(num: number) {
    return num.toString().padStart(2, '0');
  }

}
