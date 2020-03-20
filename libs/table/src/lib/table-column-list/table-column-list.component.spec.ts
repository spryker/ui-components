// tslint:disable: no-non-null-assertion
import { TestBed } from '@angular/core/testing';

import { TableColumnListComponent } from './table-column-list.component';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const columns: any = [
  {
    id: 'sku',
    type: 'list',
    typeOptions: {
      limit: 2,
      type: 'text',
    },
  },
];

const context: any = {
  $implicit: 'sku1',
  config: columns,
  row: { sku: ['sku1', 'sku2', 'sku3'] },
  value: 'sku1',
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

  it('should render spy-table-column-renderer', async () => {
    const host = await createComponent(
      { config: columns, context: context },
      true,
    );
    const columnElem = host.queryCss('spy-table-column-renderer');

    console.log(columnElem!.properties);
  });
});
