import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInvoiceOneComponent } from './admin-invoice-one.component';

describe('AdminInvoiceOneComponent', () => {
  let component: AdminInvoiceOneComponent;
  let fixture: ComponentFixture<AdminInvoiceOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInvoiceOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInvoiceOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
