// tslint:disable: no-non-null-assertion
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

import { SelectComponent } from './select.component';
import { By } from '@angular/platform-browser';

describe('SelectComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    SelectComponent,
    {
      ngModule: {
        schemas: [NO_ERRORS_SCHEMA],
      },
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [testModule] });
  });

  it('template must render nz-select from Ant Design and default select', async () => {
    const host = await createComponent({}, true);
    const nzSelectElem = host.queryCss('nz-select');
    const selectElem = host.queryCss('select');

    expect(nzSelectElem).toBeTruthy();
    expect(selectElem).toBeTruthy();
  });

  describe('Input disabled and multiple must be bound to select', () => {
    it('should bind disabled to disabled of default select', async () => {
      const host = await createComponent({ disabled: true }, true);
      const selectElem = host.queryCss('select');

      expect(selectElem).toBeTruthy();
      expect(selectElem!.properties.disabled).toBe(true);
    });

    it('should bind multiple to multiple of default select', async () => {
      const host = await createComponent({ multiple: true }, true);
      const selectElem = host.queryCss('select');

      expect(selectElem).toBeTruthy();
      expect(selectElem!.properties.multiple).toBe(true);
    });

    it('should bind name to name of default select', async () => {
      const host = await createComponent({ name: 'mocked-name' }, true);
      const selectElem = host.queryCss('select');

      expect(selectElem).toBeTruthy();
      expect(selectElem!.properties.name).toBe('mocked-name');
    });
  });

  describe('@Input(value) affects ngModel of nz-select', () => {
    it('should be set when value exists in options', async () => {
      const host = await createComponent(
        { value: 'val1', options: ['val1', 'val2'] },
        true,
      );
      const nzSelectElem = host.queryCss('nz-select');

      expect(nzSelectElem).toBeTruthy();
      expect(nzSelectElem!.properties.ngModel).toBe('val1');
    });

    it('should NOT be set when value does not exist in options', async () => {
      const host = await createComponent(
        { value: 'val3', options: ['val1', 'val2'] },
        true,
      );
      const nzSelectElem = host.queryCss('nz-select');

      expect(nzSelectElem).toBeTruthy();
      expect(nzSelectElem!.properties.ngModel).toBe(undefined);
    });
  });

  describe('Inputs must be bound to nz-select', () => {
    it('should bind search to nzShowSearch of nz-select', async () => {
      const host = await createComponent({ search: true }, true);
      const nzSelectElem = host.queryCss('nz-select');

      expect(nzSelectElem).toBeTruthy();
      expect(nzSelectElem!.properties.nzShowSearch).toBe(true);
    });

    it('should bind disabled to nzDisabled of nz-select', async () => {
      const host = await createComponent({ disabled: true }, true);
      const nzSelectElem = host.queryCss('nz-select');

      expect(nzSelectElem).toBeTruthy();
      expect(nzSelectElem!.properties.nzDisabled).toBe(true);
    });

    it('should bind multiple to nzMode of nz-select', async () => {
      const host = await createComponent({ multiple: true }, true);
      const nzSelectElem = host.queryCss('nz-select');

      expect(nzSelectElem).toBeTruthy();
      expect(nzSelectElem!.properties.nzMode).toBe('tags');
    });

    it('should bind placeholder to nzPlaceHolder of nz-select', async () => {
      const host = await createComponent({ placeholder: 'placeholder' }, true);
      const nzSelectElem = host.queryCss('nz-select');

      expect(nzSelectElem).toBeTruthy();
      expect(nzSelectElem!.properties.nzPlaceHolder).toBe('placeholder');
    });

    it('should bind disableClear inverted to nzAllowClear of nz-select', async () => {
      const host = await createComponent({}, true);
      const nzSelectElem = host.queryCss('nz-select');

      expect(nzSelectElem).toBeTruthy();
      expect(nzSelectElem!.properties.nzAllowClear).toBe(true);

      host.setInputs({ disableClear: true }, true);

      expect(nzSelectElem!.properties.nzAllowClear).toBe(false);
    });
  });

  it('options array must be correctly mapped and create each option of the dropdown', async () => {
    const host = await createComponent({ options: ['123'] }, true);
    const nzOption = host.queryCss('nz-option');

    expect(nzOption).toBeTruthy();
    expect(nzOption!.properties.nzValue).toBe('123');
    expect(nzOption!.properties.nzLabel).toBe('123');
  });

  it('valueChange must be emitted every time ngModelChange emits from nz-select', async () => {
    const host = await createComponent({}, true);
    const nzSelectElem = host.queryCss('nz-select');

    expect(nzSelectElem).toBeTruthy();

    nzSelectElem!.triggerEventHandler('ngModelChange', []);
    host.detectChanges();

    expect(host.hostComponent.valueChange).toHaveBeenCalled();
  });

  describe('SelectComponent methods', () => {
    it('options array with numbers or strings should be correctly mapped', async () => {
      const host = await createComponent({ options: [123, '123'] }, true);
      const nzOptionElems = host.fixture.debugElement.queryAll(
        By.css('nz-option'),
      );

      expect(nzOptionElems.length).toBe(2);
      expect(nzOptionElems[0].properties.nzValue).toBe(123);
      expect(nzOptionElems[0].properties.nzLabel).toBe(123);
      expect(nzOptionElems[1].properties.nzValue).toBe('123');
      expect(nzOptionElems[1].properties.nzLabel).toBe('123');
    });

    it('Select All correctly triggers selection of all items', async () => {
      const host = await createComponent(
        {
          options: [123, 234, 345],
          multiple: true,
          showSelectAll: true,
          selectAllTitle: 'Select All',
        },
        true,
      );
      const nzSelectElem = host.queryCss('nz-select');

      expect(nzSelectElem).toBeTruthy();

      nzSelectElem!.triggerEventHandler('ngModelChange', [
        host.component.selectAllValue,
      ]);
      host.detectChanges();

      expect(nzSelectElem!.properties.ngModel).toEqual([123, 234, 345]);
    });

    it('Select All correctly triggers deselection of all items', async () => {
      const host = await createComponent(
        {
          options: [123, 234, 345],
          value: [123, 234, 345],
          multiple: true,
          showSelectAll: true,
          selectAllTitle: 'Select All',
        },
        true,
      );
      const nzSelectElem = host.queryCss('nz-select');

      expect(nzSelectElem).toBeTruthy();

      nzSelectElem!.triggerEventHandler('ngModelChange', [
        123,
        234,
        345,
        host.component.selectAllValue,
      ]);
      host.detectChanges();

      expect(nzSelectElem!.properties.ngModel).toEqual([]);
    });
  });
});
