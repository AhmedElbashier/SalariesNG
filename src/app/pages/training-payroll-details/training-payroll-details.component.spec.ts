import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPayrollDetailsComponent } from './training-payroll-details.component';

describe('TrainingPayrollDetailsComponent', () => {
  let component: TrainingPayrollDetailsComponent;
  let fixture: ComponentFixture<TrainingPayrollDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingPayrollDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingPayrollDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
