import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ModalRef } from '@spryker/modal';

import { RefreshModalActionHandlerService } from './refresh-modal-action-handler.service';
import { RefreshModalActionConfig } from './types';

const mockActionsConfig: RefreshModalActionConfig = {
    type: 'refresh-modal',
    data: { testKey: 'test-value' },
};

const mockContext = 'mockContext';

@Injectable()
class MockInjector {
    get = jest.fn();
}

@Injectable()
@Injectable()
class MockModalRef {
    updateData = jest.fn();
}

describe('RefreshModalActionHandlerService', () => {
    let service: RefreshModalActionHandlerService;
    let injector: MockInjector;
    let modalRef: MockModalRef;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MockInjector,
                MockModalRef,
                {
                    provide: ModalRef,
                    useExisting: MockModalRef,
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(RefreshModalActionHandlerService);
        injector = TestBed.inject(MockInjector);
        modalRef = TestBed.inject(MockModalRef);

        injector.get.mockImplementation((instance) => {
            if (instance === ModalRef) {
                return modalRef;
            }

            return null;
        });
    });

    it('should call `ModalRef.updateData()` with the provided data', () => {
        service.handleAction(injector, mockActionsConfig, mockContext);

        expect(modalRef.updateData).toHaveBeenCalledWith(mockActionsConfig.data);
    });

    it('should return stream that emits void', () => {
        const callback = jest.fn();
        const refreshModalActionService$ = service.handleAction(injector, mockActionsConfig, mockContext);

        refreshModalActionService$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(undefined);
    });
});
