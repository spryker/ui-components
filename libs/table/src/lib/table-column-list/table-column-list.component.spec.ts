// tslint:disable: no-non-null-assertion
import { TestBed } from '@angular/core/testing';
import {
  TableColumnListComponent,
  TableColumnListConfig,
} from './table-column-list.component';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const mockConfig: TableColumnListConfig = {
  limit: 2,
  type: 'test',
  typeOptions: {
    text: '${value}',
  },
};

const mockContext = {
  $implicit: 'test value',
  config: {
    id: 'sku',
    title: 'sku',
    type: 'list',
    typeOptions: {
      limit: 2,
      type: 'test',
      typeOptions: {
        text: '${value}',
      },
    },
  },
  row: {
    name: 'name',
    sku: 'non transformed value',
  },
  i: 0,
};

const mockContextWithSimpleValue: any = {
  ...mockContext,
  value: 'test value',
};

const mockContextWithMultiple: any = {
  ...mockContext,
  value: ['test value', 'test', 'test'],
};

const mockContextWithMultipleNoLimit: any = {
  ...mockContext,
  value: ['test value'],
};

const mockTransformedData = { name: 'name', sku: 'test value' };

const mockTransformedConfig = {
  id: 'sku',
  title: 'sku',
  type: 'test',
  typeOptions: { text: '${value}' },
};

describe('TableColumnListComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    TableColumnListComponent,
    {
      ngModule: {
        schemas: [NO_ERRORS_SCHEMA],
      },
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [testModule] });
  });

  it('should render `spy-table-column-renderer` element', async () => {
    const host = await createComponent(
      { config: mockConfig, context: mockContextWithSimpleValue },
      true,
    );
    const columnElem = host.queryCss('spy-table-column-renderer');

    expect(columnElem).toBeTruthy();
  });

  it('should render `spy-popover` element if values.length more than valueLimit', async () => {
    const host = await createComponent(
      { config: mockConfig, context: mockContextWithMultiple },
      true,
    );
    const popoverElem = host.queryCss('spy-popover');

    expect(
      mockContext.config.typeOptions.limit <
        mockContextWithMultiple.value.length,
    ).toBeTruthy();
    expect(popoverElem).toBeTruthy();
  });

  it('should not render `spy-popover` element if values.length less or equal than valueLimit', async () => {
    const host = await createComponent(
      { config: mockConfig, context: mockContextWithMultipleNoLimit },
      true,
    );
    const popoverElem = host.queryCss('spy-popover');

    expect(
      mockContext.config.typeOptions.limit >=
        mockContextWithMultipleNoLimit.value.length,
    ).toBeTruthy();
    expect(popoverElem).toBeFalsy();
  });

  it('should render `.spy-table-column-list__trigger` width values.length if values.length more than valueLimit', async () => {
    const host = await createComponent(
      { config: mockConfig, context: mockContextWithMultiple },
      true,
    );
    const triggerElem = host.queryCss('.spy-table-column-list__trigger');

    expect(
      mockContext.config.typeOptions.limit <
        mockContextWithMultiple.value.length,
    ).toBeTruthy();
    expect(triggerElem).toBeTruthy();
    expect(triggerElem?.nativeElement.textContent).toContain(
      mockContextWithMultiple.value.length,
    );
  });

  it('should render `spy-table-column-renderer` element', async () => {
    const host = await createComponent(
      { config: mockConfig, context: mockContextWithSimpleValue },
      true,
    );
    const columnElem = host.queryCss('spy-table-column-renderer');

    expect(columnElem).toBeTruthy();
  });

  it('`spy-table-column-renderer` element should bind transformed `config` to the input `config`', async () => {
    const host = await createComponent(
      { config: mockConfig, context: mockContextWithSimpleValue },
      true,
    );
    const columnElem = host.queryCss('spy-table-column-renderer');

    expect(columnElem!.properties.config).toEqual(mockTransformedConfig);
  });

  it('`spy-table-column-renderer` element should bind transformed `data` to the input `data`', async () => {
    const host = await createComponent(
      { config: mockConfig, context: mockContextWithSimpleValue },
      true,
    );
    const columnElem = host.queryCss('spy-table-column-renderer');

    expect(columnElem!.properties.data).toEqual(mockTransformedData);
  });

  it('should render `spy-table-column-renderer` element', async () => {
    const host = await createComponent(
      { config: mockConfig, context: mockContextWithSimpleValue },
      true,
    );
    const columnElem = host.queryCss('spy-table-column-renderer');

    expect(columnElem).toBeTruthy();
  });
});
