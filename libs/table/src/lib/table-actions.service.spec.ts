import { TestBed } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { TableActionsService } from './table-actions.service';
import { TableModule } from './table.module';

const mockActionsHandleType = 'mock';

const mockAction = {
  action: {
    id: 'mockId',
    type: mockActionsHandleType,
  },
  items: [],
};

const mockActionWithoutType = {
  action: {
    id: 'mockId',
    type: '',
  },
  items: [],
};

class MockTableFormOverlayActionHandlerService {
  handleAction = jest.fn();
}

class MockTableEventBus {
  emit = jest.fn();
}

describe('TableActionsService', () => {
  let tableActionsService: TableActionsService;
  let tableFormOverlayActionHandlerService: MockTableFormOverlayActionHandlerService;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TableModule.withActions({
          [mockActionsHandleType]: MockTableFormOverlayActionHandlerService,
        }),
      ],
      providers: [
        TableActionsService,
        MockTableFormOverlayActionHandlerService,
      ],
    });
    tableActionsService = TestBed.inject(TableActionsService);
    tableFormOverlayActionHandlerService = TestBed.inject(
      MockTableFormOverlayActionHandlerService,
    );
    injector = TestBed.inject(Injector);
  });

  it('should call `handleAction` method from FormOverlayActionHandlerService if actionHandler was found', () => {
    tableActionsService.handle(mockAction as any);

    expect(
      tableFormOverlayActionHandlerService.handleAction,
    ).toHaveBeenCalledWith(mockAction);
  });

  it('should call `emit` of TableEventBus if actionHandler undefined', () => {
    tableActionsService._setEventBus(new MockTableEventBus() as any);
    tableActionsService.handle(mockActionWithoutType as any);

    expect(tableActionsService.tableEventBus?.emit).toHaveBeenCalledWith(
      'table',
      mockActionWithoutType,
      mockActionWithoutType.action.type,
    );
    expect(tableActionsService.tableEventBus?.emit).toHaveBeenCalledWith(
      'table',
      mockActionWithoutType,
    );

    expect(
      tableFormOverlayActionHandlerService.handleAction,
    ).not.toHaveBeenCalled();
  });
});
