import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCast } from './all-cast';

describe('AllCast', () => {
  let component: AllCast;
  let fixture: ComponentFixture<AllCast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
