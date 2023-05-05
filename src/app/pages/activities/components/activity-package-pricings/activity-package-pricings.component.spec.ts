import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPackagePricingsComponent } from './activity-package-pricings.component';

describe('ActivityPackagePricingsComponent', () => {
  let component: ActivityPackagePricingsComponent;
  let fixture: ComponentFixture<ActivityPackagePricingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityPackagePricingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPackagePricingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
