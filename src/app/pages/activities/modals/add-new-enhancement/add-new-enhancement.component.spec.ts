import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEnhancementComponent } from './add-new-enhancement.component';

describe('AddNewEnhancementComponent', () => {
  let component: AddNewEnhancementComponent;
  let fixture: ComponentFixture<AddNewEnhancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewEnhancementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewEnhancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
