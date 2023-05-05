import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ChartsModule } from 'ng2-charts';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './http-interceptors/auth.interceptor';
import { ActivitiesListComponent } from './pages/activities/components/activities-list/activities-list.component';
import { CompaniesListComponent } from './pages/activities/components/companies-list/companies-list.component';
import { ActivityComponent } from './pages/activities/components/activity/activity.component';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { SortableModule } from 'ngx-bootstrap/sortable';


import { ActivityDetailsComponent } from './pages/activities/components/activity-details/activity-details.component';
import { NgpImagePickerModule } from 'ngp-image-picker';
import { ActivityPhotosComponent } from './pages/activities/components/activity-details/activity-photos/activity-photos/activity-photos.component';
import { ActivityAvailabilityComponent } from './pages/activities/components/activity-availability/activity-availability.component';
import { ScheduledDaysComponent } from './pages/activities/components/activity-availability/scheduled-days/scheduled-days.component';
import { NgpLazyLoadModule } from 'ngp-lazy-load';
import { SpecificDateRangesComponent } from './pages/activities/components/activity-availability/specific-date-ranges/specific-date-ranges.component';
import { SpecificIndividualDatesComponent } from './pages/activities/components/activity-availability/specific-individual-dates/specific-individual-dates.component';
import { ActivityCapacitySingularComponent } from './pages/activities/components/activity-details/activity-capacity-singular/activity-capacity-singular.component';
import { ActivityCapacityAgebasedComponent } from './pages/activities/components/activity-details/activity-capacity-agebased/activity-capacity-agebased.component';
import { ActivityPricingsComponent } from './pages/activities/components/activity-pricings/activity-pricings.component';
import { AddNewSingularPricingRangeComponent } from './pages/activities/modals/add-new-singular-pricing-range/add-new-singular-pricing-range.component';
import { AddNewSingularPricingDateComponent } from './pages/activities/modals/add-new-singular-pricing-date/add-new-singular-pricing-date.component';
import { ActivityEnhancementsComponent } from './pages/activities/components/activity-enhancements/activity-enhancements.component';
import { AddNewEnhancementComponent } from './pages/activities/modals/add-new-enhancement/add-new-enhancement.component';
import { AddNewAvailabilityRangeComponent } from './pages/activities/modals/add-new-availability-range/add-new-availability-range.component';
import { AddNewAvailabilityDateComponent } from './pages/activities/modals/add-new-availability-date/add-new-availability-date.component';
import { BookingsTableComponent } from './pages/home/dashboard/bookings-table/bookings-table.component';
import { DashboardComponent } from './pages/home/dashboard/dashboard.component';
import { TopNavbarComponent } from './pages/home/top-navbar/top-navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ActivityNewItemComponent } from './pages/activities/components/activity-new-item/activity-new-item.component';
import { UsersComponent } from './pages/users/users.component';
import { ConfigurationsComponent } from './pages/configurations/configurations.component';
import { AddNewUserComponent } from './pages/activities/modals/add-new-user/add-new-user.component';
import { ActivityTypeSelectorComponent } from './pages/activities/components/activity-type-selector/activity-type-selector.component';
import { ActivitySessionPricingsComponent } from './pages/activities/components/activity-session-pricings/activity-session-pricings.component';
import { ActivityInclusionsComponent } from './pages/activities/components/activity-inclusions/activity-inclusions.component';
import { AddNewInclusionComponent } from './pages/activities/modals/add-new-inclusion/add-new-inclusion.component';
import { ActivityPackagePricingsComponent } from './pages/activities/components/activity-package-pricings/activity-package-pricings.component';
import { ActivityPackagesComponent } from './pages/activities/components/activity-packages/activity-packages.component';
import { PackageComponent } from './pages/activities/components/package/package.component';
import { AddNewPackageDatePriceComponent } from './pages/activities/modals/add-new-package-date-price/add-new-package-date-price.component';
import { AddNewPackageRangePriceComponent } from './pages/activities/modals/add-new-package-range-price/add-new-package-range-price.component';
import { AddNewPackageComponent } from './pages/activities/modals/add-new-package/add-new-package.component';
import { AddNewSingularAgebasedPricingDateComponent } from './pages/activities/modals/add-new-singular-agebased-pricing-date/add-new-singular-agebased-pricing-date.component';
import { AddNewSingularAgebasedPricingRangeComponent } from './pages/activities/modals/add-new-singular-agebased-pricing-range/add-new-singular-agebased-pricing-range.component';
import { ScanBoardingPassComponent } from './pages/activities/modals/scan-boarding-pass/scan-boarding-pass.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { EntriesTableComponent } from './pages/home/dashboard/entries-table/entries-table.component';
import { CreateNewVoucherComponent } from './pages/activities/modals/create-new-voucher/create-new-voucher.component';
import { AgentDashboardComponent } from './pages/home/agent-dashboard/agent-dashboard.component';
import { VouchersTableComponent } from './pages/home/agent-dashboard/vouchers-table/vouchers-table.component';
import { AgentsListComponent } from './pages/activities/components/agents-list/agents-list.component';
import { AddNewAgentComponent } from './pages/activities/modals/add-new-agent/add-new-agent.component';
import { EditAgentDetailsComponent } from './pages/activities/modals/edit-agent-details/edit-agent-details.component';
import { AddNewAgentUserComponent } from './pages/activities/modals/add-new-agent-user/add-new-agent-user.component';
import { AddNewAirlineComponent } from './pages/activities/modals/add-new-airline/add-new-airline.component';
import { AirlinesListComponent } from './pages/activities/components/airlines-list/airlines-list.component';
import { EditAirlineDetailsComponent } from './pages/activities/modals/edit-airline-details/edit-airline-details.component';
import { BookingsReportComponent } from './pages/activities/components/bookings-report/bookings-report.component';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { LoadingDashboardComponent } from './pages/home/loading-dashboard/loading-dashboard.component';
import { AgentUsersComponent } from './pages/agent-users/agent-users.component';
import { ConfirmInvalidateVoucherComponent } from './pages/activities/modals/confirm-invalidate-voucher/confirm-invalidate-voucher.component';
import { ChangePasswordComponent } from './pages/activities/modals/change-password/change-password.component';
// import { RouterModule } from '@angular/router';
import { RecaptchaModule } from "ng-recaptcha";
import { VerifyAgentVoucherComponent } from './pages/activities/components/verify-agent-voucher/verify-agent-voucher.component';
import { AdminAgentUsersComponent } from './pages/admin-agent-users/admin-agent-users.component';
import { UserVouchersTableComponent } from './pages/home/agent-dashboard/user-vouchers-table/user-vouchers-table.component';



