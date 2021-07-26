import { Injectable, SecurityContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { UnsavedChangesMonitorToken } from '@spryker/unsaved-changes';
import { ContextService, WindowToken } from '@spryker/utils';

import { RedirectActionHandlerService } from './redirect-action-handler.service';

const mockActionsConfig = {
  type: 'redirect',
  url: 'mockUrl',
};
const mockContext = 'mockContext';

@Injectable()
class MockInjector {
  get = jest.fn();
}

const mockInterpolate = (value: string) => `Interpolated${value}`;

@Injectable()
class MockContextService {
  interpolate = jest.fn().mockImplementation(mockInterpolate);
}

@Injectable()
class MockWindowToken {
  location = {
    href: '',
  };
}

@Injectable()
class MockSanitizer {
  sanitize = jest.fn();
}

@Injectable()
class MockUnsavedChangesMonitorToken {
  reset = jest.fn();
}

describe('RedirectActionHandlerService', () => {
  let service: RedirectActionHandlerService;
  let injector: MockInjector;
  let contextService: MockContextService;
  let windowToken: MockWindowToken;
  let sanitizer: MockSanitizer;
  let unsavedChangesMonitor: MockUnsavedChangesMonitorToken;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockContextService,
        MockInjector,
        MockWindowToken,
        MockSanitizer,
        MockUnsavedChangesMonitorToken,
        {
          provide: UnsavedChangesMonitorToken,
          useExisting: MockUnsavedChangesMonitorToken,
        },
        {
          provide: DomSanitizer,
          useExisting: MockSanitizer,
        },
        {
          provide: ContextService,
          useExisting: MockContextService,
        },
        {
          provide: WindowToken,
          useExisting: MockWindowToken,
        },
      ],
    });

    service = TestBed.inject(RedirectActionHandlerService);
    injector = TestBed.inject(MockInjector);
    contextService = TestBed.inject(MockContextService);
    sanitizer = TestBed.inject(MockSanitizer);
    unsavedChangesMonitor = TestBed.inject(MockUnsavedChangesMonitorToken);
    windowToken = TestBed.inject(MockWindowToken);

    injector.get.mockImplementation((instance) => {
      if (instance === ContextService) {
        return contextService;
      }

      if (instance === DomSanitizer) {
        return sanitizer;
      }

      if (instance === UnsavedChangesMonitorToken) {
        return unsavedChangesMonitor;
      }

      if (instance === WindowToken) {
        return windowToken;
      }
    });
  });

  it('should process config.url via ContextService.interpolate()', () => {
    service.handleAction(injector, mockActionsConfig, mockContext);

    expect(contextService.interpolate).toHaveBeenCalledWith(
      mockActionsConfig.url,
      mockContext,
    );
  });

  it('should sanitize config.url via Sanitizer.sanitize() API with argument SecurityContext.URL and config.url after ContextService.interpolate()', () => {
    const internalActionsConfig = { ...mockActionsConfig };

    service.handleAction(injector, internalActionsConfig, mockContext);

    expect(contextService.interpolate).toHaveBeenCalledWith(
      internalActionsConfig.url,
      mockContext,
    );

    internalActionsConfig.url = mockInterpolate(internalActionsConfig.url);

    expect(sanitizer.sanitize).toHaveBeenCalledWith(
      SecurityContext.URL,
      internalActionsConfig.url,
    );
  });

  it('should call UnsavedChangesFormMonitorDirective.reset method', () => {
    service.handleAction(injector, mockActionsConfig, mockContext);

    expect(unsavedChangesMonitor.reset).toHaveBeenCalled();
  });

  it('should change location via WindowToken.location.href API after ContextService.interpolate() and Sanitizer.sanitize()', () => {
    const mockValueAfterSanitizing = 'mockValueAfterSanitizing';

    sanitizer.sanitize.mockReturnValue(mockValueAfterSanitizing);

    service.handleAction(injector, mockActionsConfig, mockContext);

    expect(windowToken.location.href).toBe(mockValueAfterSanitizing);
  });

  it('should return stream that emits empty value', () => {
    const callback = jest.fn();

    const redirectActionService$ = service.handleAction(
      injector,
      mockActionsConfig,
      mockContext,
    );

    redirectActionService$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(undefined);
  });
});
