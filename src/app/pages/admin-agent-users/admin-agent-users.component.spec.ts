import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgentUsersComponent } from './admin-agent-users.component';

describe('AdminAgentUsersComponent', () => {
  let component: AdminAgentUsersComponent;
  let fixture: ComponentFixture<AdminAgentUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAgentUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAgentUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
