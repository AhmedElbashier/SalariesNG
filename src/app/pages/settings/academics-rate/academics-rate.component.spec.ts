import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicsRateComponent } from './academics-rate.component';

describe('AcademicsRateComponent', () => {
  let component: AcademicsRateComponent;
  let fixture: ComponentFixture<AcademicsRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicsRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicsRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
