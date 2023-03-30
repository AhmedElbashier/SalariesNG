import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialPayRollComponent } from './partial-pay-roll.component';

describe('PartialPayRollComponent', () => {
  let component: PartialPayRollComponent;
  let fixture: ComponentFixture<PartialPayRollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartialPayRollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartialPayRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
