import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampSignComponent } from './stamp-sign.component';

describe('StampSignComponent', () => {
  let component: StampSignComponent;
  let fixture: ComponentFixture<StampSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampSignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
