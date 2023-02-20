import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoanlIncomeTaxComponent } from './persoanl-income-tax.component';

describe('PersoanlIncomeTaxComponent', () => {
  let component: PersoanlIncomeTaxComponent;
  let fixture: ComponentFixture<PersoanlIncomeTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoanlIncomeTaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersoanlIncomeTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
