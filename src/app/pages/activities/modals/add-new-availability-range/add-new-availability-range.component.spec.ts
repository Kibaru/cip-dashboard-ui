import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAvailabilityRangeComponent } from './add-new-availability-range.component';

describe('AddNewAvailabilityRangeComponent', () => {
  let component: AddNewAvailabilityRangeComponent;
  let fixture: ComponentFixture<AddNewAvailabilityRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewAvailabilityRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAvailabilityRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
