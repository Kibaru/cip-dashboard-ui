import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSingularPricingRangeComponent } from './add-new-singular-pricing-range.component';

describe('AddNewSingularPricingRangeComponent', () => {
  let component: AddNewSingularPricingRangeComponent;
  let fixture: ComponentFixture<AddNewSingularPricingRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewSingularPricingRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSingularPricingRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
