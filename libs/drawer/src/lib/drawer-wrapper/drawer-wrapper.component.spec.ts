import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { DrawerWrapperComponent } from './drawer-wrapper.component';

describe('DrawerWrapperComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(DrawerWrapperComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
        projectContent: 'Content',
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should render `spy-drawer-wrapper__actions` and `spy-drawer-wrapper__content` elements', async () => {
        const host = await createComponent({}, true);
        const contentElem = host.queryCss('.spy-drawer-wrapper__content');
        const actionsElem = host.queryCss('.spy-drawer-wrapper__actions');

        expect(contentElem).toBeTruthy();
        expect(actionsElem).toBeTruthy();
    });

    it('should render content inside `spy-drawer-wrapper__content` element as content projection', async () => {
        const host = await createComponent({}, true);
        const contentElem = host.queryCss('.spy-drawer-wrapper__content');

        expect(contentElem.nativeElement.textContent).toContain('Content');
    });

    it('should show `spy-drawer-wrapper__action--close` button if @Input(closeable) is true', async () => {
        const host = await createComponent({ closeable: true }, true);
        const buttonElem = host.queryCss('.spy-drawer-wrapper__action--close');

        expect(buttonElem).toBeTruthy();
    });

    it('should not show `spy-drawer-wrapper__action--close` button if @Input(closeable) is false', async () => {
        const host = await createComponent({ closeable: false }, true);
        const buttonElem = host.queryCss('.spy-drawer-wrapper__action--close');

        expect(buttonElem).toBeFalsy();
    });

    it('should show `spy-drawer-wrapper__action--resize` button if @Input(resizable) is true', async () => {
        const host = await createComponent({ resizable: true }, true);
        const buttonElem = host.queryCss('.spy-drawer-wrapper__action--resize');

        expect(buttonElem).toBeTruthy();
    });

    it('should not show `spy-drawer-wrapper__action--resize` button if @Input(resizable) is false', async () => {
        const host = await createComponent({ resizable: false }, true);
        const buttonElem = host.queryCss('.spy-drawer-wrapper__action--resize');

        expect(buttonElem).toBeFalsy();
    });

    it('should bind @Input(width) to the `spy-drawer-wrapper` host element', async () => {
        const width = '20%';
        const host = await createComponent({ width: width }, true);
        const hostElem = host.queryCss('.spy-drawer-wrapper');

        expect(hostElem).toBeTruthy();
        expect(hostElem.styles.width).toBe(width);
    });

    it('should change `spy-drawer-wrapper` host element width when `spy-drawer-wrapper__action--resize` button has been triggered', async () => {
        const width = '20%';
        const host = await createComponent({ width: width, resizable: true }, true);
        const buttonElem = host.queryCss('.spy-drawer-wrapper__action--resize');
        const hostElem = host.queryCss('.spy-drawer-wrapper');

        expect(hostElem.styles.width).toBe(width);

        buttonElem.triggerEventHandler('click', null);
        host.detectChanges();

        expect(hostElem.nativeElement.classList).toContain('spy-drawer-wrapper--maximized');
        expect(hostElem.styles.width).toBe('100%');

        buttonElem.triggerEventHandler('click', null);
        host.detectChanges();

        expect(hostElem.styles.width).toBe(width);
    });

    it('should emit @Output(closed) when `spy-drawer-wrapper__action--close` button has been triggered', async () => {
        const host = await createComponent({ closeable: true }, true);
        const buttonElem = host.queryCss('.spy-drawer-wrapper__action--close');

        buttonElem.triggerEventHandler('click', null);

        expect(host.hostComponent.closed).toHaveBeenCalled();
    });
});
