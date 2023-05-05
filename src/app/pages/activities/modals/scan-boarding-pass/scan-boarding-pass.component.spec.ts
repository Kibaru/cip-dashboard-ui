import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanBoardingPassComponent } from './scan-boarding-pass.component';

describe('ScanBoardingPassComponent', () => {
  let component: ScanBoardingPassComponent;
  let fixture: ComponentFixture<ScanBoardingPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanBoardingPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanBoardingPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
