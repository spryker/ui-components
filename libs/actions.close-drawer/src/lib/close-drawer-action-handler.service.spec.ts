import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DrawerRef } from '@spryker/drawer';
import { UnsavedChangesFormMonitorDirective } from '@spryker/unsaved-changes.monitor.form';
import { CloseDrawerActionHandlerService } from './close-drawer-action-handler.service';

const mockActionsConfig = {
  type: 'close_drawer',
};
const mockContext = 'mockContext';

@Injectable()
class MockInjector {
  get = jest.fn();
}

@Injectable()
class MockUnsavedChangesFormMonitorDirective {
  reset = jest.fn();
}

@Injectable()
class MockDrawerRef {
  close = jest.fn();
}

describe('CloseDrawerActionHandlerService', () => {
  let service: CloseDrawerActionHandlerService;
  let injector: MockInjector;
  let unsavedChangesFormMonitorDirective: MockUnsavedChangesFormMonitorDirective;
  let drawerRef: MockDrawerRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockInjector,
        MockUnsavedChangesFormMonitorDirective,
        MockDrawerRef,
        {
          provide: UnsavedChangesFormMonitorDirective,
          useExisting: MockUnsavedChangesFormMonitorDirective,
        },
        {
          provide: DrawerRef,
          useExisting: MockDrawerRef,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    service = TestBed.inject(CloseDrawerActionHandlerService);
    injector = TestBed.inject(MockInjector);
    unsavedChangesFormMonitorDirective = TestBed.inject(
      MockUnsavedChangesFormMonitorDirective,
    );
    drawerRef = TestBed.inject(MockDrawerRef);

    injector.get.mockImplementation((instance) => {
      if (
        instance.toString() === UnsavedChangesFormMonitorDirective.toString()
      ) {
        return unsavedChangesFormMonitorDirective;
      }

      if (instance.toString() === DrawerRef.toString()) {
        return drawerRef;
      }
    });
  });

  it('should call `UnsavedChangesFormMonitorDirective.reset()` method', () => {
    service.handleAction(injector, mockActionsConfig, mockContext);

    expect(unsavedChangesFormMonitorDirective.reset).toHaveBeenCalled();
  });

  it('should call `DrawerRef.close()` method', () => {
    service.handleAction(injector, mockActionsConfig, mockContext);

    expect(drawerRef.close).toHaveBeenCalled();
  });

  it('should return stream that emits empty value', () => {
    const callback = jest.fn();
    const closeDrawerActionService$ = service.handleAction(
      injector,
      mockActionsConfig,
      mockContext,
    );

    closeDrawerActionService$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(undefined);
  });
});
