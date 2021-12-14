/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TableFilterDateRangeComponent } from './table-filter-date-range.component';
import { TableFilterDateRange } from './types';

const mockDateRangeConfig: TableFilterDateRange = {
  __capturedValue: {},
  id: 'Filter Id',
  title: 'Filter title',
  type: 'date-range',
  typeOptions: {
    placeholderFrom: 'from',
    placeholderTo: 'to',
    format: 'yyyy-MM-dd',
  },
};

const mockValue = { from: '2012-12-12', to: '2012-12-17' };

describe('TableFilterDateRangeComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    TableFilterDateRangeComponent,
    {
      ngModule: { schemas: [NO_ERRORS_SCHEMA] },
    },
  );

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [testModule],
      teardown: { destroyAfterEach: false },
    }),
  );

  it('template must render `spy-date-range-picker`', async () => {
    const host = await createComponent({ config: mockDateRangeConfig }, true);
    const dateRangeElem = host.queryCss('spy-date-range-picker');

    expect(dateRangeElem).toBeTruthy();
  });

  describe('@Input(config)', () => {
    it('`value` must be bound to `dates` input of the `spy-date-range-picker` element', async () => {
      const host = await createComponent(
        { config: mockDateRangeConfig, value: mockValue },
        true,
      );
      const dateRangeElem = host.queryCss('spy-date-range-picker');

      expect(dateRangeElem!.properties.dates).toBe(mockValue);
    });

    it('`config.typeOptions.placeholderFrom` must be bound to `placeholderFrom` input of the `spy-date-range-picker` element', async () => {
      const host = await createComponent(
        { config: mockDateRangeConfig, value: mockValue },
        true,
      );
      const dateRangeElem = host.queryCss('spy-date-range-picker');

      expect(dateRangeElem!.properties.placeholderFrom).toBe(
        mockDateRangeConfig.typeOptions.placeholderFrom,
      );
    });

    it('`config.typeOptions.placeholderTo` must be bound to `placeholderTo` input of the `spy-date-range-picker` element', async () => {
      const host = await createComponent(
        { config: mockDateRangeConfig, value: mockValue },
        true,
      );
      const dateRangeElem = host.queryCss('spy-date-range-picker');

      expect(dateRangeElem!.properties.placeholderTo).toBe(
        mockDateRangeConfig.typeOptions.placeholderTo,
      );
    });

    it('`config.typeOptions.format` must be bound to `format` input of the `spy-date-range-picker` element', async () => {
      const host = await createComponent(
        { config: mockDateRangeConfig, value: mockValue },
        true,
      );
      const dateRangeElem = host.queryCss('spy-date-range-picker');

      expect(dateRangeElem!.properties.format).toBe(
        mockDateRangeConfig.typeOptions.format,
      );
    });

    it('`config.typeOptions.format` must be bound to `format` input of the `spy-date-range-picker` element', async () => {
      const host = await createComponent(
        { config: mockDateRangeConfig, value: mockValue },
        true,
      );
      const dateRangeElem = host.queryCss('spy-date-range-picker');

      expect(dateRangeElem!.properties.format).toBe(
        mockDateRangeConfig.typeOptions.format,
      );
    });
  });

  describe('@Output(valueChange)', () => {
    it('must be triggered on `datesChange` output of the `spy-date-range-picker` element', async () => {
      const host = await createComponent(
        { config: mockDateRangeConfig, value: mockValue },
        true,
      );
      const dateRangeElem = host.queryCss('spy-date-range-picker');

      dateRangeElem!.triggerEventHandler('datesChange', true);

      host.detectChanges();

      expect(host.hostComponent.valueChange).toHaveBeenCalledWith(true);
    });
  });
});
