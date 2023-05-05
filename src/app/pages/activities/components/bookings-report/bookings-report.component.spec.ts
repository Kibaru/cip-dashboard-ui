import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsReportComponent } from './bookings-report.component';

describe('BookingsReportComponent', () => {
  let component: BookingsReportComponent;
  let fixture: ComponentFixture<BookingsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
