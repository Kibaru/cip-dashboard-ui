import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityNewItemComponent } from './activity-new-item.component';

describe('ActivityNewItemComponent', () => {
  let component: ActivityNewItemComponent;
  let fixture: ComponentFixture<ActivityNewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityNewItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityNewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
