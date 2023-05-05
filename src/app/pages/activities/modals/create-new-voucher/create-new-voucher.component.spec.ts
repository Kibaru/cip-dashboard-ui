import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewVoucherComponent } from './create-new-voucher.component';

describe('CreateNewVoucherComponent', () => {
  let component: CreateNewVoucherComponent;
  let fixture: ComponentFixture<CreateNewVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewVoucherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
