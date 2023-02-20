import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPayrollComponent } from './training-payroll.component';

describe('TrainingPayrollComponent', () => {
  let component: TrainingPayrollComponent;
  let fixture: ComponentFixture<TrainingPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingPayrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
