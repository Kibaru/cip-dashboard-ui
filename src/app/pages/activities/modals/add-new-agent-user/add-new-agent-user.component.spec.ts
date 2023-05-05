import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAgentUserComponent } from './add-new-agent-user.component';

describe('AddNewAgentUserComponent', () => {
  let component: AddNewAgentUserComponent;
  let fixture: ComponentFixture<AddNewAgentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewAgentUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewAgentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
