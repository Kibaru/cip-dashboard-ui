import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSingularPricingDateComponent } from './add-new-singular-pricing-date.component';

describe('AddNewSingularPricingDateComponent', () => {
  let component: AddNewSingularPricingDateComponent;
  let fixture: ComponentFixture<AddNewSingularPricingDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewSingularPricingDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSingularPricingDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
