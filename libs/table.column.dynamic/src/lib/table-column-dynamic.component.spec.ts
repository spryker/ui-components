import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { DatasourceService } from '@spryker/datasource';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { of, Subject } from 'rxjs';
import { TableColumnDynamicComponent } from './table-column-dynamic.component';

// tslint:disable: no-non-null-assertion

const configMock: any = {
  datasource: {
    type: 'inline',
    data: {
      type: 'select',
      typeOptions: {
        options: [
          {
            title: 'Option dynamic 1',
            value: 'Option dynamic 1',
          },
          {
            title: 'Option dynamic 2',
            value: 'Option dynamic 2',
          },
        ],
      },
    },
  },
};

const context: any = {
  value: 'value',
  i: '0',
  j: '2',
};

class MockDatasourceService implements Partial<DatasourceService> {
  resolve = jest.fn();
}

describe('TableColumnDynamicComponent', () => {
  let datasource: MockDatasourceService;

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
    TestBed.configureTestingModule({
      imports: [testModule],
      providers: [
        MockDatasourceService,
        {
          provide: DatasourceService,
          useExisting: MockDatasourceService,
        },
      ],
    });
    datasource = TestBed.inject(MockDatasourceService);
  });

  it('should render <spy-table-column-renderer> component with config from datasource', async () => {
    datasource.resolve.mockReturnValue(of(configMock.datasource.data));

    const host = await createComponent({ config: configMock, context }, true);
    const updatedConfigMock = {
      ...configMock.datasource.data,
      id: 'dynamic',
      title: 'dynamic',
    };
    const tableElem = host.queryCss('spy-table-column-renderer');

    expect(tableElem).toBeTruthy();
    expect(tableElem?.properties.config).toEqual(updatedConfigMock);
  });

  it('should render `nz-spin` if `isColConfigLoading$` signal invokes', async () => {
    const datasourceData$ = new Subject();

    datasource.resolve.mockReturnValue(datasourceData$);
    const host = await createComponent({ config: configMock, context }, true);
    let spinElem = host.queryCss('nz-spin')!;

    expect(spinElem).toBeTruthy();

    datasourceData$.next(configMock);

    host.detectChanges();
    spinElem = host.queryCss('nz-spin')!;

    expect(spinElem).toBeFalsy();
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
