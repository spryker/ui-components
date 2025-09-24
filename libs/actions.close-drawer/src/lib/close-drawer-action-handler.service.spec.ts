import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DrawerRef } from '@spryker/drawer';
import { UnsavedChangesMonitorToken } from '@spryker/unsaved-changes';

import { CloseDrawerActionHandlerService } from './close-drawer-action-handler.service';

const mockActionsConfig = {
    type: 'close-drawer',
};
const mockContext = 'mockContext';

@Injectable()
class MockInjector {
    get = jest.fn();
}

@Injectable()
class MockUnsavedChangesMonitorToken {
    reset = jest.fn();
}

@Injectable()
class MockDrawerRef {
    close = jest.fn();
}

describe('CloseDrawerActionHandlerService', () => {
    let service: CloseDrawerActionHandlerService;
    let injector: MockInjector;
    let unsavedChangesMonitor: MockUnsavedChangesMonitorToken;
    let drawerRef: MockDrawerRef;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MockInjector,
                MockUnsavedChangesMonitorToken,
                MockDrawerRef,
                {
                    provide: UnsavedChangesMonitorToken,
                    useExisting: MockUnsavedChangesMonitorToken,
                },
                {
                    provide: DrawerRef,
                    useExisting: MockDrawerRef,
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(CloseDrawerActionHandlerService);
        injector = TestBed.inject(MockInjector);
        unsavedChangesMonitor = TestBed.inject(MockUnsavedChangesMonitorToken);
        drawerRef = TestBed.inject(MockDrawerRef);

        injector.get.mockImplementation((instance) => {
            if (instance === UnsavedChangesMonitorToken) {
                return unsavedChangesMonitor;
            }

            if (instance === DrawerRef) {
                return drawerRef;
            }
        });
    });

    it('should call `UnsavedChangesFormMonitorDirective.reset()` method', () => {
        service.handleAction(injector, mockActionsConfig, mockContext);

        expect(unsavedChangesMonitor.reset).toHaveBeenCalled();
    });

    it('should call `DrawerRef.close()` method', () => {
        service.handleAction(injector, mockActionsConfig, mockContext);

        expect(drawerRef.close).toHaveBeenCalled();
    });

    it('should return stream that emits empty value', () => {
        const callback = jest.fn();
        const closeDrawerActionService$ = service.handleAction(injector, mockActionsConfig, mockContext);

        closeDrawerActionService$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(undefined);
    });
});
