import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificIndividualDatesComponent } from './specific-individual-dates.component';

describe('SpecificIndividualDatesComponent', () => {
  let component: SpecificIndividualDatesComponent;
  let fixture: ComponentFixture<SpecificIndividualDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificIndividualDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificIndividualDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
