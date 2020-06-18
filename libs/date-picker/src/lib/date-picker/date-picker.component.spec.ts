// tslint:disable: no-non-null-assertion
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { DatePickerComponent } from './date-picker.component';
import { TestLocaleModule } from '@spryker/locale/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

describe('DatePickerComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    DatePickerComponent,
    {
      ngModule: {
        schemas: [NO_ERRORS_SCHEMA],
        imports: [TestLocaleModule, NzDatePickerModule, NoopAnimationsModule],
      },
    },
  );

  const nzDatePickerSelector = 'nz-date-picker';
  const mockedDate = new Date('2012-12-12');
  const mockedFormat = 'yyyy-MM-dd';
  const mockedPlaceholder = 'placeholder';
  const mockedCallValue = 'mockedCallValue';
  const mockedName = 'mockedName';

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [testModule] });
    registerLocaleData(zh);
  });

  it('should render nz-date-picker component from Ant Design', async () => {
    const host = await createComponent({}, true);

    const datePicker = host.queryCss(nzDatePickerSelector);

    expect(datePicker).toBeTruthy();
  });

  describe('@Input', () => {
    it('Input clearButton should be bound to nzAllowClear input of nz-date-picker', async () => {
      const host = await createComponent({ clearButton: true }, true);

      const datePicker = host.queryCss(nzDatePickerSelector);

      expect(datePicker?.attributes['ng-reflect-nz-allow-clear']).toBe('true');
    });

    it('Input disabled should be bound to nzDisabled input of nz-date-picker', async () => {
      const host = await createComponent({ disabled: true }, true);

      const datePicker = host.queryCss(nzDatePickerSelector);

      expect(datePicker?.attributes['ng-reflect-nz-disabled']).toBe('true');
    });

    it('Input date should be bound to ngModel input of `hidden input`', async () => {
      const host = await createComponent({ date: mockedDate }, true);

      const inputElement = host.queryCss('input[type="hidden"]');

      expect(inputElement?.properties.ngModel).toMatchObject(mockedDate);
    });

    it('Input date should be bound to ngModel input of nz-date-picker', async () => {
      const host = await createComponent({ date: mockedDate }, true);

      const datePicker = host.queryCss(nzDatePickerSelector);

      expect(datePicker?.properties.ngModel).toMatchObject(mockedDate);
    });

    it('Input format should be bound to nzFormat input of nz-date-picker', async () => {
      const host = await createComponent({ format: mockedFormat }, true);

      const datePicker = host.queryCss(nzDatePickerSelector);

      expect(datePicker?.attributes['ng-reflect-nz-format']).toBe(mockedFormat);
    });

    it('Input name should be bound to name input of `hidden input`', async () => {
      const host = await createComponent({ name: mockedName }, true);

      const inputElement = host.queryCss('input[type="hidden"]');

      expect(inputElement?.properties.name).toBe(mockedName);
    });

    it('Input placeholder should be bound to nzPlaceholder input of nz-date-picker', async () => {
      const host = await createComponent(
        { placeholder: mockedPlaceholder },
        true,
      );

      const datePicker = host.queryCss(nzDatePickerSelector);

      expect(datePicker?.attributes['ng-reflect-nz-place-holder']).toBe(
        mockedPlaceholder,
      );
    });
  });

  describe('@Output', () => {
    it('Output dateChange should be emitted every time when the ngModelChange emits on nz-date-picker', async () => {
      const host = await createComponent({}, true);

      host.hostComponent.dateChange = jest.fn();

      const datePicker = host.queryCss(nzDatePickerSelector);

      datePicker!.triggerEventHandler('ngModelChange', mockedCallValue);

      expect(host.hostComponent.dateChange).toHaveBeenCalledWith(
        mockedCallValue,
      );
    });

    it('Output openChange should be emitted every time when the nzOnOpenChange emits on nz-date-picker', async () => {
      const host = await createComponent({}, true);

      host.hostComponent.openChange = jest.fn();

      const datePicker = host.queryCss(nzDatePickerSelector);

      datePicker!.triggerEventHandler('nzOnOpenChange', mockedCallValue);

      expect(host.hostComponent.openChange).toHaveBeenCalledWith(
        mockedCallValue,
      );
    });
  });

  describe('Methods', () => {
    it('Should apply open class to the host element if input open is true', fakeAsync(async () => {
      const host = await createComponent({ open: true });

      tick();
      host.detectChanges();
      tick();
      host.detectChanges();

      const datePicker = host.query(DatePickerComponent);
      const openClass = datePicker?.classes.open;

      expect(openClass).toBeTruthy();
    }));

    it('Should NOT apply open class to the host element if input open is false', fakeAsync(async () => {
      const host = await createComponent({ open: false });

      tick();
      host.detectChanges();
      tick();
      host.detectChanges();

      const datePicker = host.query(DatePickerComponent);
      const openClass = datePicker?.classes.open;

      expect(openClass).toBeFalsy();
    }));
  });
});
