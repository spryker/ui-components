import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  @Component({
    selector: 'test-component',
    template: `
      <spy-select
        [options]="options"
        [placeholder]="placeholder"
        [showSelectAll]="showSelectAll"
        [selectAllTitle]="selectAllTitle"
        [search]="search"
        [multiple]="multiple"
        [name]="name"
        [value]="value"
        [disabled]="disabled"
        (valueChange)="changeSpy($event)"
      ></spy-select>
    `,
  })
  class TestComponent {
    options: any = [];
    placeholder: any;
    showSelectAll: any;
    selectAllTitle: any;
    search: any;
    multiple: any;
    name: any;
    value: any = '';
    disabled: any;
    mappedOptions: any = [];
    changeSpy = jest.fn();
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent, TestComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  }));

  it('template must render nz-select from Ant Design and default select', () => {
    const nzSelectElem = fixture.debugElement.query(By.css('nz-select'));
    const selectElem = fixture.debugElement.query(By.css('select'));

    expect(nzSelectElem).toBeTruthy();
    expect(selectElem).toBeTruthy();
  });

  describe('Input disabled and multiple must be bound to select', () => {
    it('should bind disabled to disabled of default select', () => {
      const selectElem = fixture.debugElement.query(By.css('select'));
      const mockedValue = true;

      component.disabled = mockedValue;

      fixture.detectChanges();

      expect(selectElem.properties.disabled).toBe(mockedValue);
    });

    it('should bind multiple to multiple of default select', () => {
      const selectElem = fixture.debugElement.query(By.css('select'));
      const mockedValue = true;

      component.multiple = mockedValue;

      fixture.detectChanges();

      expect(selectElem.properties.multiple).toBe(mockedValue);
    });

    it('should bind name to name of default select', () => {
      const selectElem = fixture.debugElement.query(By.css('select'));
      const mockedValue = 'mockedData';

      component.name = mockedValue;

      fixture.detectChanges();

      expect(selectElem.properties.name).toBe(mockedValue);
    });
  });

  describe('Inputs must be bound to nz-select', () => {
    it('should bind value to ngModel of nz-select', () => {
      const nzSelectElem = fixture.debugElement.query(By.css('nz-select'));
      const mockedValue = 'mockedData';

      component.value = mockedValue;

      fixture.detectChanges();

      expect(nzSelectElem.properties.ngModel).toBe(mockedValue);
    });

    it('should bind search to nzShowSearch of nz-select', () => {
      const nzSelectElem = fixture.debugElement.query(By.css('nz-select'));
      const mockedValue = true;

      component.search = mockedValue;

      fixture.detectChanges();

      expect(nzSelectElem.properties.nzShowSearch).toBe(mockedValue);
    });

    it('should bind disabled to nzDisabled of nz-select', () => {
      const nzSelectElem = fixture.debugElement.query(By.css('nz-select'));
      const mockedValue = true;

      component.disabled = mockedValue;

      fixture.detectChanges();

      expect(nzSelectElem.properties.nzDisabled).toBe(mockedValue);
    });

    it('should bind multiple to nzMode of nz-select', () => {
      const nzSelectElem = fixture.debugElement.query(By.css('nz-select'));
      const mockedValue = true;
      const expectedResult = 'tags';

      component.multiple = mockedValue;

      fixture.detectChanges();

      expect(nzSelectElem.properties.nzMode).toBe(expectedResult);
    });

    it('should bind placeholder to nzPlaceHolder of nz-select', () => {
      const nzSelectElem = fixture.debugElement.query(By.css('nz-select'));
      const mockedValue = 'mockedData';

      component.placeholder = mockedValue;

      fixture.detectChanges();

      expect(nzSelectElem.properties.nzPlaceHolder).toBe(mockedValue);
    });
  });

  it('options array must be correctly mapped and create each option of the dropdown', () => {
    const optionsArray = ['123'];
    const expectedValue = '123';

    component.options = optionsArray;

    fixture.detectChanges();

    const nzOption = fixture.debugElement.query(By.css('nz-option'));

    expect(nzOption.properties.nzValue).toBe(expectedValue);
    expect(nzOption.properties.nzLabel).toBe(expectedValue);
  });

  it('valueChange must be emitted every time ngModelChange emits from nz-select', () => {
    const nzSelectElem = fixture.debugElement.query(By.css('nz-select'));

    nzSelectElem.triggerEventHandler('ngModelChange', []);
    fixture.detectChanges();

    expect(component.changeSpy).toHaveBeenCalled();
  });

  describe('SelectComponent methods', () => {
    let selectComponent: SelectComponent;
    let nvFixture: ComponentFixture<SelectComponent>;

    beforeEach(() => {
      nvFixture = TestBed.createComponent(SelectComponent);
      selectComponent = nvFixture.componentInstance;
    });

    it('options array with numbers or strings should be correctly mapped', () => {
      const optionsArray = [123, '123'];
      const expectedValue = [
        { value: 123, label: 123 },
        { value: '123', label: '123' },
      ];

      selectComponent.options = optionsArray;
      nvFixture.detectChanges();

      expect(selectComponent.mappedOptions).toEqual(expectedValue);
    });

    it('Select All correctly triggers selection of all items', () => {
      const optionsArray = [123, 234, 345];
      const expectedValue = [123, 234, 345];

      selectComponent.multiple = true;
      selectComponent.showSelectAll = true;
      selectComponent.selectAllTitle = 'Select All';
      selectComponent.options = optionsArray;
      nvFixture.detectChanges();

      const nzSelectElem = nvFixture.debugElement.query(By.css('nz-select'));

      nzSelectElem.triggerEventHandler('ngModelChange', ['select-all']);
      nvFixture.detectChanges();

      expect(selectComponent.value).toEqual(expectedValue);
    });
  });
});
