import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagePayrollDetailsComponent } from './package-payroll-details.component';

describe('PackagePayrollDetailsComponent', () => {
  let component: PackagePayrollDetailsComponent;
  let fixture: ComponentFixture<PackagePayrollDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagePayrollDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagePayrollDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
