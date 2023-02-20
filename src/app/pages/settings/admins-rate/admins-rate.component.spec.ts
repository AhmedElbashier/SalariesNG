import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsRateComponent } from './admins-rate.component';

describe('AdminsRateComponent', () => {
  let component: AdminsRateComponent;
  let fixture: ComponentFixture<AdminsRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminsRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
