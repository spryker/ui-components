import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActionsService } from '@spryker/actions';

import { TableActionsService } from './table-actions.service';

const mockAction = {
    action: {
        id: 'mockId',
        type: 'mock',
    },
    items: [],
};

class MockTableEventBus {
    emit = jest.fn();
}

class MockActionsService {
    isActionRegisteredType = jest.fn();
    trigger = jest.fn();
}

const mockInjector = 'mockInjector';

describe('TableActionsService', () => {
    let tableActionsService: TableActionsService;
    let actionService: MockActionsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TableActionsService,
                MockActionsService,
                {
                    provide: ActionsService,
                    useExisting: MockActionsService,
                },
                {
                    provide: Injector,
                    useValue: mockInjector,
                },
            ],
            teardown: { destroyAfterEach: false },
        });
        tableActionsService = TestBed.inject(TableActionsService);
        actionService = TestBed.inject(MockActionsService);

        tableActionsService.triggerAction$.next({} as any);
    });

    it('should call `trigger` method from ActionService if action was registered', () => {
        const mockContext = 'mockContext';

        actionService.isActionRegisteredType.mockReturnValue(true);

        const tableActionsService$ = tableActionsService.trigger(mockAction, mockContext);

        tableActionsService$.subscribe(() => {
            expect(actionService.trigger).toHaveBeenCalledWith(mockInjector, mockAction.action, mockContext);
        });
    });

    it('should call `emit` of TableEventBus if action was not registered', () => {
        tableActionsService._setEventBus(new MockTableEventBus() as any);
        actionService.isActionRegisteredType.mockReturnValue(false);

        tableActionsService.trigger(mockAction);

        expect(tableActionsService.tableEventBus?.emit).toHaveBeenCalledWith(
            'table',
            mockAction,
            mockAction.action.type,
        );
        expect(tableActionsService.tableEventBus?.emit).toHaveBeenCalledWith('table', mockAction);

        expect(actionService.trigger).not.toHaveBeenCalled();
    });
});
