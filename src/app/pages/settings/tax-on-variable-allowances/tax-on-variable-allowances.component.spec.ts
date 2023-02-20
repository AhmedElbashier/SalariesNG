import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxOnVariableAllowancesComponent } from './tax-on-variable-allowances.component';

describe('TaxOnVariableAllowancesComponent', () => {
  let component: TaxOnVariableAllowancesComponent;
  let fixture: ComponentFixture<TaxOnVariableAllowancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxOnVariableAllowancesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxOnVariableAllowancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
