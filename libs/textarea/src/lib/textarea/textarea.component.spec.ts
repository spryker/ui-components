import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import { TextareaComponent } from './textarea.component';
import { ApplyAttrsDirective } from '@spryker/utils';

describe('TextareaComponent', () => {
  @Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'test-component',
    template: `
      <spy-textarea
        [placeholder]="placeholder"
        [name]="name"
        [value]="value"
        [disabled]="disabled"
        [attrs]="attrs"
        [rows]="rows"
        [cols]="cols"
        (valueChange)="changeSpy($event)"
      ></spy-textarea>
    `,
  })
  class TestComponent {
    placeholder: any;
    name: any;
    value: any;
    disabled: any;
    attrs: any;
    rows = 1;
    cols = 1;
    changeSpy = jest.fn();
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextareaComponent, TestComponent, ApplyAttrsDirective],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  }));

  it('template must render textarea with [nz-input] from Ant Design', () => {
    const textareaElem = fixture.debugElement.query(
      By.css('textarea[nz-input]'),
    );
    expect(textareaElem).toBeTruthy();
  });

  describe('Inputs must be bound to internal textarea', () => {
    it('should bind placeholder to placeholder of textarea', () => {
      const textareaElem = fixture.debugElement.query(By.css('textarea'));
      const mockedPlaceholder = 'test placeholder';

      component.placeholder = mockedPlaceholder;

      fixture.detectChanges();
      expect(textareaElem.attributes.placeholder).toBe(mockedPlaceholder);
    });

    it('should bind value to value of textarea', () => {
      const textareaElem = fixture.debugElement.query(By.css('textarea'));
      const mockedValue = 'test value';

      component.value = mockedValue;

      fixture.detectChanges();

      expect(textareaElem.properties.value).toBe(mockedValue);
    });

    it('should bind name to name attribute of textarea', () => {
      const textareaElem = fixture.debugElement.query(By.css('textarea'));
      const mockedName = 'test name';

      component.name = mockedName;

      fixture.detectChanges();

      expect(textareaElem.attributes.name).toBe(mockedName);
    });

    it('should bind disabled to disabled of textarea', () => {
      const textareaElem = fixture.debugElement.query(By.css('textarea'));

      component.disabled = true;

      fixture.detectChanges();

      expect(textareaElem.properties.disabled).toBe(true);
    });

    it('should bind rows to rows of textarea', () => {
      const textareaElem = fixture.debugElement.query(By.css('textarea'));
      const testValue = 2;

      component.rows = testValue;

      fixture.detectChanges();

      expect(textareaElem.properties.rows).toBe(testValue);
    });

    it('should bind cols to cols of textarea', () => {
      const textareaElem = fixture.debugElement.query(By.css('textarea'));
      const testValue = 2;

      component.cols = testValue;

      fixture.detectChanges();

      expect(textareaElem.properties.cols).toBe(testValue);
    });
  });

  describe('Input attrs', () => {
    it('should parse and bind `attrs` to the appropriate attributes of textarea', () => {
      const textareaElem = fixture.debugElement.query(By.css('textarea'));

      component.attrs = {
        test: 'attr1',
        test2: 'attr2',
      };

      fixture.detectChanges();

      expect(textareaElem.attributes['test']).toBe('attr1');
      expect(textareaElem.attributes['test2']).toBe('attr2');
    });

    it('should `attrs` updates appropriate attributes when changed', () => {
      const textareaElem = fixture.debugElement.query(By.css('textarea'));

      component.attrs = {
        test: 'attr1',
        test2: 'attr2',
      };

      fixture.detectChanges();

      component.attrs = {
        test: 'attr6',
      };

      fixture.detectChanges();

      expect(textareaElem.attributes['test']).toBe('attr6');
      expect(textareaElem.attributes['test2']).toBe(null);

      component.attrs = null;

      fixture.detectChanges();

      expect(textareaElem.attributes['test']).toBe(null);
    });
  });

  it('template must render textarea with [nzautosize] from Ant Design', () => {
    const textareaElem = fixture.debugElement.query(
      By.css('textarea[nzautosize]'),
    );
    expect(textareaElem).toBeTruthy();
  });
});
