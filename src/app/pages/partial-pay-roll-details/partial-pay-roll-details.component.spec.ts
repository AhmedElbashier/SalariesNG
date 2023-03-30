import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialPayRollDetailsComponent } from './partial-pay-roll-details.component';

describe('PartialPayRollDetailsComponent', () => {
  let component: PartialPayRollDetailsComponent;
  let fixture: ComponentFixture<PartialPayRollDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartialPayRollDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartialPayRollDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
