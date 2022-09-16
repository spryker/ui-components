import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { ReplaySubject } from 'rxjs';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { ModalComponent } from './modal.component';
import { ModalService } from '../modal.service';

class MockModalRef {
    afterClosed$ = new ReplaySubject<void>();

    close = jest.fn();
    afterClosed = jest.fn().mockReturnValue(this.afterClosed$.asObservable());
}

class MockModalService {
    modalRef = new MockModalRef();

    openTemplate = jest.fn().mockReturnValue(this.modalRef);
    openComponent = jest.fn().mockReturnValue(this.modalRef);
}

@Component({
    selector: 'spy-test-modal-component',
    template: ``,
})
class TestModalComponent {}

describe('ModalComponent', () => {
    let service: MockModalService;

    const { testModule, createComponent } = getTestingForComponent(ModalComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
        projectContent: `<ng-template> Content </ng-template>`,
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            providers: [
                {
                    provide: ModalService,
                    useExisting: MockModalService,
                },
                MockModalService,
            ],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(MockModalService);
    });

    it('should render <spy-modal> component', async () => {
        const host = await createComponentWrapper(createComponent);
        const modalElem = host.queryCss('spy-modal');

        expect(modalElem).toBeTruthy();
    });

    it('should call `openTemplate` method from modalService if `open` method has been triggered', async () => {
        const mockData = { test: 'data' };
        const host = await createComponentWrapper(createComponent, { data: mockData });
        const modalElem = host.queryCss('spy-modal');

        modalElem.componentInstance.open();

        expect(service.openTemplate).toHaveBeenCalledWith(modalElem.componentInstance.templateRef, {
            data: mockData,
        });
    });

    it('should call `openComponent` method from modalService if @Input(component) assigned and `open` method has been triggered', async () => {
        const mockData = { test: 'data' };
        await createComponentWrapper(createComponent, { data: mockData, component: TestModalComponent });

        expect(service.openComponent).toHaveBeenCalledWith(TestModalComponent, {
            data: mockData,
        });
    });

    it('should reopen modal when @Input(component) has been changed', async () => {
        const mockData = { test: 'data' };
        const reAssignedMockData = { new: 'data' };
        const mockComponent = { component: 'component' };
        const host = await createComponentWrapper(createComponent, { data: mockData, component: mockComponent });

        expect(service.openComponent).toHaveBeenCalledWith(mockComponent, {
            data: mockData,
        });

        host.setInputs({ data: reAssignedMockData, component: TestModalComponent } as any, true);

        expect(service.openComponent).toHaveBeenCalledWith(TestModalComponent, {
            data: reAssignedMockData,
        });
    });

    it('should change `visible` prop to `true` when `open` method has been triggered', async () => {
        const host = await createComponentWrapper(createComponent);
        const modalElem = host.queryCss('spy-modal');

        modalElem.componentInstance.open();

        expect(modalElem.componentInstance.visible).toBe(true);
    });

    it('should emit @Output(visibleChange) with `true` parameter when `open` method has been triggered', async () => {
        const host = await createComponentWrapper(createComponent);
        const modalElem = host.queryCss('spy-modal');

        modalElem.componentInstance.open();

        expect(host.hostComponent.visibleChange).toHaveBeenCalledWith(true);
    });

    it('should change `visible` prop to `false` when `close` method has been triggered if modal was opened', async () => {
        const host = await createComponentWrapper(createComponent);
        const modalElem = host.queryCss('spy-modal');

        modalElem.componentInstance.open();
        modalElem.componentInstance.close();

        expect(modalElem.componentInstance.visible).toBe(false);
    });

    it('should emit @Output(visibleChange) with `false` parameter when `close` method has been triggered if drawer was opened', async () => {
        const host = await createComponentWrapper(createComponent);
        const modalElem = host.queryCss('spy-modal');

        modalElem.componentInstance.open();
        modalElem.componentInstance.close();

        expect(host.hostComponent.visibleChange).toHaveBeenCalledWith(false);
    });

    it('should call `close` method from `modalRef` and assign `modalRef` to `undefined` when `close` method has been triggered if modal was opened', async () => {
        const host = await createComponentWrapper(createComponent);
        const modalElem = host.queryCss('spy-modal');

        modalElem.componentInstance.open();
        modalElem.componentInstance.close();

        expect(service.modalRef.close).toHaveBeenCalled();
        expect(modalElem.componentInstance.modalRef).toBeFalsy();
    });

    it('should emit @Output(visibleChange) with `false` parameter when and assign `modalRef` to `undefined` when `modalRef.afterClosed$` has been triggered', async () => {
        const host = await createComponentWrapper(createComponent);
        const modalElem = host.queryCss('spy-modal');

        modalElem.componentInstance.open();
        modalElem.componentInstance.modalRef.afterClosed$.next();

        expect(host.hostComponent.visibleChange).toHaveBeenCalledWith(false);
        expect(modalElem.componentInstance.modalRef).toBeFalsy();
    });
});
