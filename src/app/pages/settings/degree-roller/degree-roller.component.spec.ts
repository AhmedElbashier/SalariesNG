import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeRollerComponent } from './degree-roller.component';

describe('DegreeRollerComponent', () => {
  let component: DegreeRollerComponent;
  let fixture: ComponentFixture<DegreeRollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegreeRollerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreeRollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
