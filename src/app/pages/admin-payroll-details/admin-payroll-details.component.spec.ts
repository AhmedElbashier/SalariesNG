import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPayrollDetailsComponent } from './admin-payroll-details.component';

describe('AdminPayrollDetailsComponent', () => {
  let component: AdminPayrollDetailsComponent;
  let fixture: ComponentFixture<AdminPayrollDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPayrollDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPayrollDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
