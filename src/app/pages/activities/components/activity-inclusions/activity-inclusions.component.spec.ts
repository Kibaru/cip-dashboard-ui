import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityInclusionsComponent } from './activity-inclusions.component';

describe('ActivityInclusionsComponent', () => {
  let component: ActivityInclusionsComponent;
  let fixture: ComponentFixture<ActivityInclusionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityInclusionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityInclusionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
