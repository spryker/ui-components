import { NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { DatasourceService } from '@spryker/datasource';
import { createComponentWrapper } from '@spryker/internal-utils';
import { BehaviorSubject, of } from 'rxjs';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { TableColumnDynamicComponent } from './table-column-dynamic.component';

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
    config: {
        id: 'dynamic',
        title: 'dynamic',
    },
};

class MockDatasourceService implements Partial<DatasourceService> {
    resolve = jest.fn();
}

describe('TableColumnDynamicComponent', () => {
    let datasource: MockDatasourceService;

    const { testModule, createComponent } = getTestingForComponent(TableColumnDynamicComponent, {
        ngModule: {
            imports: [DefaultContextSerializationModule],
            declarations: [ContextPipe],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

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
            teardown: { destroyAfterEach: false },
        });

        datasource = TestBed.inject(MockDatasourceService);
    });

    it('should render <spy-table-column-renderer> element with config from datasource', fakeAsync(async () => {
        datasource.resolve.mockReturnValue(of(configMock.datasource.data));

        const host = await createComponentWrapper(createComponent, { config: configMock, context });
        const updatedConfigMock = {
            ...configMock.datasource.data,
            id: context.config.id,
            title: context.config.title,
        };

        host.detectChanges();
        tick();

        const tableElem = host.queryCss('spy-table-column-renderer');

        host.detectChanges();

        expect(tableElem).toBeTruthy();
        expect(tableElem.properties.config).toEqual(updatedConfigMock);
    }));

    it('should render <nz-spin> if `isColConfigLoading$` signal invokes', fakeAsync(async () => {
        const datasourceData$ = new BehaviorSubject(of(configMock.datasource.data));

        datasource.resolve.mockReturnValue(datasourceData$);

        const host = await createComponentWrapper(createComponent, { config: configMock, context });
        let spinElem = host.queryCss('nz-spin');

        expect(spinElem).toBeTruthy();

        host.detectChanges();
        tick();

        datasourceData$.next(configMock);

        host.detectChanges();
        tick();

        spinElem = host.queryCss('nz-spin');

        expect(spinElem).toBeFalsy();
    }));

    it('should bound `colData` property to the `data` input of <spy-table-column-renderer> element', async () => {
        const mockColData = {
            dynamic: context.value,
        };
        const host = await createComponentWrapper(createComponent, { config: configMock, context });
        const tableElem = host.queryCss('spy-table-column-renderer');

        expect(tableElem.properties.data).toStrictEqual(mockColData);
    });

    it('should bound `i` property from `@Input(type)` to the `i` input of <spy-table-column-renderer> element', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock, context });
        const tableElem = host.queryCss('spy-table-column-renderer');

        expect(tableElem.properties.i).toStrictEqual(context.i);
    });

    it('should bound `j` property from `@Input(type)` to the `j` input of <spy-table-column-renderer> element', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock, context });
        const tableElem = host.queryCss('spy-table-column-renderer');

        expect(tableElem.properties.j).toStrictEqual(context.j);
    });
});
