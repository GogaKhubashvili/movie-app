import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleActor } from './single-actor';

describe('SingleActor', () => {
  let component: SingleActor;
  let fixture: ComponentFixture<SingleActor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleActor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleActor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
