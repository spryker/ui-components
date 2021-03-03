import { Injector, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { ButtonActionComponent } from './button-action.component';
import { ActionsModule, ActionsService } from '@spryker/actions';

const mockConfig = {
  type: 'type',
  component: 'component',
  options: {
    inputs: {
      url: '/html-request'
    }
  }
}
const mockContext = {} as any;

class MockInjector implements Injector {
  get = jest.fn();
}

class MockActionService implements Partial<ActionsService> {
  trigger = jest.fn();
}

describe('ButtonActionComponent', () => {
  let mockActionService: MockActionService;
  let mockInjector: MockInjector;

  const { testModule, createComponent } = getTestingForComponent(
    ButtonActionComponent,
    {
      ngModule: { schemas: [NO_ERRORS_SCHEMA] },
      projectContent: 'Content',
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        testModule,
      ],
      providers: [
        MockActionService,
        MockInjector,
        {
          provide: ActionsService,
          useExisting: MockActionService
        },
        {
          provide: Injector,
          useExisting: MockInjector
        }
      ],
    });

    mockActionService = TestBed.inject(MockActionService);
    mockInjector = TestBed.inject(MockInjector);
  });

  it('should render <spy-button-action>', async () => {
    const host = await createComponent({}, true);
    const buttonActionElem = host.queryCss('spy-button-action');

    expect(buttonActionElem).toBeTruthy();
  });

  it('should call trigger() method by <spy-button> click', async () => {
    const host = await createComponent({ action: mockConfig, actionContext: mockContext }, true);
    const buttonElem = host.queryCss('spy-button');

    buttonElem?.triggerEventHandler('click', {});
    expect(mockActionService.trigger).toHaveBeenCalled();
  });

  it('should render projected content inside <spy-button>', async () => {
    const host = await createComponent({}, true);
    const buttonElem = host.queryCss('spy-button');

    expect(buttonElem?.nativeElement.textContent).toMatch('Content');
  });
});
