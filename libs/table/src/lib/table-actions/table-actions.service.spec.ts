import { TestBed } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { TableActionsService } from './table-actions.service';
import { TableModule } from '../table.module';

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
    tableActionsService.trigger(mockAction as any);

    expect(
      tableFormOverlayActionHandlerService.handleAction,
    ).toHaveBeenCalledWith(mockAction, injector);
  });

  it('should call `emit` of TableEventBus if actionHandler undefined', () => {
    const mockTableEventBus = new MockTableEventBus();

    tableActionsService._setEventBus(mockTableEventBus as any);
    tableActionsService.trigger(mockActionWithoutType as any);

    expect(mockTableEventBus.emit).toHaveBeenCalledWith(
      'table',
      mockActionWithoutType,
      mockActionWithoutType.action.type,
    );
    expect(mockTableEventBus.emit).toHaveBeenCalledWith(
      'table',
      mockActionWithoutType,
    );

    expect(
      tableFormOverlayActionHandlerService.handleAction,
    ).not.toHaveBeenCalled();
  });
});
