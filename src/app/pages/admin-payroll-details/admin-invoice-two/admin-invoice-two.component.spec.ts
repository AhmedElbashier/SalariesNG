import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInvoiceTwoComponent } from './admin-invoice-two.component';

describe('AdminInvoiceTwoComponent', () => {
  let component: AdminInvoiceTwoComponent;
  let fixture: ComponentFixture<AdminInvoiceTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInvoiceTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInvoiceTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
