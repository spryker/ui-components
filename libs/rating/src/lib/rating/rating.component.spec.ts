import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingComponent } from './rating.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RatingComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  let rating: number;
  let maxRating: number;
  let allowHalf: boolean;
  let readOnly: boolean;
  const ratingChangeSpy = jest.fn();

  @Component({
    selector: 'spy-test',
    template: `
      <spy-rating
        [rating]="rating"
        [maxRating]="maxRating"
        [allowHalf]="allowHalf"
        [readOnly]="readOnly"
        (ratingChange)="ratingChange($event)"
      ></spy-rating>
    `,
  })
  class TestComponent {
    rating = rating;
    maxRating = maxRating;
    allowHalf = allowHalf;
    readOnly = readOnly;

    ratingChange(event: number) {
      ratingChangeSpy(event);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, RatingComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);

    rating = 3.5;
    maxRating = 10;
    allowHalf = true;
    readOnly = false;

    component = fixture.componentInstance;
    component.rating = rating;
    component.maxRating = maxRating;
    component.allowHalf = allowHalf;
    component.readOnly = readOnly;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render rating control', () => {
    const controlEl = fixture.debugElement.query(By.css('.spy-rating-control'));
    expect(controlEl).toBeTruthy();
    expect(controlEl.properties.ngModel).toBe(rating);
    expect(controlEl.properties.nzCount).toBe(maxRating);
    expect(controlEl.properties.nzAllowHalf).toBe(allowHalf);
    expect(controlEl.properties.nzDisabled).toBe(readOnly);
  });

  it('should trigger rating change', () => {
    const controlEl = fixture.debugElement.query(By.css('.spy-rating-control'));
    expect(controlEl).toBeTruthy();
    const newRating = 3;
    controlEl.triggerEventHandler('ngModelChange', newRating);
    expect(ratingChangeSpy).toHaveBeenCalledWith(newRating);
  });
});
