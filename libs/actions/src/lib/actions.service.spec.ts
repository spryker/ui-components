import { TestBed } from '@angular/core/testing';
import { ActionsService } from './actions.service';
import { ActionsModule } from './actions.module';

const mockActionType = 'mockActionType';
const mockActionInvalidType = 'mockActionInvalidType';
const mockActionValue = 'mockActionValue';
const mockInjector = {} as any;
const mockContext = {} as any;

class MockActionHandler {
  handleAction = jest.fn();
}

describe('ActionsService', () => {
  let service: ActionsService;
  let mockActionHandler: MockActionHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ActionsModule.withActions({
          [mockActionType]: MockActionHandler,
        }),
      ],
      providers: [MockActionHandler],
      teardown: { destroyAfterEach: false },
    });

    service = TestBed.inject(ActionsService);
    mockActionHandler = TestBed.inject(MockActionHandler);
  });

  it('trigger method returns the result from call ActionHandler.handleAction() with arguments', () => {
    const mockConfig = {
      type: mockActionType,
    };

    mockActionHandler.handleAction.mockReturnValue(mockActionValue);

    const serviceValue = service.trigger(mockInjector, mockConfig, mockContext);

    expect(mockActionHandler.handleAction).toHaveBeenCalledWith(
      mockInjector,
      mockConfig,
      mockContext,
    );
    expect(serviceValue).toBe(mockActionValue);
  });

  it('throw an error if no Actions found', () => {
    const mockConfig = {
      type: mockActionInvalidType,
    };

    expect(() => {
      service.trigger(mockInjector, mockConfig, mockContext);
    }).toThrow();
  });
});
