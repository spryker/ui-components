import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DrawerRef } from '@spryker/drawer';
import { RefreshDrawerActionHandlerService } from './refresh-drawer-action-handler.service';

const mockActionsConfig = {
    type: 'refresh-drawer',
};
const mockContext = 'mockContext';

@Injectable()
class MockInjector {
    get = jest.fn();
}

@Injectable()
class MockDrawerRef {
    refreshDrawer = jest.fn();
}

describe('RefreshDrawerActionHandlerService', () => {
    let service: RefreshDrawerActionHandlerService;
    let injector: MockInjector;
    let drawerRef: MockDrawerRef;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MockInjector,
                MockDrawerRef,
                {
                    provide: DrawerRef,
                    useExisting: MockDrawerRef,
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(RefreshDrawerActionHandlerService);
        injector = TestBed.inject(MockInjector);
        drawerRef = TestBed.inject(MockDrawerRef);

        injector.get.mockReturnValue(drawerRef);
    });

    it('should call `DrawerRef.refreshDrawer()` method', () => {
        service.handleAction(injector, mockActionsConfig, mockContext);

        expect(drawerRef.refreshDrawer).toHaveBeenCalled();
    });

    it('should return stream that emits empty value', () => {
        const callback = jest.fn();
        const refreshDrawerActionService$ = service.handleAction(injector, mockActionsConfig, mockContext);

        refreshDrawerActionService$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(undefined);
    });
});
