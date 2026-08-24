import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    NO_ERRORS_SCHEMA,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ComponentModal, ComponentModalStrategy } from './component.strategy';
import { ModalRef } from '../types';

interface TestModalData {
    title: string;
}

/**
 * Deliberately `OnPush` — which is what Angular 22 makes every component that does not say
 * otherwise. The point of this suite is that `ComponentRef.changeDetectorRef` is a `ViewRef`
 * over the *host root* `LView`, not the component's own, so
 * `componentRef.changeDetectorRef.detectChanges()` is a no-op once the view has been checked
 * once. It only appears to work while the view is still creation-dirty.
 */
@Component({
    standalone: false,
    selector: 'spy-test-component-modal',
    template: `<div class="title">{{ title }}</div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponentModal implements ComponentModal {
    title = '';

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setModalRef(): void {}

    updateModalData(data: TestModalData): void {
        this.title = data.title;
    }
}

@Component({
    standalone: false,
    template: `<ng-container #vcr></ng-container>`,
})
class HostComponent {
    @ViewChild('vcr', { read: ViewContainerRef, static: true }) vcr!: ViewContainerRef;
}

class MockModalRef extends ModalRef<TestComponentModal, any> {
    getData = jest.fn();
    updateData = jest.fn();
    close = jest.fn();
    afterClosed = jest.fn();
    afterCancelled = jest.fn();
    afterDismissed = jest.fn();
    reset = jest.fn();
    updateHtml = jest.fn();
}

describe('ComponentModalStrategy', () => {
    let fixture: any;
    let host: HostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HostComponent, TestComponentModal],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    const renderedTitle = () => fixture.debugElement.query(By.css('.title'))?.nativeElement.textContent.trim();

    it('should render the component modal', () => {
        const strategy = new ComponentModalStrategy<TestComponentModal>(TestComponentModal);

        strategy.render(host.vcr, new MockModalRef());
        fixture.detectChanges();

        expect(renderedTitle()).toBe('');
    });

    it('should re-render an OnPush component modal after `updateData()`', () => {
        const strategy = new ComponentModalStrategy<TestComponentModal>(TestComponentModal);
        const renderingRef = strategy.render(host.vcr, new MockModalRef());

        // Check the view once, so it is no longer creation-dirty. This is the state every
        // real modal is in by the time a consumer calls `ModalRef.updateData()`.
        fixture.detectChanges();
        expect(renderedTitle()).toBe('');

        renderingRef.updateData({ title: 'updated' });
        fixture.detectChanges();

        expect(renderedTitle()).toBe('updated');
    });

    it('`ComponentRef.changeDetectorRef.detectChanges()` alone cannot refresh an OnPush component', () => {
        const strategy = new ComponentModalStrategy<TestComponentModal>(TestComponentModal);
        const renderingRef = strategy.render(host.vcr, new MockModalRef());
        const componentRef = renderingRef.getExtras().getComponentRef();

        fixture.detectChanges();

        componentRef.instance.updateModalData({ title: 'updated' });
        componentRef.changeDetectorRef.detectChanges();

        // The host root view is clean and OnPush, so `shouldRefreshView` refuses it.
        expect(renderedTitle()).toBe('');

        componentRef.injector.get(ChangeDetectorRef).markForCheck();
        fixture.detectChanges();

        expect(renderedTitle()).toBe('updated');
    });
});
