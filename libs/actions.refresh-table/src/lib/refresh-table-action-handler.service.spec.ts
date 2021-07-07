import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TableDataConfiguratorService } from '@spryker/table';

import { RefreshTableActionHandlerService } from './refresh-table-action-handler.service';

const mockActionsConfig = {
  type: 'refresh_table',
  url: 'mockUrl',
};
const mockContext = 'mockContext';

@Injectable()
class MockInjector {
  get = jest.fn();
}

@Injectable()
class MockTableDataConfiguratorService {
  update = jest.fn();
}

describe('RefreshTableActionHandlerService', () => {
  let service: RefreshTableActionHandlerService;
  let injector: MockInjector;
  let tableDataConfiguratorService: MockTableDataConfiguratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockInjector,
        MockTableDataConfiguratorService,
        {
          provide: TableDataConfiguratorService,
          useExisting: MockTableDataConfiguratorService,
        },
      ],
    });

    service = TestBed.inject(RefreshTableActionHandlerService);
    injector = TestBed.inject(MockInjector);
    tableDataConfiguratorService = TestBed.inject(
      MockTableDataConfiguratorService,
    );

    injector.get.mockReturnValue(tableDataConfiguratorService);
  });

  it('should update the table via TableDataConfiguratorService.update()', () => {
    service.handleAction(injector, mockActionsConfig, mockContext);

    expect(tableDataConfiguratorService.update).toHaveBeenCalledWith({});
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
