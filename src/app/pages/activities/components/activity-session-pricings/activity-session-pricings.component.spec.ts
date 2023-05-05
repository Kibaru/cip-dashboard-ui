import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySessionPricingsComponent } from './activity-session-pricings.component';

describe('ActivitySessionPricingsComponent', () => {
  let component: ActivitySessionPricingsComponent;
  let fixture: ComponentFixture<ActivitySessionPricingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitySessionPricingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySessionPricingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
