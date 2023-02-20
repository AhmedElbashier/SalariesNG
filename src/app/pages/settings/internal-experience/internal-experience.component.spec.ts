import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalExperienceComponent } from './internal-experience.component';

describe('InternalExperienceComponent', () => {
  let component: InternalExperienceComponent;
  let fixture: ComponentFixture<InternalExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
