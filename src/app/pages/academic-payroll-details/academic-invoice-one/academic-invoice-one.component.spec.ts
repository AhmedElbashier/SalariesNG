import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicInvoiceOneComponent } from './academic-invoice-one.component';

describe('AcademicInvoiceOneComponent', () => {
  let component: AcademicInvoiceOneComponent;
  let fixture: ComponentFixture<AcademicInvoiceOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicInvoiceOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicInvoiceOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
