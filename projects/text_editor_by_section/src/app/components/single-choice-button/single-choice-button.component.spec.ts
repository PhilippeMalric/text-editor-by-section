import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceButtonComponent } from './single-choice-button.component';

describe('UpvoteButtonComponent', () => {
  let component: SingleChoiceButtonComponent;
  let fixture: ComponentFixture<SingleChoiceButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleChoiceButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleChoiceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
