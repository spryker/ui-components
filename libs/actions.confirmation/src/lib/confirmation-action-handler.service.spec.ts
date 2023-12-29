import { TestBed } from '@angular/core/testing';
import { ActionsService } from '@spryker/actions';
import { ModalService } from '@spryker/modal';
import { ContextService } from '@spryker/utils';
import { of } from 'rxjs';

import { ConfirmationActionHandlerService } from './confirmation-action-handler.service';
import { ConfirmationActionConfig } from './types';

const mockUrl = 'https://spryker.com';
const mockActionsConfig: ConfirmationActionConfig = {
    type: 'confirmation',
    action: {
        type: 'redirect',
        url: mockUrl,
    },
    modal: {
        description: 'Redirect to ${url}',
    },
};
const mockContext = {
    url: mockUrl,
};
const mockInterpolate = (value: string) => `Interpolated ${value}`;

class MockContextService {
    interpolate = jest.fn().mockImplementation(mockInterpolate);
}

class MockInjector {
    get = jest.fn();
}

class MockModalService {
    openConfirm = jest.fn().mockReturnValue({
        afterDismissed: jest.fn().mockReturnValue(of(true)),
    });
}

class MockActionsService {
    trigger = jest.fn().mockReturnValue(of(void 0));
}

describe('ConfirmationActionHandlerService', () => {
    let service: ConfirmationActionHandlerService;
    let actionsService: MockActionsService;
    let injector: MockInjector;
    let modalService: MockModalService;
    let contextService: MockContextService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MockActionsService,
                MockInjector,
                MockModalService,
                MockContextService,
                {
                    provide: ActionsService,
                    useExisting: MockActionsService,
                },
                {
                    provide: ModalService,
                    useExisting: MockModalService,
                },
                {
                    provide: ContextService,
                    useExisting: MockContextService,
                },
            ],
        });

        service = TestBed.inject(ConfirmationActionHandlerService);
        actionsService = TestBed.inject(MockActionsService);
        injector = TestBed.inject(MockInjector);
        modalService = TestBed.inject(MockModalService);
        contextService = TestBed.inject(MockContextService);

        injector.get.mockImplementation((instance) => {
            if (instance === ActionsService) {
                return actionsService;
            }

            if (instance === ContextService) {
                return contextService;
            }

            if (instance === ModalService) {
                return modalService;
            }
        });
    });

    it('should process `config.modal` text properties via `ContextService.interpolate()`', () => {
        const mockActionsConfigWithAllModalTexts = {
            ...mockActionsConfig,
            modal: {
                title: 'Mock title',
                description: 'Redirect to ${url}',
                okText: 'Mock ok text',
                cancelText: 'Mock cancel text',
            },
        };

        service.handleAction(injector, mockActionsConfigWithAllModalTexts, mockContext);

        expect(contextService.interpolate).toHaveBeenCalledWith(
            mockActionsConfigWithAllModalTexts.modal.title,
            mockContext,
        );
        expect(contextService.interpolate).toHaveBeenCalledWith(
            mockActionsConfigWithAllModalTexts.modal.description,
            mockContext,
        );
        expect(contextService.interpolate).toHaveBeenCalledWith(
            mockActionsConfigWithAllModalTexts.modal.okText,
            mockContext,
        );
        expect(contextService.interpolate).toHaveBeenCalledWith(
            mockActionsConfigWithAllModalTexts.modal.cancelText,
            mockContext,
        );
    });

    it('should call `ModalService.openConfirm` with interpolated `ModalData`', () => {
        service.handleAction(injector, mockActionsConfig, mockContext);

        const mockModalData = { ...mockActionsConfig.modal };
        mockModalData.description = mockInterpolate(mockModalData.description as string);

        expect(modalService.openConfirm).toHaveBeenCalledWith(mockModalData);
    });

    it('should call `ActionsService.trigger` according to `ConfirmationActionConfig.actions`', () => {
        service.handleAction(injector, mockActionsConfig, mockContext).subscribe();

        expect(actionsService.trigger).toHaveBeenCalledWith(injector, mockActionsConfig.action, mockContext);
    });

    it('should not call `ActionsService.trigger` without confirmation', () => {
        modalService.openConfirm.mockReturnValueOnce({
            afterDismissed: jest.fn().mockReturnValue(of(false)),
        });
        service.handleAction(injector, mockActionsConfig, mockContext).subscribe();

        expect(actionsService.trigger).not.toHaveBeenCalled();
    });
});
