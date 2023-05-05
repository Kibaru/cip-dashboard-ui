import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-activity-capacity-singular',
  templateUrl: './activity-capacity-singular.component.html',
  styleUrls: ['./activity-capacity-singular.component.css']
})
export class ActivityCapacitySingularComponent implements OnInit {

  activity!: any;

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
    this.dataStore.chosen_activity.subscribe((data)=>{
      this.activity = data;
    });
  }

}
