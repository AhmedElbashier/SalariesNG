import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingInvoiceComponent } from './training-invoice.component';

describe('TrainingInvoiceComponent', () => {
  let component: TrainingInvoiceComponent;
  let fixture: ComponentFixture<TrainingInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
