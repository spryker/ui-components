import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoreTableComponent, TableDataConfiguratorService, TableLocatorService } from '@spryker/table';
import { ContextService, FileSaverService } from '@spryker/utils';
import { of } from 'rxjs';
import { TableDataExportActionHandlerService } from './table-data-export-action-handler.service';

const mockTableData = {
    tableConfig: {
        columns: [
            {
                id: 'columnId',
                title: 'columnTitle',
                hideable: true,
                hidden: false,
            },
        ],
        data: [
            {
                colId: 'dataId',
            },
        ],
    },
    tableSettings: {
        page: 1,
        pageSize: 10,
        settings: [
            {
                id: 'columnId',
                title: 'columnTitle',
                sortable: true,
                hideable: true,
                hidden: false,
            },
        ],
        search: '',
        filter: {
            filterId: 'first',
            filterRangeId: {
                from: '2023-02-09T22:00:00',
                to: '2023-02-19T22:00:00',
            },
        },
        sorting: {
            sortBy: 'colId',
            sortDirection: 'asc',
        },
    },
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};
const mockActionsConfig = {
    type: 'table-data-export',
    url: 'mockUrl',
};
const mockResponse = new Blob([''], { type: 'text/csv' });
const callback = jest.fn();
const mockContext = 'mockContext';
const mockTableId = 'mockId';
const mockFileName = 'mockName';

@Injectable()
class MockTable {
    injector = {
        get: jest.fn(),
    };
    columns$ = of(mockTableData.tableConfig.columns);
    data$ = of({
        data: mockTableData.tableConfig.data,
    });
}

@Injectable()
class MockInjector {
    get = jest.fn();
}

@Injectable()
class MockTableLocatorService {
    findById = jest.fn();
}

@Injectable()
class MockFileSaverService {
    fileSaver = jest.fn();
}

@Injectable()
class MockTableDataConfiguratorService {
    config$ = of(mockTableData.tableSettings);
}

@Injectable()
class MockContextService {
    interpolate = jest.fn().mockImplementation((d) => d);
}

describe('TableDataExportActionHandlerService', () => {
    let service: TableDataExportActionHandlerService;
    let table: MockTable;
    let injector: MockInjector;
    let fileSaverService: MockFileSaverService;
    let contextService: MockContextService;
    let httpTestingController: HttpTestingController;
    let tableLocatorService: MockTableLocatorService;
    let tableDataConfiguratorService: MockTableDataConfiguratorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                MockTable,
                MockInjector,
                MockFileSaverService,
                MockTableLocatorService,
                MockTableDataConfiguratorService,
                MockContextService,
                {
                    provide: FileSaverService,
                    useExisting: MockFileSaverService,
                },
                {
                    provide: TableLocatorService,
                    useExisting: MockTableLocatorService,
                },
                {
                    provide: TableDataConfiguratorService,
                    useExisting: MockTableDataConfiguratorService,
                },
                {
                    provide: ContextService,
                    useExisting: MockContextService,
                },
            ],
            teardown: { destroyAfterEach: false },
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(TableDataExportActionHandlerService);
        injector = TestBed.inject(MockInjector);
        table = TestBed.inject(MockTable);
        contextService = TestBed.inject(MockContextService);
        tableLocatorService = TestBed.inject(MockTableLocatorService);
        tableDataConfiguratorService = TestBed.inject(MockTableDataConfiguratorService);
        fileSaverService = TestBed.inject(MockFileSaverService);

        injector.get.mockImplementation((instance) => {
            if (instance === CoreTableComponent) {
                return table;
            }

            if (instance === TableLocatorService) {
                return tableLocatorService;
            }

            if (instance === ContextService) {
                return contextService;
            }

            if (instance === FileSaverService) {
                return fileSaverService;
            }
        });

        table.injector.get.mockImplementation((instance) => {
            if (instance === TableDataConfiguratorService) {
                return tableDataConfiguratorService;
            }
        });

        URL.createObjectURL = jest.fn();
        URL.revokeObjectURL = jest.fn();
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should find the table by `tableId` via `TableLocatorService.findById()`', () => {
        tableLocatorService.findById.mockReturnValue(table);
        table.injector.get.mockReturnValue(tableDataConfiguratorService);

        const serviceObservable$ = service.handleAction(
            injector,
            { tableId: mockTableId, ...mockActionsConfig },
            mockContext,
        );

        httpTestingController.expectOne(mockActionsConfig.url);
        serviceObservable$.subscribe();

        expect(tableLocatorService.findById).toHaveBeenCalledWith(mockTableId);
    });

    it('should throw an error if table is not defined', () => {
        table = null;

        expect(() => service.handleAction(injector, mockActionsConfig, mockContext)).toThrow();
    });

    it('should collect `tableData` form `CoreTableComponent` and `TableDataConfiguratorService`', () => {
        const serviceObservable$ = service.handleAction(injector, mockActionsConfig, mockContext);

        httpTestingController.expectOne(mockActionsConfig.url);
        serviceObservable$.subscribe();

        expect(service.tableData).toStrictEqual(mockTableData);
    });

    it('should process `config.url` via `ContextService.interpolate()`', () => {
        const serviceObservable$ = service.handleAction(injector, mockActionsConfig, mockContext);

        httpTestingController.expectOne(mockActionsConfig.url);
        serviceObservable$.subscribe();

        expect(contextService.interpolate).toHaveBeenCalledWith(mockActionsConfig.url, mockContext);
    });

    it('should call `FileSaverService.fileSaver()` with the response object', () => {
        const serviceObservable$ = service.handleAction(injector, mockActionsConfig, mockContext);
        const htmlResponse = httpTestingController.expectOne(mockActionsConfig.url);

        htmlResponse.flush(mockResponse);
        serviceObservable$.subscribe();

        expect(fileSaverService.fileSaver).toHaveBeenCalledWith(mockResponse, 'table-data');
    });

    it('should call `FileSaverService.fileSaver()` with the response object and file name from config', () => {
        const serviceObservable$ = service.handleAction(
            injector,
            { fileName: mockFileName, ...mockActionsConfig },
            mockContext,
        );
        const htmlResponse = httpTestingController.expectOne(mockActionsConfig.url);

        htmlResponse.flush(mockResponse);
        serviceObservable$.subscribe();

        expect(fileSaverService.fileSaver).toHaveBeenCalledWith(mockResponse, mockFileName);
    });

    it('should return stream that emits when HTTP request finishes', () => {
        const serviceObservable$ = service.handleAction(injector, mockActionsConfig, mockContext);
        const htmlResponse = httpTestingController.expectOne(mockActionsConfig.url);

        htmlResponse.flush(mockResponse);
        serviceObservable$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(
            expect.objectContaining({
                body: mockResponse,
            }),
        );
    });
});
