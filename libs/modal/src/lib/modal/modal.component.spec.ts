import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { ReplaySubject } from 'rxjs';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { ModalComponent } from './modal.component';
import { ModalService } from '../modal.service';
import { HtmlModalRenderingRef } from '../strategies/html.strategy';

class MockModalRef {
    afterClosed$ = new ReplaySubject<void>();

    close = jest.fn();
    afterClosed = jest.fn().mockReturnValue(this.afterClosed$.asObservable());
    updateHtml = jest.fn();
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
    let parentElement: HTMLElement;
    let renderFn: any;
    let htmlModalRenderingRef: HtmlModalRenderingRef<any>;

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

        parentElement = document.createElement('div');
        document.body.appendChild(parentElement);

        const initialElements = [document.createElement('div')];
        initialElements[0].innerHTML = '<p>Initial content</p>';
        initialElements[0].classList.add('initial');
        parentElement.appendChild(initialElements[0]);

        renderFn = jest.fn().mockReturnValue(initialElements);

        htmlModalRenderingRef = new HtmlModalRenderingRef<any>(parentElement, initialElements, renderFn);
    });

    afterEach(() => {
        if (parentElement && parentElement.parentElement) {
            document.body.removeChild(parentElement);
        }
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

    it('should replace HTML content with string HTML when updateHtml is called', () => {
        const newHtml = '<div class="new-content"><p>New content</p></div>';

        htmlModalRenderingRef.updateHtml(newHtml);

        const newElement = parentElement.querySelector('.new-content');
        expect(newElement).toBeTruthy();
        expect(parentElement.querySelector('.initial')).toBeFalsy();
        expect(newElement?.textContent).toContain('New content');
    });

    it('should replace HTML content with HTMLElement when updateHtml is called', () => {
        const newElement = document.createElement('div');
        newElement.classList.add('element-content');
        newElement.innerHTML = '<p>Element content</p>';

        htmlModalRenderingRef.updateHtml(newElement);

        const insertedElement = parentElement.querySelector('.element-content');
        expect(insertedElement).toBeTruthy();
        expect(parentElement.querySelector('.initial')).toBeFalsy();
        expect(insertedElement?.textContent).toContain('Element content');
    });

    it('should replace HTML content with Node when updateHtml is called', () => {
        const textNode = document.createTextNode('Text node content');

        htmlModalRenderingRef.updateHtml(textNode);

        expect(parentElement.querySelector('.initial')).toBeFalsy();
        expect(parentElement.textContent).toContain('Text node content');
    });

    it('should remove old elements when replacing content with updateHtml', () => {
        const oldElement = parentElement.querySelector('.initial');
        expect(oldElement).toBeTruthy();

        htmlModalRenderingRef.updateHtml('<div>New content</div>');

        expect(parentElement.querySelector('.initial')).toBeFalsy();
    });
});
