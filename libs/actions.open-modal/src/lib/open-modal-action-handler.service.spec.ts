import { Injectable, NO_ERRORS_SCHEMA, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ModalService } from '@spryker/modal';

import { OpenModalActionHandlerService } from './open-modal-action-handler.service';

class TestComponent {}

const mockActionsConfig = {
    type: 'open-modal',
};

const mockActionsConfigWithComponent = {
    type: 'open-modal',
    component: TestComponent,
};

const mockActionsConfigWithData = {
    type: 'open-modal',
    component: TestComponent,
    data: { test: 'data' },
};

const mockActionsConfigWithId = {
    type: 'open-modal',
    component: TestComponent,
    id: 'test-modal-id',
};

class MockTemplateRef extends TemplateRef<unknown> {
    elementRef = {} as ElementRef;
    createEmbeddedView(_context: unknown): any {
        return {};
    }
}

const mockTemplateRef = new MockTemplateRef();
const mockActionsConfigWithTemplate = {
    type: 'open-modal',
    template: mockTemplateRef,
    data: { info: 'template-data' },
};
const mockActionsConfigWithConfirm = {
    type: 'open-modal',
    confirm: { title: 'Confirm', message: 'Are you sure?' },
    data: { confirm: true },
};

const mockContext = 'mockContext';

@Injectable()
class MockInjector {
    get = jest.fn();
}

@Injectable()
class MockModalService {
    openComponent = jest.fn();
    openTemplate = jest.fn();
    openConfirm = jest.fn();
}

describe('OpenModalActionHandlerService', () => {
    let service: OpenModalActionHandlerService;
    let injector: MockInjector;
    let modalService: MockModalService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MockInjector,
                MockModalService,
                {
                    provide: ModalService,
                    useExisting: MockModalService,
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(OpenModalActionHandlerService);
        injector = TestBed.inject(MockInjector);
        modalService = TestBed.inject(MockModalService);

        injector.get.mockImplementation((instance) => {
            if (instance === ModalService) {
                return modalService;
            }

            return null;
        });
    });

    it('should not call `ModalService.openComponent()` when no component is provided', () => {
        service.handleAction(injector, mockActionsConfig, mockContext);

        expect(modalService.openComponent).not.toHaveBeenCalled();
    });

    it('should call `ModalService.openComponent()` with component', () => {
        const mockModalRef = {};
        modalService.openComponent.mockReturnValue(mockModalRef);
        service.handleAction(injector, mockActionsConfigWithComponent, mockContext);
        expect(modalService.openComponent).toHaveBeenCalledWith(TestComponent, { data: undefined });
    });

    it('should call `ModalService.openComponent()` with component and data', () => {
        const mockModalRef = {};
        modalService.openComponent.mockReturnValue(mockModalRef);
        service.handleAction(injector, mockActionsConfigWithData, mockContext);
        expect(modalService.openComponent).toHaveBeenCalledWith(TestComponent, { data: { test: 'data' } });
    });

    it('should call `ModalService.openComponent()` with component and id', () => {
        const mockModalRef = {};
        modalService.openComponent.mockReturnValue(mockModalRef);
        service.handleAction(injector, mockActionsConfigWithId, mockContext);
        expect(modalService.openComponent).toHaveBeenCalledWith(TestComponent, { data: undefined });
    });

    it('should call `ModalService.openTemplate()` with template and data', () => {
        service.handleAction(injector, mockActionsConfigWithTemplate, mockContext);

        expect(modalService.openTemplate).toHaveBeenCalledWith(
            mockTemplateRef,
            expect.objectContaining({ data: { info: 'template-data' } }),
        );
    });

    it('should call `ModalService.openConfirm()` with confirm options and data', () => {
        service.handleAction(injector, mockActionsConfigWithConfirm, mockContext);

        expect(modalService.openConfirm).toHaveBeenCalledWith(
            expect.objectContaining({ title: 'Confirm', message: 'Are you sure?', data: { confirm: true } }),
        );
    });

    it('should return stream that emits empty value', () => {
        const callback = jest.fn();
        const openModalActionService$ = service.handleAction(injector, mockActionsConfig, mockContext);

        openModalActionService$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(undefined);
    });
});
