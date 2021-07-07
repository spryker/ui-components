import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  TableDataConfiguratorService,
  CoreTableComponent,
} from '@spryker/table';

import { RefreshParentTableActionHandlerService } from './refresh-parent-table-action-handler.service';

const mockActionsConfig = {
  type: 'refresh_parent_table',
  url: 'mockUrl',
};
const mockContext = 'mockContext';

@Injectable()
class MockInjector {
  get = jest.fn();
}

@Injectable()
class MockParentTableInjector {
  get = jest.fn();
}

@Injectable()
class MockTableDataConfiguratorService {
  update = jest.fn();
}

describe('RefreshParentTableActionHandlerService', () => {
  let service: RefreshParentTableActionHandlerService;
  let injector: MockInjector;
  let parentTableInjector: MockParentTableInjector;
  let tableDataConfiguratorService: MockTableDataConfiguratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockInjector,
        MockParentTableInjector,
        MockTableDataConfiguratorService,
        {
          provide: TableDataConfiguratorService,
          useExisting: MockTableDataConfiguratorService,
        },
      ],
    });

    service = TestBed.inject(RefreshParentTableActionHandlerService);
    injector = TestBed.inject(MockInjector);
    tableDataConfiguratorService = TestBed.inject(
      MockTableDataConfiguratorService,
    );
    parentTableInjector = TestBed.inject(MockParentTableInjector);

    injector.get.mockReturnValue({
      parentTable: {
        injector: parentTableInjector,
      },
    });
  });

  it('should update the parent table via TableDataConfiguratorService.update()', () => {
    parentTableInjector.get.mockReturnValue(tableDataConfiguratorService);

    service.handleAction(injector, mockActionsConfig, mockContext);

    expect(tableDataConfiguratorService.update).toHaveBeenCalledWith({});
  });

  it('should return stream that emits empty value', () => {
    parentTableInjector.get.mockReturnValue(tableDataConfiguratorService);

    const callback = jest.fn();

    const redirectActionService$ = service.handleAction(
      injector,
      mockActionsConfig,
      mockContext,
    );

    redirectActionService$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(undefined);
  });
});
