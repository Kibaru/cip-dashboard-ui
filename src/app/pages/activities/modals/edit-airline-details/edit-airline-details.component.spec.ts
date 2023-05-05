import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAirlineDetailsComponent } from './edit-airline-details.component';

describe('EditAirlineDetailsComponent', () => {
  let component: EditAirlineDetailsComponent;
  let fixture: ComponentFixture<EditAirlineDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAirlineDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAirlineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