const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 15
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    ActivitiesListComponent,
    CompaniesListComponent,
    ActivityComponent,
    ActivityDetailsComponent,
    ActivityPhotosComponent,
    ActivityAvailabilityComponent,
    ScheduledDaysComponent,
    SpecificDateRangesComponent,
    SpecificIndividualDatesComponent,
    ActivityCapacitySingularComponent,
    ActivityCapacityAgebasedComponent,
    ActivityPricingsComponent,
    AddNewSingularPricingRangeComponent,
    AddNewSingularPricingDateComponent,
    ActivityEnhancementsComponent,
    AddNewEnhancementComponent,
    AddNewAvailabilityRangeComponent,
    AddNewAvailabilityDateComponent,
    BookingsTableComponent,
    DashboardComponent,
    TopNavbarComponent,
    HomeComponent,
    LoginComponent,
    ActivityNewItemComponent,
    UsersComponent,
    ConfigurationsComponent,
    AddNewUserComponent,
    ActivityTypeSelectorComponent,
    ActivitySessionPricingsComponent,
    ActivityInclusionsComponent,
    AddNewInclusionComponent,
    ActivityPackagePricingsComponent,
    ActivityPackagesComponent,
    PackageComponent,
    AddNewPackageDatePriceComponent,
    AddNewPackageRangePriceComponent,
    AddNewPackageComponent,
    AddNewSingularAgebasedPricingDateComponent,
    AddNewSingularAgebasedPricingRangeComponent,
    ScanBoardingPassComponent,
    EntriesTableComponent,
    CreateNewVoucherComponent,
    AgentDashboardComponent,
    VouchersTableComponent,
    AgentsListComponent,
    AddNewAgentComponent,
    EditAgentDetailsComponent,
    AddNewAgentUserComponent,
    AddNewAirlineComponent,
    AirlinesListComponent,
    EditAirlineDetailsComponent,
    BookingsReportComponent,
    LoadingDashboardComponent,
    AgentUsersComponent,
    ConfirmInvalidateVoucherComponent,
    ChangePasswordComponent,
    VerifyAgentVoucherComponent,
    AdminAgentUsersComponent,
    UserVouchersTableComponent,
  ],
  imports: [
    DataTablesModule.forRoot(), 
    AppRoutingModule,
    NgpLazyLoadModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    ModalDialogModule.forRoot(),
    NgxUiLoaderModule, 
    DataTablesModule.forRoot(), 
    ChartsModule,
    NgpImagePickerModule,
    TabsModule,
    ZXingScannerModule,
    SortableModule.forRoot(),
    RecaptchaModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
