import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { ButtonToggleComponent } from './button-toggle.component';

describe('ButtonToggleComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(ButtonToggleComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
        projectContent: 'Content',
    });

    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        }),
    );

    it('should render <spy-button-toggle>', async () => {
        const host = await createComponentWrapper(createComponent);
        const buttonElem = host.queryCss('spy-button-toggle');

        expect(buttonElem).toBeTruthy();
    });

    it('should render projected content inside <button>', async () => {
        const host = await createComponentWrapper(createComponent);
        const buttonElem = host.queryCss('button');

        expect(buttonElem.nativeElement.textContent).toMatch('Content');
    });

    it('should bind attrs to spyApplyAttrs properties of <button>', async () => {
        const mockedAttrs = { mockAttr: 'mockAttr' };
        const host = await createComponentWrapper(createComponent, { attrs: mockedAttrs });
        const buttonElem = host.queryCss('button');

        expect(buttonElem.properties.spyApplyAttrs).toBe(mockedAttrs);
    });

    it('toggledChange must be emited after click event happened on button', async () => {
        const host = await createComponentWrapper(createComponent);
        const buttonElem = host.queryCss('button');

        buttonElem.triggerEventHandler('click', {});
        host.detectChanges();

        expect(host.hostComponent.toggledChange).toHaveBeenCalledWith(true);
    });

    it('class `spy-btn-toggle--toggled` should be added after click event happened', async () => {
        const host = await createComponentWrapper(createComponent);
        const buttonElem = host.queryCss('button');

        buttonElem.triggerEventHandler('click', {});
        host.detectChanges();

        expect(buttonElem.classes['spy-btn-toggle--toggled']).toBeTruthy();
    });

    describe('@Input(disabled)', () => {
        it('should by default have value `false`', async () => {
            const host = await createComponentWrapper(createComponent);

            expect(host.component.disabled).toBe(false);
        });

        it('should bind to `disabled` of <button>', async () => {
            const host = await createComponentWrapper(createComponent, { disabled: true });
            const buttonElem = host.queryCss('button');

            expect(buttonElem.properties.disabled).toBe(true);
        });
    });
});
