import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAirlineComponent } from './add-new-airline.component';

describe('AddNewAirlineComponent', () => {
  let component: AddNewAirlineComponent;
  let fixture: ComponentFixture<AddNewAirlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewAirlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewAirlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
