import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { buttonClassName } from '../button-core/button-core';
import { ButtonShape, ButtonSize, ButtonVariant } from '../button-core/types';
import { ButtonLinkComponent } from './button-link.component';

describe('ButtonLinkComponent', () => {
    const buttonLinkCls = 'spy-button-link';

    const { testModule, createComponent } = getTestingForComponent(ButtonLinkComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
        projectContent: 'Content',
    });

    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        }),
    );

    it('should render <a>', async () => {
        const host = await createComponentWrapper(createComponent);
        const buttonLinkElem = host.queryCss('a');

        expect(buttonLinkElem).toBeTruthy();
    });

    it('should render projected content inside <a>', async () => {
        const host = await createComponentWrapper(createComponent);
        const buttonElem = host.queryCss('a');

        expect(buttonElem.nativeElement.textContent).toMatch('Content');
    });

    it('should add static classes to host element', async () => {
        const host = await createComponentWrapper(createComponent);

        expect(host.element.classes[buttonClassName]).toBeTruthy();
        expect(host.element.classes[buttonLinkCls]).toBeTruthy();
    });

    it('should add static classes to `a` element', async () => {
        const host = await createComponentWrapper(createComponent);
        const linkElem = host.queryCss('a');

        expect(linkElem.classes[`${buttonClassName}__btn`]).toBeTruthy();
        expect(linkElem.classes[`${buttonLinkCls}__btn`]).toBeTruthy();
    });

    describe('@Inputs', () => {
        it('should bind input url to href of <a>', async () => {
            const mockUrl = 'mockUrl';
            const host = await createComponentWrapper(createComponent, { url: mockUrl });
            const buttonLinkElem = host.queryCss('a');

            expect(buttonLinkElem.properties.href).toBe(mockUrl);
        });

        it('should add appropriate @Input(variant), @Input(shape), @Input(size) classes to the host', async () => {
            const host = await createComponentWrapper(createComponent, {
                variant: ButtonVariant.Critical,
                shape: ButtonShape.Circle,
                size: ButtonSize.Large,
            });

            expect(host.element.classes[`${buttonClassName}--${ButtonVariant.Critical}`]).toBeTruthy();
            expect(host.element.classes[`${buttonLinkCls}--${ButtonVariant.Critical}`]).toBeTruthy();
            expect(host.element.classes[`${buttonClassName}--${ButtonShape.Circle}`]).toBeTruthy();
            expect(host.element.classes[`${buttonLinkCls}--${ButtonShape.Circle}`]).toBeTruthy();
            expect(host.element.classes[`${buttonClassName}--${ButtonSize.Large}`]).toBeTruthy();
            expect(host.element.classes[`${buttonLinkCls}--${ButtonSize.Large}`]).toBeTruthy();
        });

        it('should bind attrs to spyApplyAttrs properties of <a>', async () => {
            const mockedAttrs = { mockAttr: 'mockAttr' };
            const host = await createComponentWrapper(createComponent, { attrs: mockedAttrs });
            const buttonLinkElem = host.queryCss('a');

            expect(buttonLinkElem.properties.spyApplyAttrs).toBe(mockedAttrs);
        });
    });
});
