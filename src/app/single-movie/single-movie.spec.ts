import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMovie } from './single-movie';

describe('SingleMovie', () => {
  let component: SingleMovie;
  let fixture: ComponentFixture<SingleMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleMovie],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleMovie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
