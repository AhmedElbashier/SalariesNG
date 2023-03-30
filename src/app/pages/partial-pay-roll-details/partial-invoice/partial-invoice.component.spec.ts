import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialInvoiceComponent } from './partial-invoice.component';

describe('PartialInvoiceComponent', () => {
  let component: PartialInvoiceComponent;
  let fixture: ComponentFixture<PartialInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartialInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartialInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
