import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

import { ButtonIconComponent } from './button-icon.component';
import { ButtonSize, ButtonType, ButtonAttributes } from '@spryker/button';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

describe('ButtonIconComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(ButtonIconComponent, {
        ngModule: {
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        }),
    );

    it('should render <button>', async () => {
        const host = await createComponent({}, true);
        const buttonElem = host.queryCss('button')!;

        expect(buttonElem).toBeTruthy();
    });

    it('should render <spy-icon>', async () => {
        const host = await createComponent({}, true);
        const iconElem = host.queryCss('spy-icon')!;

        expect(iconElem).toBeTruthy();
    });

    it('should add static class to host element', async () => {
        const buttonIconClass = 'spy-button-icon';
        const host = await createComponent({}, true);
        const buttonIconElem = host.queryCss(buttonIconClass)!;

        expect(buttonIconElem.attributes.class).toBe(buttonIconClass);
    });

    describe('@Inputs', () => {
        it(`should have type '${ButtonType.Button}' by default `, async () => {
            const host = await createComponent();

            expect(host.component.type).toBe(ButtonType.Button);
        });

        it('should bind type to `button` type', async () => {
            const mockType = ButtonType.Submit;
            const host = await createComponent({ type: mockType }, true);
            const buttonElem = host.queryCss('button')!;

            expect(buttonElem.properties.type).toBe(mockType);
        });

        it('should bind size to `button` class', async () => {
            const mockSize = ButtonSize.Small;
            const host = await createComponent({ size: mockSize }, true);
            const buttonElem = host.queryCss('button')!;

            expect(buttonElem.nativeElement.classList.contains(`spy-button-icon__button--${mockSize}`)).toBeTruthy();
        });

        it('should bind iconName to `spy-icon` name', async () => {
            const mockIconName = 'test';
            const host = await createComponent({ iconName: mockIconName }, true);
            const iconElem = host.queryCss('spy-icon')!;

            expect(iconElem.properties.name).toBe(mockIconName);
        });

        it('should bind attrs to `button` spyApplyAttrs', async () => {
            const mockAttrs: ButtonAttributes = {
                attr1: 'attr1Value',
                attr2: 'attr2Value',
            };
            const host = await createComponent({ attrs: mockAttrs }, true);
            const buttonElem = host.queryCss('button')!;

            expect(buttonElem.properties.spyApplyAttrs).toBe(mockAttrs);
        });

        it('should have disabled `false` by default', async () => {
            const host = await createComponent();

            expect(host.component.disabled).toBe(false);
        });

        it('should add host class when disabled is `true`', async () => {
            const host = await createComponent({ disabled: true }, true);

            expect(host.element.classes['spy-button-icon--disabled']).toBeTruthy();
        });

        it('should bind disabled to `button` disabled', async () => {
            const host = await createComponent({ disabled: true }, true);
            const buttonElem = host.queryCss('button')!;

            expect(buttonElem.properties.disabled).toBe(true);
        });
    });
});
