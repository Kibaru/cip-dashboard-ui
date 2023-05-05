import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAgentVoucherComponent } from './verify-agent-voucher.component';

describe('VerifyAgentVoucherComponent', () => {
  let component: VerifyAgentVoucherComponent;
  let fixture: ComponentFixture<VerifyAgentVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyAgentVoucherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyAgentVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
