import { TestBed } from '@angular/core/testing';
import { ContextService } from '@spryker/utils';
import { DrawerOptionsComponent, DrawerOptionsTemplate, DrawerRef, DrawerService } from '@spryker/drawer';
import { of } from 'rxjs';

import { DrawerActionHandlerService } from './drawer-action-handler.service';
import { DrawerActionModule } from './drawer-action.module';
import { DrawerActionConfigComponent, DrawerActionConfigTemplate } from './types';

const mockActionType = 'mockActionType';
const mockActionInvalidType = 'mockActionInvalidType';
const mockContext = {} as any;

class MockActionHandler {
    handleAction = jest.fn();
}

class MockInjector {
    get = jest.fn();
}

class MockDrawerService implements Partial<DrawerService> {
    openComponent = jest.fn();
    openTemplate = jest.fn();
}

class MockContextService implements Partial<ContextService> {
    interpolate = jest.fn();
}

class MockDrawerRef implements Partial<DrawerRef> {
    afterClosed = jest.fn().mockReturnValue(of(void 0));
}

describe('DrawerActionHandlerService', () => {
    let service: DrawerActionHandlerService;
    let mockActionHandler: MockActionHandler;
    let mockInjector: MockInjector;
    let mockContextService: MockContextService;
    let mockDrawerService: MockDrawerService;
    let mockDrawerRef: MockDrawerRef;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                DrawerActionModule.withComponents({
                    [mockActionType]: MockActionHandler,
                }),
            ],
            providers: [
                MockActionHandler,
                MockInjector,
                MockDrawerService,
                MockContextService,
                MockDrawerRef,
                {
                    provide: ContextService,
                    useExisting: MockContextService,
                },
                {
                    provide: DrawerService,
                    useExisting: MockDrawerService,
                },
            ],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(DrawerActionHandlerService);
        mockActionHandler = TestBed.inject(MockActionHandler);
        mockInjector = TestBed.inject(MockInjector);
        mockContextService = TestBed.inject(MockContextService);
        mockDrawerService = TestBed.inject(MockDrawerService);
        mockDrawerRef = TestBed.inject(MockDrawerRef);

        mockInjector.get.mockReturnValue(mockDrawerService);
    });

    it('should call openComponent() with arguments for component config', () => {
        const callback = jest.fn();
        const mockConfig: DrawerActionConfigComponent = {
            type: mockActionType,
            component: mockActionType,
            options: {},
        };
        const options = new DrawerOptionsComponent({
            inputs: {},
            injector: mockInjector,
        });
        const serviceObservable$ = service.handleAction(mockInjector, mockConfig, mockContext);

        serviceObservable$.subscribe(callback);

        expect(mockDrawerService.openComponent).toHaveBeenCalledWith(MockActionHandler, options);
    });

    it('should call openTemplate() with arguments for template config', () => {
        const callback = jest.fn();
        const mockConfig: DrawerActionConfigTemplate = {
            type: mockActionType,
            template: mockActionType as any,
            options: {},
        };
        const options = new DrawerOptionsTemplate({
            context: {},
        });
        const serviceObservable$ = service.handleAction(mockInjector, mockConfig, mockContext);

        serviceObservable$.subscribe(callback);

        expect(mockDrawerService.openTemplate).toHaveBeenCalledWith(mockActionType, options);
    });

    it('handleAction() should return callback function with arguments', () => {
        const callback = jest.fn();
        const mockConfig: DrawerActionConfigComponent = {
            type: mockActionType,
            component: mockActionType,
            options: {},
        };

        mockDrawerService.openComponent.mockReturnValue(mockDrawerRef);

        const serviceObservable$ = service.handleAction(mockInjector, mockConfig, mockContext);

        serviceObservable$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(mockDrawerRef);
    });

    it('should throw an error if component does not exist', () => {
        const callback = jest.fn();
        const mockConfig = {
            type: mockActionType,
            component: mockActionInvalidType,
        };
        const serviceObservable$ = service.handleAction(mockInjector, mockConfig, mockContext);

        serviceObservable$.subscribe({ error: callback });

        expect(callback).toHaveBeenCalledWith(
            new Error(`DrawerActionHandlerService: ${mockConfig.component} component not found`),
        );
    });
});
