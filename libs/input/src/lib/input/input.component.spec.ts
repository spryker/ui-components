import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import { InputComponent } from './input.component';
import { ApplyAttrsDirective } from '@spryker-ui/utils';

describe('InputComponent', () => {
  @Component({
    selector: 'test',
    template: `
      <spy-input
        [placeholder]="placeholder"
        [name]="name"
        [value]="value"
        [type]="type"
        [readOnly]="readOnly"
        [disabled]="disabled"
        [suffix]="suffix"
        [prefix]="prefix"
        [attrs]="attrs"
        (valueChange)="changeSpy()"
      ></spy-input>
    `,
  })
  class TestComponent {
    placeholder: any;
    name: any;
    value: any;
    type: any;
    readOnly: any;
    disabled: any;
    prefix: any;
    suffix: any;
    attrs: any;
    changeSpy = jest.fn();
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent, TestComponent, ApplyAttrsDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('template must render input with [nz-input] from Ant Design inside nz-input-group component', () => {
    const inputGroupElem = fixture.debugElement.query(By.css('nz-input-group'));
    expect(inputGroupElem).toBeTruthy();

    const inputElem = inputGroupElem.query(By.css('input[nz-input]'));
    expect(inputElem).toBeTruthy();
  });

  describe('Inputs must be bound to internal input', () => {
    it('should bind placeholder to placeholder of input', () => {
      const inputElem = fixture.debugElement.query(By.css('input'));
      const mockedPlaceholder = 'test placeholder';

      component.placeholder = mockedPlaceholder;

      fixture.detectChanges();

      expect(inputElem.properties.placeholder).toBe(mockedPlaceholder);
    });

    it('should bind value to value of input', () => {
      const inputElem = fixture.debugElement.query(By.css('input'));
      const mockedValue = 'test value';

      component.value = mockedValue;

      fixture.detectChanges();

      expect(inputElem.properties.value).toBe(mockedValue);
    });

    it('should bind name to name of input', () => {
      const inputElem = fixture.debugElement.query(By.css('input'));
      const mockedName = 'test name';

      component.name = mockedName;

      fixture.detectChanges();

      expect(inputElem.properties.name).toBe(mockedName);
    });

    it('should bind type to type of input', () => {
      const inputElem = fixture.debugElement.query(By.css('input'));
      const mockedType = 'text';

      component.type = mockedType;

      fixture.detectChanges();

      expect(inputElem.properties.type).toBe(mockedType);
    });

    it('should bind disabled to disabled of input', () => {
      const inputElem = fixture.debugElement.query(By.css('input'));

      component.disabled = true;

      fixture.detectChanges();

      expect(inputElem.properties.disabled).toBe(true);
    });

    it('should bind readOnly to readOnly of input', () => {
      const inputElem = fixture.debugElement.query(By.css('input'));

      component.readOnly = true;

      fixture.detectChanges();

      expect(inputElem.properties.readOnly).toBe(true);
    });
  });

  describe('Input attrs', () => {
    it('should parse and bind `attrs` to the appropriate attributes of input', () => {
      const inputElem = fixture.debugElement.query(By.css('input'));

      component.attrs = {
        test: 'attr1',
        test2: 'attr2',
      };

      fixture.detectChanges();

      expect(inputElem.attributes['test']).toBe('attr1');
      expect(inputElem.attributes['test2']).toBe('attr2');
    });

    it('should `attrs` updates appropriate attributes when changed', () => {
      const inputElem = fixture.debugElement.query(By.css('input'));

      component.attrs = {
        test: 'attr1',
        test2: 'attr2',
      };

      fixture.detectChanges();

      component.attrs = {
        test: 'attr6',
      };

      fixture.detectChanges();

      expect(inputElem.attributes['test']).toBe('attr6');
      expect(inputElem.attributes['test2']).toBe(null);

      component.attrs = null;

      fixture.detectChanges();

      expect(inputElem.attributes['test']).toBe(null);
    });
  });

  describe('Input prefix and suffix must be bound to nz-input-group', () => {
    it('should bind suffix to nzSuffix of nz-input-group', () => {
      const inputElem = fixture.debugElement.query(By.css('nz-input-group'));
      const mockedSuffix = 'suffix';

      component.suffix = mockedSuffix;

      fixture.detectChanges();

      expect(inputElem.properties.nzSuffix).toBe(mockedSuffix);
    });

    it('should bind suffix to nzSuffix of nz-input-group', () => {
      const inputElem = fixture.debugElement.query(By.css('nz-input-group'));
      const mockedPrefix = 'prefix';

      component.prefix = mockedPrefix;

      fixture.detectChanges();

      expect(inputElem.properties.nzPrefix).toBe(mockedPrefix);
    });
  });

  describe('valueChange', () => {
    it('should trigger change callback when input is changed', () => {
      const inputElem = fixture.debugElement.query(By.css('input'));

      inputElem.triggerEventHandler('input', {});
      fixture.detectChanges();

      expect(component.changeSpy).toHaveBeenCalled();
    });
  });
});
