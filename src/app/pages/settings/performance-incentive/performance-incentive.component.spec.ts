import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceIncentiveComponent } from './performance-incentive.component';

describe('PerformanceIncentiveComponent', () => {
  let component: PerformanceIncentiveComponent;
  let fixture: ComponentFixture<PerformanceIncentiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceIncentiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceIncentiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
