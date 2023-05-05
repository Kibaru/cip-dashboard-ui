import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit {

  companies: any = [];

  constructor(
    private dataStore: DataStoreService,
    private router: Router,
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.api.getCompanies()
      .subscribe((data: any) => {
        console.log(data);
        // this.dataStore.setRestaurants(data);
        this.companies = data.companies;
        this.ngxService.stop();
        return;
      });
  }

  viewCompany(company_id : number){
    this.router.navigate(['/activities', company_id]);
  }
}
