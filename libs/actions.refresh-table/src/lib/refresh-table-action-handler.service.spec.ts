import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  TableDataConfiguratorService,
  TableLocatorService,
} from '@spryker/table';

import { RefreshTableActionHandlerService } from './refresh-table-action-handler.service';

const mockActionsConfig = {
  type: 'refresh-table',
  url: 'mockUrl',
};
const mockContext = 'mockContext';

@Injectable()
class MockTable {
  injector = {
    get: jest.fn(),
  };
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
class MockTableDataConfiguratorService {
  update = jest.fn();
}

describe('RefreshTableActionHandlerService', () => {
  let service: RefreshTableActionHandlerService;
  let table: MockTable;
  let injector: MockInjector;
  let tableLocatorService: MockTableLocatorService;
  let tableDataConfiguratorService: MockTableDataConfiguratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockTable,
        MockInjector,
        MockTableLocatorService,
        MockTableDataConfiguratorService,
        {
          provide: TableLocatorService,
          useExisting: MockTableLocatorService,
        },
        {
          provide: TableDataConfiguratorService,
          useExisting: MockTableDataConfiguratorService,
        },
      ],
    });

    service = TestBed.inject(RefreshTableActionHandlerService);
    table = TestBed.inject(MockTable);
    injector = TestBed.inject(MockInjector);
    tableLocatorService = TestBed.inject(MockTableLocatorService);
    tableDataConfiguratorService = TestBed.inject(
      MockTableDataConfiguratorService,
    );

    injector.get.mockImplementation((instance) => {
      if (instance === TableLocatorService) {
        return tableLocatorService;
      }

      if (instance === TableDataConfiguratorService) {
        return tableDataConfiguratorService;
      }
    });
  });

  it('should update the table via TableDataConfiguratorService.update()', () => {
    service.handleAction(injector, mockActionsConfig, mockContext);

    expect(tableDataConfiguratorService.update).toHaveBeenCalledWith({});
  });

  it('should find the table by `tableId` via TableLocatorService.findById() and update via TableDataConfiguratorService.update()', () => {
    tableLocatorService.findById.mockReturnValue(table);
    table.injector.get.mockReturnValue(tableDataConfiguratorService);
    service.handleAction(
      injector,
      { tableId: 'mockId', ...mockActionsConfig },
      mockContext,
    );

    expect(tableLocatorService.findById).toHaveBeenCalledWith('mockId');
    expect(tableDataConfiguratorService.update).toHaveBeenCalledWith({});
  });

  it('should throw an error if table is not defined by `tableId`', () => {
    expect(() =>
      service.handleAction(
        injector,
        { tableId: 'mockId', ...mockActionsConfig },
        mockContext,
      ),
    ).toThrow();
  });

  it('should return stream that emits empty value', () => {
    const callback = jest.fn();

    const refreshTableActionService$ = service.handleAction(
      injector,
      mockActionsConfig,
      mockContext,
    );

    refreshTableActionService$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(undefined);
  });
});
