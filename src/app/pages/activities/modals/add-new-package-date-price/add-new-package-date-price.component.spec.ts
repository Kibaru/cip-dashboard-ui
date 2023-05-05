import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPackageDatePriceComponent } from './add-new-package-date-price.component';

describe('AddNewPackageDatePriceComponent', () => {
  let component: AddNewPackageDatePriceComponent;
  let fixture: ComponentFixture<AddNewPackageDatePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewPackageDatePriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPackageDatePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
