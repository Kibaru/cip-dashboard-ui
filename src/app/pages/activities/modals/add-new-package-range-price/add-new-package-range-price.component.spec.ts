import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPackageRangePriceComponent } from './add-new-package-range-price.component';

describe('AddNewPackageRangePriceComponent', () => {
  let component: AddNewPackageRangePriceComponent;
  let fixture: ComponentFixture<AddNewPackageRangePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewPackageRangePriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPackageRangePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
