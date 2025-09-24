import { TestBed } from '@angular/core/testing';
import { CoreTableComponent, TableDataConfiguratorService } from '@spryker/table';

import { TableDataTransformerConfiguratorService } from './table-data-transformer-configurator.service';
import { of } from 'rxjs';

const mockDefaultPageSizes = [15, 30, 45];

const mockTableDataConfiguratorConfig = {
    page: 3,
    sortBy: 'valId',
    sortDirection: 'asc',
    filter: 'filters',
    search: 'search',
};

class MockCoreTableComponent {
    config$ = of({
        pagination: {
            sizes: mockDefaultPageSizes,
        },
    });
}

class MockTableDataConfiguratorService {
    config$ = of(mockTableDataConfiguratorConfig);
}

class MockInjector {
    get = jest.fn();
}

describe('TableDataTransformerConfiguratorService', () => {
    let service: TableDataTransformerConfiguratorService;
    let injector: MockInjector;
    let coreTable: MockCoreTableComponent;
    let tableDataConfiguratorService: MockTableDataConfiguratorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [MockInjector, MockCoreTableComponent, MockTableDataConfiguratorService],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(TableDataTransformerConfiguratorService);
        injector = TestBed.inject(MockInjector);
        coreTable = TestBed.inject(MockCoreTableComponent);
        tableDataConfiguratorService = TestBed.inject(MockTableDataConfiguratorService);
    });

    it('resolve method should return Observable<DataTransformerConfiguratorConfigT> with data from CoreTableComponent and TableDataConfiguratorService', () => {
        const callback = jest.fn();
        const mockReturnData = {
            search: mockTableDataConfiguratorConfig.search,
            filter: mockTableDataConfiguratorConfig.filter,
            sorting: {
                sortBy: mockTableDataConfiguratorConfig.sortBy,
                sortDirection: mockTableDataConfiguratorConfig.sortDirection,
            },
            page: mockTableDataConfiguratorConfig.page,
            pageSize: mockDefaultPageSizes[0],
        };

        injector.get.mockImplementation((instance) => {
            if (instance.toString() === CoreTableComponent.toString()) {
                return coreTable;
            }

            if (instance.toString() === TableDataConfiguratorService.toString()) {
                return tableDataConfiguratorService;
            }
        });

        const serviceObservable$ = service.resolve(injector);

        serviceObservable$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(mockReturnData);
    });
});
