import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTypeSelectorComponent } from './activity-type-selector.component';

describe('ActivityTypeSelectorComponent', () => {
  let component: ActivityTypeSelectorComponent;
  let fixture: ComponentFixture<ActivityTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityTypeSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
