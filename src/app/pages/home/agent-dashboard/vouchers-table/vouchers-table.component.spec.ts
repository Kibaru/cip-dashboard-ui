import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersTableComponent } from './vouchers-table.component';

describe('VouchersTableComponent', () => {
  let component: VouchersTableComponent;
  let fixture: ComponentFixture<VouchersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VouchersTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VouchersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
