import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicPayrollComponent } from './academic-payroll.component';

describe('AcademicPayrollComponent', () => {
  let component: AcademicPayrollComponent;
  let fixture: ComponentFixture<AcademicPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicPayrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
