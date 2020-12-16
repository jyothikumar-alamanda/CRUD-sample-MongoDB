import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRoot } from './EmployeeRoot';

describe('EmployeeRoot', () => {
  let component: EmployeeRoot;
  let fixture: ComponentFixture<EmployeeRoot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeRoot ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRoot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
