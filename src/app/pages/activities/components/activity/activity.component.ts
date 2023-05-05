import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activity : any = null;
  activity_id : any;
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
    
    this.ngxService.start();
    this.activity_id = this.route.snapshot.paramMap.get('activity_id') ;
    
    this.api.getActivity(this.activity_id )
      .subscribe((data: any) => {
        console.log(data);
        // this.dataStore.setRestaurants(data);
        this.activity = data;
        this.dataStore.setChosenActivityId(this.activity_id);
        this.dataStore.setChosenActivityPhotos(this.activity.photos);
        this.dataStore.setChosenActivityAvailabilities(this.activity.availabilities);
        this.ngxService.stop();
        return;
      });
  }

}
