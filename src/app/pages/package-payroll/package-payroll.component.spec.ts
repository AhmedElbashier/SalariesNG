import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagePayrollComponent } from './package-payroll.component';

describe('PackagePayrollComponent', () => {
  let component: PackagePayrollComponent;
  let fixture: ComponentFixture<PackagePayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagePayrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagePayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
