import { TestBed } from '@angular/core/testing';

import { ActionsService } from '@spryker/actions';
import { AjaxActionService } from './ajax-action.service';
import { of } from 'rxjs';

const mockActionsConfig = [
    {
        type: 'action1',
    },
    {
        type: 'action2',
    },
];

const mockResponse = {
    actions: mockActionsConfig,
};

class MockActionsService {
    trigger = jest.fn().mockReturnValue(of(void 0));
}

class MockInjector {
    get = jest.fn();
}

describe('AjaxActionService', () => {
    let ajaxActionService: AjaxActionService;
    let actionService: MockActionsService;
    let injector: MockInjector;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AjaxActionService,
                MockActionsService,
                MockInjector,
                {
                    provide: ActionsService,
                    useExisting: MockActionsService,
                },
            ],
            teardown: { destroyAfterEach: false },
        });
        ajaxActionService = TestBed.inject(AjaxActionService);
        actionService = TestBed.inject(MockActionsService);
        injector = TestBed.inject(MockInjector);

        injector.get.mockReturnValue(actionService);
    });

    it('should call ActionsService for every ActionConfig from AjaxActionResponse.actions', () => {
        const mockContext = 'mockContext';

        ajaxActionService.handle(mockResponse, injector, mockContext);

        for (const action of mockActionsConfig) {
            expect(actionService.trigger).toHaveBeenCalledWith(injector, action, mockContext);
        }
    });

    it('should not call ActionsService if AjaxActionResponse.actions does not exist', () => {
        const mockContext = 'mockContext';

        ajaxActionService.handle({}, injector, mockContext);

        expect(actionService.trigger).not.toHaveBeenCalled();
    });
});
