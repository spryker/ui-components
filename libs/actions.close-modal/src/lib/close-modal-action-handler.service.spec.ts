import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ModalRef } from '@spryker/modal';
import { CloseModalActionHandlerService } from './close-modal-action-handler.service';

const mockContext = 'mockContext';

@Injectable()
class MockInjector {
    get = jest.fn();
}

@Injectable()
class MockModalRef {
    close = jest.fn();
}

describe('CloseModalActionHandlerService', () => {
    let service: CloseModalActionHandlerService;
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

        service = TestBed.inject(CloseModalActionHandlerService);
        injector = TestBed.inject(MockInjector);
        modalRef = TestBed.inject(MockModalRef);

        injector.get.mockImplementation((instance) => {
            if (instance === ModalRef) {
                return modalRef;
            }

            return null;
        });
    });

    it('should call `ModalRef.close()` method without result', () => {
        service.handleAction(injector, { type: 'close-modal' }, mockContext);

        expect(modalRef.close).toHaveBeenCalledWith(undefined);
    });

    it('should call `ModalRef.close()` method with result', () => {
        service.handleAction(injector, { type: 'close-modal', result: 'test-result' }, mockContext);

        expect(modalRef.close).toHaveBeenCalledWith('test-result');
    });

    it('should return stream that emits empty value', () => {
        const callback = jest.fn();
        const closeModalActionService$ = service.handleAction(injector, { type: 'close-modal' }, mockContext);

        closeModalActionService$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(undefined);
    });
});
