import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImagePickerConf } from 'ngp-image-picker';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api/api.service';
import { DataStoreService } from 'src/app/service/data-store/data-store.service';

@Component({
  selector: 'app-activity-photos',
  templateUrl: './activity-photos.component.html',
  styleUrls: ['./activity-photos.component.css']
})
export class ActivityPhotosComponent implements OnInit {

  activity_id!: any;
  activity_photos!: any;
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

    this.dataStore.chosen_activity_photos.subscribe((data) => {
      this.activity_photos = data;
    });

    this.dataStore.chosen_activity_id.subscribe((data) => {
      this.activity_id = data;
    });


  }

  updateName() {

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

  deletePhoto(photo_id : number) {

    this.ngxService.start();
    this.api.deletePhoto(photo_id)
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

}
