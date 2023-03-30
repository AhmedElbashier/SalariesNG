import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicInvoiceTwoComponent } from './academic-invoice-two.component';

describe('AcademicInvoiceTwoComponent', () => {
  let component: AcademicInvoiceTwoComponent;
  let fixture: ComponentFixture<AcademicInvoiceTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicInvoiceTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicInvoiceTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
