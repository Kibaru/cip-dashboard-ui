import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSingularAgebasedPricingDateComponent } from './add-new-singular-agebased-pricing-date.component';

describe('AddNewSingularAgebasedPricingDateComponent', () => {
  let component: AddNewSingularAgebasedPricingDateComponent;
  let fixture: ComponentFixture<AddNewSingularAgebasedPricingDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewSingularAgebasedPricingDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSingularAgebasedPricingDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
