// tslint:disable: no-non-null-assertion
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ToIsoDateFormatModule } from '@spryker/utils';
import { DatePickerComponent } from './date-picker.component';
import { TestLocaleModule } from '@spryker/locale/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

describe('DatePickerComponent', () => {
  let { testModule, createComponent } = getTestingForComponent(
    DatePickerComponent,
    {
      ngModule: {
        schemas: [NO_ERRORS_SCHEMA],
        imports: [
          TestLocaleModule,
          NoopAnimationsModule,
          ToIsoDateFormatModule,
        ],
      },
    },
  );

  const nzDatePickerSelector = 'nz-date-picker';
  const mockedDate = new Date('2012-12-12');
  const mockedExpectedDate = '2012-12-12T00:00:00.000Z';
  const mockedFormat = 'yyyy-MM-dd';
  const mockedPlaceholder = 'placeholder';
  const mockedCallValue = 'mockedCallValue';
  const mockedName = 'mockedName';
  const mockedEnableTimeObject = {
    onlyWorkHours: false,
    from: '2020.11.05 8:30',
    to: '2020.11.05 17:30',
  };
  const mockedEnableTimeFunction = () => {
    return {
      hours: () => [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      minutes: () => [...Array(31).keys()],
      seconds: () => [],
    };
  };
  const mockedDisabledTime = () => {
    return {
      nzDisabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 18, 19, 20, 21, 22, 23],
      nzDisabledMinutes: () =>
        [...Array(29).keys()].map((_, index) => 31 + index),
      nzDisabledSeconds: () => [],
    };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [testModule],
      teardown: { destroyAfterEach: false },
    });
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

      expect(datePicker?.properties.nzAllowClear).toBe(true);
    });

    it('Input disabled should be bound to nzDisabled input of nz-date-picker', async () => {
      const host = await createComponent({ disabled: true }, true);
      const datePicker = host.queryCss(nzDatePickerSelector);

      expect(datePicker?.properties.nzDisabled).toBe(true);
    });

    it('Input date should be bound to ngModel input of `hidden input`', async () => {
      const host = await createComponent({ date: mockedDate }, true);
      const inputElement = host.queryCss('input[type="hidden"]');

      expect(inputElement?.properties.ngModel).toBe(mockedExpectedDate);
    });

    it('Input date should be bound to ngModel input of nz-date-picker', async () => {
      const host = await createComponent({ date: mockedDate }, true);
      const datePicker = host.queryCss(nzDatePickerSelector);

      expect(datePicker?.properties.ngModel).toMatchObject(mockedDate);
    });

    it('Input format should be bound to nzFormat input of nz-date-picker', async () => {
      const host = await createComponent({ format: mockedFormat }, true);
      const datePicker = host.queryCss(nzDatePickerSelector);

      expect(datePicker?.properties.nzFormat).toBe(mockedFormat);
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

      expect(datePicker?.properties.nzPlaceHolder).toBe(mockedPlaceholder);
    });

    it('Input disabledTime should be bound to nzDisabledTime input of nz-date-picker as object', async () => {
      const host = await createComponent(
        { enableTime: mockedEnableTimeObject },
        true,
      );
      const datePicker = host.queryCss(nzDatePickerSelector);

      expect(datePicker?.properties.nzDisabledTime).toBe(
        host.component.disabledTime,
      );
    });

    it('Input disabledTime should be bound to nzDisabledTime input of nz-date-picker as function', async () => {
      const host = await createComponent(
        { enableTime: mockedEnableTimeFunction },
        true,
      );
      const datePicker = host.queryCss(nzDatePickerSelector);

      expect(datePicker?.properties.nzDisabledTime).toBe(
        host.component.disabledTime,
      );
    });

    it('disabledTime should return { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds } with object on input', async () => {
      const host = await createComponent(
        { time: true, enableTime: mockedEnableTimeObject },
        true,
      );
      const disabledTime = host.component.disabledTime!(new Date());

      expect(disabledTime.nzDisabledHours()).toMatchObject(
        mockedDisabledTime().nzDisabledHours(),
      );
      expect(disabledTime.nzDisabledMinutes(17)).toMatchObject(
        mockedDisabledTime().nzDisabledMinutes(),
      );
      expect(disabledTime.nzDisabledSeconds()).toMatchObject(
        mockedDisabledTime().nzDisabledSeconds(),
      );
    });

    it('disabledTime should return { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds } with function on input', async () => {
      const host = await createComponent(
        { time: true, enableTime: mockedEnableTimeFunction },
        true,
      );
      const disabledTime = host.component.disabledTime!(new Date());

      expect(disabledTime.nzDisabledHours()).toMatchObject(
        mockedDisabledTime().nzDisabledHours(),
      );
      expect(disabledTime.nzDisabledMinutes(8)).toMatchObject(
        mockedDisabledTime().nzDisabledMinutes(),
      );
      expect(disabledTime.nzDisabledSeconds()).toMatchObject(
        mockedDisabledTime().nzDisabledSeconds(),
      );
    });

    it('Input time should be bound to nzShowTime input of nz-date-picker', async () => {
      const host = await createComponent({ time: true }, true);
      const datePicker = host.queryCss(nzDatePickerSelector);

      expect(datePicker?.properties.nzShowTime).toBe(host.component.nzTime);
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
    const originalTestModule = testModule;
    const originalCreateComponent = createComponent;

    beforeAll(() => {
      const testingForComponent = getTestingForComponent(DatePickerComponent, {
        ngModule: {
          schemas: [NO_ERRORS_SCHEMA],
          imports: [
            TestLocaleModule,
            NoopAnimationsModule,
            NzDatePickerModule,
            ToIsoDateFormatModule,
          ],
        },
      });

      testModule = testingForComponent.testModule;
      createComponent = testingForComponent.createComponent;
    });

    afterAll(() => {
      testModule = originalTestModule;
      createComponent = originalCreateComponent;
    });

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
