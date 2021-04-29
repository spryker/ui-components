import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { TableColumnDynamicComponent } from './table-column-dynamic.component';

const configMock: any = {
  id: 'dynamic',
  title: 'dynamic',
  datasource: {
    type: 'inline',
    data: {},
  },
};

const context: any = {
  value: 'value',
  i: '0',
  j: '2',
};

describe('TableColumnDynamicComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    TableColumnDynamicComponent,
    {
      ngModule: {
        imports: [DefaultContextSerializationModule],
        declarations: [ContextPipe],
        schemas: [NO_ERRORS_SCHEMA],
      },
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [testModule] });
  });

  it('should render <spy-table-column-renderer> component', async () => {
    const host = await createComponent({ config: configMock, context }, true);
    const tableElem = host.queryCss('spy-table-column-renderer');

    expect(tableElem).toBeTruthy();
  });

  it('should bound `colData` property to the `data` input of <spy-table-column-renderer> component', async () => {
    const mockColData = {
      dynamic: context.value,
    };
    const host = await createComponent({ config: configMock, context }, true);
    const tableElem = host.queryCss('spy-table-column-renderer');

    expect(tableElem?.properties.data).toStrictEqual(mockColData);
  });

  it('should bound `i` property from `@Input(type)` to the `i` input of <spy-table-column-renderer> component', async () => {
    const host = await createComponent({ config: configMock, context }, true);
    const tableElem = host.queryCss('spy-table-column-renderer');

    expect(tableElem?.properties.i).toStrictEqual(context.i);
  });

  it('should bound `j` property from `@Input(type)` to the `j` input of <spy-table-column-renderer> component', async () => {
    const host = await createComponent({ config: configMock, context }, true);
    const tableElem = host.queryCss('spy-table-column-renderer');

    expect(tableElem?.properties.j).toStrictEqual(context.j);
  });
});
