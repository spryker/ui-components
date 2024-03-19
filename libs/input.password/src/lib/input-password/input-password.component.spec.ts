import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InputModule } from '@spryker/input';
import { IconOpenEyeModule, IconCrossedEyeModule } from '@spryker/icon/icons';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { InputPasswordComponent } from './input-password.component';

describe('InputPasswordComponent', () => {
    describe('Host functionality', () => {
        const { testModule, createComponent } = getTestingForComponent(InputPasswordComponent, {
            ngModule: { schemas: [NO_ERRORS_SCHEMA] },
        });

        beforeEach(() =>
            TestBed.configureTestingModule({
                imports: [testModule],
                teardown: { destroyAfterEach: false },
            }),
        );

        it('should render <spy-input>', async () => {
            const host = await createComponentWrapper(createComponent);
            const inputElem = host.queryCss('spy-input');

            expect(inputElem).toBeTruthy();
        });

        it('should add static class to host element', async () => {
            const inputPasswordClass = 'spy-input-password';
            const host = await createComponentWrapper(createComponent);
            const inputPasswordElem = host.queryCss(inputPasswordClass);

            expect(inputPasswordElem.attributes.class).toBe(inputPasswordClass);
        });

        describe('@Inputs', () => {
            it('should bind `type` to `type` of <spy-input>', async () => {
                const host = await createComponentWrapper(createComponent);
                const inputElem = host.queryCss('spy-input');

                expect(inputElem.properties.type).toBe('password');
            });

            it('should bind `name` to `name` of <spy-input>', async () => {
                const mockName = 'name';
                const host = await createComponentWrapper(createComponent, { name: mockName });
                const inputElem = host.queryCss('spy-input');

                expect(inputElem.properties.name).toBe(mockName);
            });

            it('should bind `value` to `value` of <spy-input>', async () => {
                const mockValue = 'value';
                const host = await createComponentWrapper(createComponent, { value: mockValue });
                const inputElem = host.queryCss('spy-input');

                expect(inputElem.properties.value).toBe(mockValue);
            });

            it('should bind `spyId` to `spyId` of <spy-input>', async () => {
                const mockSpyId = 'spyId';
                const host = await createComponentWrapper(createComponent, { spyId: mockSpyId });
                const inputElem = host.queryCss('spy-input');

                expect(inputElem.properties.spyId).toBe(mockSpyId);
            });

            it('should bind `placeholder` to `placeholder` of <spy-input>', async () => {
                const mockPlaceholder = 'placeholder';
                const host = await createComponentWrapper(createComponent, { placeholder: mockPlaceholder });
                const inputElem = host.queryCss('spy-input');

                expect(inputElem.properties.placeholder).toBe(mockPlaceholder);
            });

            it('should bind `outerPrefix` to `outerPrefix` of <spy-input>', async () => {
                const mockOuterPrefix = 'outerPrefix';
                const host = await createComponentWrapper(createComponent, { outerPrefix: mockOuterPrefix });
                const inputElem = host.queryCss('spy-input');

                expect(inputElem.properties.outerPrefix).toBe(mockOuterPrefix);
            });

            it('should bind `outerSuffix` to `outerSuffix` of <spy-input>', async () => {
                const mockOuterSuffix = 'outerSuffix';
                const host = await createComponentWrapper(createComponent, { outerSuffix: mockOuterSuffix });
                const inputElem = host.queryCss('spy-input');

                expect(inputElem.properties.outerSuffix).toBe(mockOuterSuffix);
            });

            it('should bind `readOnly` to `readOnly` of <spy-input>', async () => {
                const mockReadOnly = true;
                const host = await createComponentWrapper(createComponent, { readOnly: mockReadOnly });
                const inputElem = host.queryCss('spy-input');

                expect(inputElem.properties.readOnly).toBe(mockReadOnly);
            });

            it('should bind `disabled` to `disabled` of <spy-input>', async () => {
                const mockDisabled = true;
                const host = await createComponentWrapper(createComponent, { disabled: mockDisabled });
                const inputElem = host.queryCss('spy-input');

                expect(inputElem.properties.disabled).toBe(mockDisabled);
            });

            it('should bind `required` to `required` of <spy-input>', async () => {
                const mockRequired = true;
                const host = await createComponentWrapper(createComponent, { required: mockRequired });
                const inputElem = host.queryCss('spy-input');

                expect(inputElem.properties.required).toBe(mockRequired);
            });

            it('should bind `attrs` to `attrs` of <spy-input>', async () => {
                const mockAttrs = {
                    attr1: 'attr1Value',
                    attr2: 'attr2Value',
                };
                const host = await createComponentWrapper(createComponent, { attrs: mockAttrs });
                const inputElem = host.queryCss('spy-input');

                expect(inputElem.properties.attrs).toBe(mockAttrs);
            });
        });

        describe('@Output(valueChange)', () => {
            it('should emit when `ngModelChange` emits from <spy-input>', async () => {
                const mockValue = 'value';
                const host = await createComponentWrapper(createComponent);
                const inputElem = host.queryCss('spy-input');

                expect(inputElem).toBeTruthy();

                inputElem.triggerEventHandler('valueChange', mockValue);
                host.detectChanges();

                expect(host.hostComponent.valueChange).toHaveBeenCalledWith(mockValue);
            });
        });
    });

    describe('Icon element', () => {
        const { testModule, createComponent } = getTestingForComponent(InputPasswordComponent, {
            ngModule: {
                imports: [InputModule],
                schemas: [NO_ERRORS_SCHEMA],
            },
        });

        beforeEach(() =>
            TestBed.configureTestingModule({
                imports: [testModule],
                teardown: { destroyAfterEach: false },
            }),
        );

        it('should trigger host type and `spy-icon` name', async () => {
            const host = await createComponentWrapper(createComponent);
            const inputPasswordIconElem = host.queryCss('.spy-input-password__icon');
            const inputElem = host.queryCss('input');

            expect(inputPasswordIconElem.properties.name).toBe(IconOpenEyeModule.icon);
            expect(inputElem.properties.type).toBe('password');

            inputPasswordIconElem.triggerEventHandler('click', {});
            host.detectChanges();

            expect(inputPasswordIconElem.properties.name).toBe(IconCrossedEyeModule.icon);
            expect(inputElem.properties.type).toBe('text');
        });
    });
});
