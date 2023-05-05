import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPackagesComponent } from './activity-packages.component';

describe('ActivityPackagesComponent', () => {
  let component: ActivityPackagesComponent;
  let fixture: ComponentFixture<ActivityPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityPackagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
