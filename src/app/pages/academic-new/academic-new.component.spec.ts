import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicNewComponent } from './academic-new.component';

describe('AcademicNewComponent', () => {
  let component: AcademicNewComponent;
  let fixture: ComponentFixture<AcademicNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
