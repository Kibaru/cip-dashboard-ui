import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ImagePickerConf } from 'ngp-image-picker';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {

  company = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    consumer_key: '',
    consumer_secret: '',
    custom_special_req_text: '',
    custom_quantifier_text: '',
    description: '',
    cancellation_policy: '',
    widget_header_text: '',
    widget_header_subtext: '',
    widget_company_text: '',
    widget_company_image: '',
    voucher_expiry_time : '',
    default_tax_rate : 0
  };
  initialImage: any = '';
  imageEncoding: string = '';
  imagePickerConf: ImagePickerConf = {
    borderRadius: '4px',
    language: 'en',
    width: '160px',
    height: '120px',
  };
  company_currency : any = {};
  private readonly notifier: NotifierService;


  constructor(
    notifierService: NotifierService,
    private dataStore: DataStoreService,
    private router: Router,
    private api: ApiService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef,
    private ngxService: NgxUiLoaderService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.ngxService.start();

    this.api.getDashboardInfo()
      .subscribe((data: any) => {
        this.dataStore.setDashboardInfo(data);
        console.log(data);
        this.company = data.company;
        this.company_currency = data.currency;
        console.log(this.company);
        this.ngxService.stop();
      });
  }

  updateWidgetCompanyInfo() {

    this.ngxService.start();
    this.api.updateWidgetCompanyInfo(this.imageEncoding, this.company.widget_company_text ,  this.company.id)
      .subscribe((data) => {
        this.api.getDashboardInfo()
          .subscribe((data: any) => {
            this.dataStore.setDashboardInfo(data);
            console.log(data);
            this.company = data.company;
            this.company_currency = data.currency;
            console.log(this.company);
            this.ngxService.stop();
          });

      });


    console.log(this.imageEncoding);
  }

  updateConfigurations() {
    this.ngxService.start();
    this.api.updateConfigurations(this.dataStore.dashboardInfo.getValue().company.id, this.company)
      .subscribe((data) => {
        console.log(data);
        this.api.getDashboardInfo()
          .subscribe((data: any) => {
            this.dataStore.setDashboardInfo(data);
            console.log(data);
            this.company = data.company;
            console.log(this.company);
            this.ngxService.stop();
            this.notifier.notify('success', 'Configurations Updated Successfully!');
          });
      });
  }

  updateVoucherConfigurations() {
    this.ngxService.start();
    this.api.updateVoucherConfigurations(this.dataStore.dashboardInfo.getValue().company.id, this.company)
      .subscribe((data) => {
        console.log(data);
        this.api.getDashboardInfo()
          .subscribe((data: any) => {
            this.dataStore.setDashboardInfo(data);
            console.log(data);
            this.company = data.company;
            console.log(this.company);
            this.ngxService.stop();
            this.notifier.notify('success', 'Configurations Updated Successfully!');
          });
      });
  }

  onCurrencySelected(value : any){
    this.ngxService.start();
    console.log("the selected value is " + value);
    this.api.setCurrency(value,this.dataStore.dashboardInfo.getValue().company.id)
      .subscribe((data) => {
        console.log(data);
        this.api.getDashboardInfo()
          .subscribe((data: any) => {
            this.dataStore.setDashboardInfo(data);
            console.log(data);
            this.company = data.company;
            console.log(this.company);
            this.ngxService.stop();
            this.notifier.notify('success', 'Currency Updated Successfully!');
          });
      });
  }

  onImageChanged(event: any) {
    this.imageEncoding = event;
  }

}
