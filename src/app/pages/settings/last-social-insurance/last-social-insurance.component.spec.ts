import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSocialInsuranceComponent } from './last-social-insurance.component';

describe('LastSocialInsuranceComponent', () => {
  let component: LastSocialInsuranceComponent;
  let fixture: ComponentFixture<LastSocialInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastSocialInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastSocialInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
