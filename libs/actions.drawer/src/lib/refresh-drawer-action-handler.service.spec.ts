import { TestBed } from '@angular/core/testing';

import { DrawerActionHandlerService } from './refresh-drawer-action-handler.service';
import { DrawerActionModule } from './actions-drawer.module';
import { DrawerActionConfigComponent } from './types';
import { Injector } from '@angular/core';

const mockActionType = 'mockActionType';
const mockActionValue = 'mockActionValue';
// const mockInjector = {} as Injector;
const mockContext = {} as any;

class MockInjector {
  get = jest.fn();
}

class MockActionHandler {
  handleAction = jest.fn();
}

describe('DrawerActionHandlerService', () => {
  let service: DrawerActionHandlerService;
  let mockActionHandler: MockActionHandler;
  let mockInjector: MockInjector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DrawerActionModule.withComponents({
          [mockActionType]: MockActionHandler,
        }),
      ],
      providers: [MockActionHandler, MockInjector],
    });

    service = TestBed.inject(DrawerActionHandlerService);
    mockActionHandler = TestBed.inject(MockActionHandler);
    mockInjector = TestBed.inject(MockInjector);
  });

  it('should be created', () => {
    const mockConfig = {
      component: mockActionType,
    };

    // mockActionHandler.handleAction.mockReturnValue(mockActionValue);

    service.handleAction(mockInjector, mockConfig as DrawerActionConfigComponent, mockContext)

    expect(service).toBeTruthy();
  });
});
