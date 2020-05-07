// tslint:disable: no-non-null-assertion
import { TestBed } from '@angular/core/testing';

import {
  TableColumnListComponent,
  TableColumnListConfig,
} from './table-column-list.component';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TableColumnTplContext } from '@spryker/table';

const mockConfig: TableColumnListConfig = {
  limit: 2,
  type: 'test',
  typeOptions: {
    text: '${value}',
  },
};

const mockContext: TableColumnTplContext = {
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
  value: 'test value',
  i: 0,
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
      { config: mockConfig, context: mockContext },
      true,
    );
    const columnElem = host.queryCss('spy-table-column-renderer');

    expect(columnElem).toBeTruthy();
  });

  it('`spy-table-column-renderer` element should bind transformed `config` to the input `config`', async () => {
    const host = await createComponent(
      { config: mockConfig, context: mockContext },
      true,
    );
    const columnElem = host.queryCss('spy-table-column-renderer');

    expect(columnElem!.properties.config).toEqual(mockTransformedConfig);
  });

  it('`spy-table-column-renderer` element should bind transformed `data` to the input `data`', async () => {
    const host = await createComponent(
      { config: mockConfig, context: mockContext },
      true,
    );
    const columnElem = host.queryCss('spy-table-column-renderer');

    expect(columnElem!.properties.data).toEqual(mockTransformedData);
  });
});
