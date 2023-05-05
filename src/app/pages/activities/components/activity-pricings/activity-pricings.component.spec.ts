import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPricingsComponent } from './activity-pricings.component';

describe('ActivityPricingsComponent', () => {
  let component: ActivityPricingsComponent;
  let fixture: ComponentFixture<ActivityPricingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityPricingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPricingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
