import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicEmpComponent } from './academic-emp.component';

describe('AcademicEmpComponent', () => {
  let component: AcademicEmpComponent;
  let fixture: ComponentFixture<AcademicEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
