import { TestBed } from '@angular/core/testing';
import { ActionsService } from './actions.service';
import { ActionsModule } from './actions.module';

const mockActionType = 'mockActionType';
const mockActionInvalidType = 'mockActionInvalidType';
const mockActionValue = 'mockActionValue';
const mockInjector = {} as any;
const mockContext = {} as any;

class MockActions {
  handleAction = jest.fn();
}

describe('ActionsService', () => {
  let service: ActionsService;
  let actions: MockActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ActionsModule.withActions({
          [mockActionType]: MockActions,
        }),
      ],
      providers: [MockActions],
    });

    service = TestBed.inject(ActionsService);
    actions = TestBed.inject(MockActions);
  });

  it('trigger method returns the result from call ActionHandler.handleAction() with arguments', () => {
    const mockConfig = {
      type: mockActionType,
    };

    actions.handleAction.mockReturnValue(mockActionValue);

    const serviceValue = service.trigger(mockInjector, mockConfig, mockContext);

    expect(actions.handleAction).toHaveBeenCalledWith(mockInjector, mockConfig, mockContext);
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
