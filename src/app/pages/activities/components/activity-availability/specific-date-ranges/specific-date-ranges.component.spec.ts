import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificDateRangesComponent } from './specific-date-ranges.component';

describe('SpecificDateRangesComponent', () => {
  let component: SpecificDateRangesComponent;
  let fixture: ComponentFixture<SpecificDateRangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificDateRangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificDateRangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
