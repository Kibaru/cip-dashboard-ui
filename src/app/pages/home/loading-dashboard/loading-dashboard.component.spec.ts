import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDashboardComponent } from './loading-dashboard.component';

describe('LoadingDashboardComponent', () => {
  let component: LoadingDashboardComponent;
  let fixture: ComponentFixture<LoadingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
