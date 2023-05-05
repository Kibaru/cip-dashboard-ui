import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityEnhancementsComponent } from './activity-enhancements.component';

describe('ActivityEnhancementsComponent', () => {
  let component: ActivityEnhancementsComponent;
  let fixture: ComponentFixture<ActivityEnhancementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityEnhancementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityEnhancementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
