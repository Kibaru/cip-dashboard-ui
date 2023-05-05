import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSingularAgebasedPricingRangeComponent } from './add-new-singular-agebased-pricing-range.component';

describe('AddNewSingularAgebasedPricingRangeComponent', () => {
  let component: AddNewSingularAgebasedPricingRangeComponent;
  let fixture: ComponentFixture<AddNewSingularAgebasedPricingRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewSingularAgebasedPricingRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSingularAgebasedPricingRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
