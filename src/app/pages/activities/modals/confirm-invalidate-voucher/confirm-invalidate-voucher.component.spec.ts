import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmInvalidateVoucherComponent } from './confirm-invalidate-voucher.component';

describe('ConfirmInvalidateVoucherComponent', () => {
  let component: ConfirmInvalidateVoucherComponent;
  let fixture: ComponentFixture<ConfirmInvalidateVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmInvalidateVoucherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmInvalidateVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
