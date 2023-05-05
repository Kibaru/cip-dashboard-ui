import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewInclusionComponent } from './add-new-inclusion.component';

describe('AddNewInclusionComponent', () => {
  let component: AddNewInclusionComponent;
  let fixture: ComponentFixture<AddNewInclusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewInclusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewInclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
