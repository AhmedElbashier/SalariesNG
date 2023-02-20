import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstSocialInsuranceComponent } from './first-social-insurance.component';

describe('FirstSocialInsuranceComponent', () => {
  let component: FirstSocialInsuranceComponent;
  let fixture: ComponentFixture<FirstSocialInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstSocialInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstSocialInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
