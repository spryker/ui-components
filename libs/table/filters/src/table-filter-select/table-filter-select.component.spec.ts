// tslint:disable: no-non-null-assertion
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SelectOptionItem } from '@spryker/select';

import { TableFilterSelectComponent } from './table-filter-select.component';
import { TableFilterSelect } from './types';

const mockSelectValues = [
  {
    title: 'Option 1',
    value: 'value_1',
  },
  {
    title: 'Option 2',
    value: 'value_2',
  },
];

const mockTransformedSelectValues: SelectOptionItem[] = [
  {
    label: 'Option 1',
    value: 'value_1',
  },
  {
    label: 'Option 2',
    value: 'value_2',
  },
];

const mockSelectValue = ['value_1'];

const mockSelectConfig: TableFilterSelect = {
  __capturedValue: '',
  id: 'Filter Id',
  title: 'Filter title',
  type: 'select',
  typeOptions: {
    values: mockSelectValues,
    multiple: true,
  },
};

describe('TableFilterSelectComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    TableFilterSelectComponent,
    {
      ngModule: { schemas: [NO_ERRORS_SCHEMA] },
    },
  );

  beforeEach(() => TestBed.configureTestingModule({ imports: [testModule] }));

  it('template must render `spy-select`', async () => {
    const host = await createComponent({}, true);
    const selectElem = host.queryCss('spy-select');

    expect(selectElem).toBeTruthy();
  });

  describe('@Input(config)', () => {
    it('`config.title` must be bound to `placeholder` input of the `spy-select` element', async () => {
      const host = await createComponent(
        { config: mockSelectConfig, value: mockSelectValue },
        true,
      );
      const selectElem = host.queryCss('spy-select');

      expect(selectElem!.properties.placeholder).toBe(mockSelectConfig.title);
    });

    it('`config.typeOptions.multiple` must be bound to placeholder multiple of the `spy-select` element', async () => {
      const host = await createComponent(
        { config: mockSelectConfig, value: mockSelectValue },
        true,
      );
      const selectElem = host.queryCss('spy-select');

      expect(selectElem!.properties.multiple).toBe(
        mockSelectConfig.typeOptions.multiple,
      );
    });

    it('`config.typeOptions.values` must be assigned to `selectOptions` property by mapping to type `SelectOptionItem`', async () => {
      const host = await createComponent(
        { config: mockSelectConfig, value: mockSelectValue },
        true,
      );

      expect(host.component.selectOptions).toEqual(mockTransformedSelectValues);
    });

    it('`config.typeOptions.values` must be assigned to `selectOptions` property by mapping to type `SelectOptionItem` when config changed', async () => {
      const host = await createComponent(
        { config: mockSelectConfig, value: mockSelectValue },
        true,
      );

      expect(host.component.selectOptions).toEqual(mockTransformedSelectValues);

      const newConfig = {
        ...mockSelectConfig,
        typeOptions: {
          values: [mockSelectValues[0]],
        },
      };

      host.setInputs({ config: newConfig }, true);

      expect(host.component.selectOptions).toEqual([
        mockTransformedSelectValues[0],
      ]);
    });
  });

  describe('@Input(value)', () => {
    it('`value` must be bound to `value` input of the `spy-select` element', async () => {
      const host = await createComponent(
        { config: mockSelectConfig, value: mockSelectValue },
        true,
      );
      const selectElem = host.queryCss('spy-select');

      expect(selectElem!.properties.value).toEqual(mockSelectValue);
    });
  });

  describe('@Output(valueChange)', () => {
    it('must be triggered on `valueChange` output of the `spy-select` element', async () => {
      const host = await createComponent(
        { config: mockSelectConfig, value: mockSelectValue },
        true,
      );
      const selectElem = host.queryCss('spy-select');

      selectElem!.triggerEventHandler('valueChange', mockSelectValue[0]);

      host.detectChanges();

      expect(host.hostComponent.valueChange).toHaveBeenCalledWith(
        mockSelectValue[0],
      );
    });
  });
});
