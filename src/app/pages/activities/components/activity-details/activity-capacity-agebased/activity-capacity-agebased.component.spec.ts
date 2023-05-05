import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCapacityAgebasedComponent } from './activity-capacity-agebased.component';

describe('ActivityCapacityAgebasedComponent', () => {
  let component: ActivityCapacityAgebasedComponent;
  let fixture: ComponentFixture<ActivityCapacityAgebasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCapacityAgebasedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCapacityAgebasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
