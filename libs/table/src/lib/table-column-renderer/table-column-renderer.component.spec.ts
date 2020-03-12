// tslint:disable: no-non-null-assertion
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from "@orchestrator/ngx-testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { TableColumnRendererComponent } from './table-column-renderer.component';
import { TableColumn, TableDataRow } from "../table/table";

const mockConfig: TableColumn = {
  id: 'name',
  title: 'test',
  sortable: true,
  width: '40%',
};

const mockData: TableDataRow = {
  name: 'test'
};

describe('TableColumnRendererComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    TableColumnRendererComponent,
    {
      ngModule: {
        schemas: [NO_ERRORS_SCHEMA],
      },
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [testModule] });
  });

  it('must render `data[config.id]` when input config.type and template are undefined', async () => {
    const host = await createComponent({ config: mockConfig, data: mockData }, true);
    const rendererElem = host.queryCss('spy-table-column-renderer');

    expect(rendererElem!.nativeElement.textContent).toMatch(mockData[mockConfig.id] as string);
  });
});
