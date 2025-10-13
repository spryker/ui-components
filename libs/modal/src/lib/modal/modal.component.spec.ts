import { Component, Input, NO_ERRORS_SCHEMA, TemplateRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs';
import { ModalComponent } from './modal.component';
import { ModalService } from '../modal.service';
import { HtmlModalRenderingRef } from '../strategies/html.strategy';
import { ModalRef } from '../types';
import { TemplateModalContext } from '../strategies';

class MockModalRef {
    afterClosed$ = new ReplaySubject<void>(1);
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
    standalone: false,
    selector: 'spy-test-modal-component',
    template: ``,
})
class TestModalComponent {}

@Component({
    standalone: false,
    template: `
        <spy-modal [data]="data" [component]="component" (visibleChange)="visibleChange($event)">
            <ng-template> Content </ng-template>
        </spy-modal>
    `,
})
class HostComponent {
    @Input() data: any;
    @Input() component: any;
    visibleChange = jest.fn();
}

describe('ModalComponent', () => {
    let fixture: any;
    let service: MockModalService;

    let parentElement: HTMLElement;
    let renderFn: jest.Mock<any, any>;
    let htmlModalRenderingRef: HtmlModalRenderingRef<any>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ModalComponent, HostComponent, TestModalComponent],
            providers: [{ provide: ModalService, useExisting: MockModalService }, MockModalService],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        service = TestBed.inject(MockModalService);

        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();

        parentElement = document.createElement('div');
        document.body.appendChild(parentElement);
        const initial = document.createElement('div');
        initial.classList.add('initial');
        initial.innerHTML = '<p>Initial content</p>';
        parentElement.appendChild(initial);
        renderFn = jest.fn().mockReturnValue([initial]);
        htmlModalRenderingRef = new HtmlModalRenderingRef<any>(parentElement, [initial], renderFn);
    });

    afterEach(() => {
        if (parentElement && parentElement.parentElement) {
            document.body.removeChild(parentElement);
        }
    });

    const modalDe = () => fixture.debugElement.query(By.directive(ModalComponent));
    const modalCmp = () => modalDe().componentInstance as any;

    it('should render <spy-modal> component', () => {
        const de = fixture.debugElement.query(By.css('spy-modal'));
        expect(de).toBeTruthy();
    });

    it('should call `openTemplate` method from modalService if `open` method has been triggered', () => {
        const mockData = { test: 'data' };
        fixture.componentRef.setInput('data', mockData);
        fixture.detectChanges();

        modalCmp().open();

        expect(service.openTemplate).toHaveBeenCalledWith(modalCmp().templateRef, {
            data: mockData,
        });
    });

    it('should call `openComponent` method from modalService if @Input(component) assigned and `open` method has been triggered', () => {
        const mockData = { test: 'data' };
        fixture.componentRef.setInput('data', mockData);
        fixture.componentRef.setInput('component', TestModalComponent);
        fixture.detectChanges();

        expect(service.openComponent).toHaveBeenCalledWith(TestModalComponent, {
            data: mockData,
        });
    });

    it('should reopen modal when @Input(component) has been changed', () => {
        const mockData = { test: 'data' };
        const reAssignedMockData = { new: 'data' };
        const mockComponent = { component: 'component' };

        fixture.componentRef.setInput('data', mockData);
        fixture.componentRef.setInput('component', mockComponent as any);
        fixture.detectChanges();

        expect(service.openComponent).toHaveBeenCalledWith(mockComponent, {
            data: mockData,
        });

        fixture.componentRef.setInput('data', reAssignedMockData);
        fixture.componentRef.setInput('component', TestModalComponent);
        fixture.detectChanges();

        expect(service.openComponent).toHaveBeenCalledWith(TestModalComponent, {
            data: reAssignedMockData,
        });
    });

    it('should change `visible` prop to `true` when `open` method has been triggered', () => {
        modalCmp().open();
        expect(modalCmp().visible).toBe(true);
    });

    it('should emit @Output(visibleChange) with `true` parameter when `open` method has been triggered', () => {
        modalCmp().open();
        expect(fixture.componentInstance.visibleChange).toHaveBeenCalledWith(true);
    });

    it('should change `visible` prop to `false` when `close` method has been triggered if modal was opened', () => {
        modalCmp().open();
        modalCmp().close();
        expect(modalCmp().visible).toBe(false);
    });

    it('should emit @Output(visibleChange) with `false` parameter when `close` method has been triggered if drawer was opened', () => {
        modalCmp().open();
        modalCmp().close();
        expect(fixture.componentInstance.visibleChange).toHaveBeenCalledWith(false);
    });

    it('should call `close` method from `modalRef` and assign `modalRef` to `undefined` when `close` method has been triggered if modal was opened', () => {
        modalCmp().open();
        modalCmp().close();

        expect(service.modalRef.close).toHaveBeenCalled();
        expect(modalCmp().modalRef).toBeFalsy();
    });

    it('should emit @Output(visibleChange) with `false` parameter when and assign `modalRef` to `undefined` when `modalRef.afterClosed$` has been triggered', () => {
        modalCmp().open();
        modalCmp().modalRef.afterClosed$.next();

        expect(fixture.componentInstance.visibleChange).toHaveBeenCalledWith(false);
        expect(modalCmp().modalRef).toBeFalsy();
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
