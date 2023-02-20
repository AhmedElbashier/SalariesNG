import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAndResearchComponent } from './books-and-research.component';

describe('BooksAndResearchComponent', () => {
  let component: BooksAndResearchComponent;
  let fixture: ComponentFixture<BooksAndResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksAndResearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksAndResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
