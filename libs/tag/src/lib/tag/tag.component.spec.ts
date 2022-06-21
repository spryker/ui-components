import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagComponent } from './tag.component';
import { Component, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TagComponent', () => {
  @Component({
    template: `<spy-tag
      (onRemove)="onRemoveButtonClick($event)"
      [disabled]="disabled"
      [removable]="removable"
      >{{ label }}</spy-tag
    >`,
  })
  class TestComponent {
    label = 'This is a tag';
    disabled = false;
    removable = true;
    clicked = false;
    onRemoveButtonClick = jasmine.createSpy('on remove');
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let labelElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TagComponent, TestComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    labelElement = fixture.debugElement.query(By.css('.spy-tag__label'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Tag label', () => {
    it('should be rendered', () => {
      expect(labelElement).toBeTruthy();
    });
    it('should render the input label', () => {
      expect(labelElement.nativeElement.textContent).toBe(component.label);
    });
    it('should update the label to "Something else"', () => {
      const newLabel = 'Something else';
      component.label = newLabel;
      fixture.detectChanges();
      expect(labelElement.nativeElement.textContent).toBe(newLabel);
    });
  });

  describe('TagComponent', () => {
    it('should not have "spy-tag-disabled" when not disabled', () => {
      const tagElement = fixture.debugElement.query(By.css('.spy-tag'));
      expect([false, undefined]).toContain(
        tagElement.classes['spy-tag-disabled'],
      );
    });
    it('should have "spy-tag-disabled" when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      const tagElement = fixture.debugElement.query(By.css('.spy-tag'));
      expect(tagElement.classes['spy-tag-disabled']).toBe(true);
    });
    it('should have Input("disabled") bind to the disabled of the button when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      const buttonElement = fixture.debugElement.query(
        By.css('.spy-tag__remove-button-icon'),
      );
      expect(buttonElement.properties.disabled).toBe(true);
    });
  });

  describe("TagComponent's remove button", () => {
    it('should be rendered when removable', () => {
      const buttonElement = fixture.debugElement.query(
        By.css('.spy-tag__remove-button-icon'),
      );
      expect(buttonElement).toBeTruthy();
    });
    it('should be not rendered when not removable', () => {
      component.removable = false;
      fixture.detectChanges();
      const buttonElement = fixture.debugElement.query(
        By.css('.spy-tag__remove-button-icon'),
      );
      expect(buttonElement).toBeNull();
    });
    it('should trigger clickEvent when clicked', () => {
      const buttonElement = fixture.nativeElement.querySelector(
        '.spy-tag__remove-button-icon',
      );
      buttonElement.click();
      expect(component.onRemoveButtonClick).toHaveBeenCalled();
    });
    it('should not clickable when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      const buttonElement = fixture.nativeElement.querySelector(
        '.spy-tag__remove-button-icon',
      );
      buttonElement.click();
      expect(component.onRemoveButtonClick).not.toHaveBeenCalled();
    });
  });
});
