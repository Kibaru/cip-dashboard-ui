import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVouchersTableComponent } from './user-vouchers-table.component';

describe('UserVouchersTableComponent', () => {
  let component: UserVouchersTableComponent;
  let fixture: ComponentFixture<UserVouchersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVouchersTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserVouchersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
