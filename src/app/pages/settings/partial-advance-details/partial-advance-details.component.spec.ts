import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialAdvanceDetailsComponent } from './partial-advance-details.component';

describe('PartialAdvanceDetailsComponent', () => {
  let component: PartialAdvanceDetailsComponent;
  let fixture: ComponentFixture<PartialAdvanceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartialAdvanceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartialAdvanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
