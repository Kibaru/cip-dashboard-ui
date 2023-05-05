import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCapacitySingularComponent } from './activity-capacity-singular.component';

describe('ActivityCapacitySingularComponent', () => {
  let component: ActivityCapacitySingularComponent;
  let fixture: ComponentFixture<ActivityCapacitySingularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCapacitySingularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCapacitySingularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
