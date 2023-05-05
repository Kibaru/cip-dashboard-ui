import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityAvailabilityComponent } from './activity-availability.component';

describe('ActivityAvailabilityComponent', () => {
  let component: ActivityAvailabilityComponent;
  let fixture: ComponentFixture<ActivityAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityAvailabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
