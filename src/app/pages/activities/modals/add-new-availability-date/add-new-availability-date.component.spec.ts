import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAvailabilityDateComponent } from './add-new-availability-date.component';

describe('AddNewAvailabilityDateComponent', () => {
  let component: AddNewAvailabilityDateComponent;
  let fixture: ComponentFixture<AddNewAvailabilityDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewAvailabilityDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAvailabilityDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
