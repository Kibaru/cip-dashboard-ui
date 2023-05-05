import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledDaysComponent } from './scheduled-days.component';

describe('ScheduledDaysComponent', () => {
  let component: ScheduledDaysComponent;
  let fixture: ComponentFixture<ScheduledDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
