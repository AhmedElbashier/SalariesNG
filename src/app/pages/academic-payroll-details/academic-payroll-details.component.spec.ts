import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicPayrollDetailsComponent } from './academic-payroll-details.component';

describe('AcademicPayrollDetailsComponent', () => {
  let component: AcademicPayrollDetailsComponent;
  let fixture: ComponentFixture<AcademicPayrollDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicPayrollDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicPayrollDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
