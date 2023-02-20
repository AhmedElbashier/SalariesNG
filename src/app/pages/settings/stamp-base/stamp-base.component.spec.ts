import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampBaseComponent } from './stamp-base.component';

describe('StampBaseComponent', () => {
  let component: StampBaseComponent;
  let fixture: ComponentFixture<StampBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
