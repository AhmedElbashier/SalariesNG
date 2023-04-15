import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialAdvanceComponent } from './partial-advance.component';

describe('PartialAdvanceComponent', () => {
  let component: PartialAdvanceComponent;
  let fixture: ComponentFixture<PartialAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartialAdvanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartialAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
