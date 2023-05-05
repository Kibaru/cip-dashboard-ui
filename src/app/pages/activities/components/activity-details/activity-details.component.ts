import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImagePickerConf } from 'ngp-image-picker';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {

  @Input()
  activity!: any;
  initialImage: any = '';
  imageEncoding: string = '';
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

  ngOnInit(): void {

    this.dataStore.setChosenActivity(this.activity);
    console.log(this.activity);
  }

  updateName() {

    var names = {
      name : this.activity.name,
      desc : this.activity.desc,
      more_details_text : this.activity.more_details_text,
      more_details_url : this.activity.more_details_url,
      second_details_text : this.activity.second_details_text,
      second_details_url : this.activity.second_details_url,
      add_to_cart_subtext : this.activity.add_to_cart_subtext
    };

    this.ngxService.start();
    this.api.updateNames(names,this.activity.id )
      .subscribe((data)=>{
        this.api.getActivity(this.activity.id )
          .subscribe((data: any) => {
            console.log(data);
            // this.dataStore.setRestaurants(data);
            this.activity = data;
            this.dataStore.setChosenActivityId(this.activity.id);
            this.dataStore.setChosenActivityPhotos(this.activity.photos);
            this.dataStore.setChosenActivityAvailabilities(this.activity.availabilities);
            this.ngxService.stop();
            return;
          });
      });
  }

  uploadPhoto() {

    this.api.saveNewPhoto(this.imageEncoding, this.activity.id)
      .subscribe((data) => {
        // console.log(data);
      });


    // console.log(this.imageEncoding);
  }

  onImageChanged(event: any) {

    this.imageEncoding = event;
  }

}
