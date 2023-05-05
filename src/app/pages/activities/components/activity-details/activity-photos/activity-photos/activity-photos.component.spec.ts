import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPhotosComponent } from './activity-photos.component';

describe('ActivityPhotosComponent', () => {
  let component: ActivityPhotosComponent;
  let fixture: ComponentFixture<ActivityPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityPhotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
