import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ApplyAttrsModule } from '@spryker/utils';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(InputComponent, {
        ngModule: {
            imports: [ApplyAttrsModule],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('template must render input with [nz-input] from Ant Design inside nz-input-group component', async () => {
        const host = await createComponentWrapper(createComponent);
        const inputGroupElem = host.queryCss('nz-input-group');

        expect(inputGroupElem).toBeTruthy();

        const inputElem = host.queryCss('input[nz-input]');

        expect(inputElem).toBeTruthy();
    });

    describe('Inputs must be bound to internal input', () => {
        it('should bind placeholder to placeholder of input', async () => {
            const mockedPlaceholder = 'test placeholder';
            const host = await createComponentWrapper(createComponent, { placeholder: mockedPlaceholder });
            const inputElem = host.queryCss('input');

            expect(inputElem.attributes.placeholder).toBe(mockedPlaceholder);
        });

        it('should bind value to ngModel of input', async () => {
            const mockedValue = 'test value';
            const host = await createComponentWrapper(createComponent, { value: mockedValue });
            const inputElem = host.queryCss('input');

            expect(inputElem.properties.ngModel).toBe(mockedValue);
        });

        it('should bind name to name attribute of input', async () => {
            const mockedName = 'test name';
            const host = await createComponentWrapper(createComponent, { name: mockedName });
            const inputElem = host.queryCss('input');

            expect(inputElem.attributes.name).toBe(mockedName);
        });

        it('should bind type to type of input', async () => {
            const mockedType = 'text';
            const host = await createComponentWrapper(createComponent, { type: mockedType });
            const inputElem = host.queryCss('input');

            expect(inputElem.properties.type).toBe(mockedType);
        });

        it('should bind disabled to disabled of input', async () => {
            const host = await createComponentWrapper(createComponent, { disabled: true });
            const inputElem = host.queryCss('input');

            expect(inputElem.properties.disabled).toBe(true);
        });

        it('should bind readOnly to readOnly of input', async () => {
            const host = await createComponentWrapper(createComponent, { readOnly: true });
            const inputElem = host.queryCss('input');

            expect(inputElem.properties.readOnly).toBe(true);
        });
    });

    describe('Input attrs', () => {
        it('should parse and bind `attrs` to the appropriate attributes of input', async () => {
            const host = await createComponentWrapper(createComponent, { attrs: { test: 'attr1', test2: 'attr2' } });
            const inputElem = host.queryCss('input');

            expect(inputElem.attributes['test']).toBe('attr1');
            expect(inputElem.attributes['test2']).toBe('attr2');
        });

        it('should `attrs` updates appropriate attributes when changed', async () => {
            const host = await createComponentWrapper(createComponent, { attrs: { test: 'attr1', test2: 'attr2' } });
            const inputElem = host.queryCss('input');

            host.setInputs({ attrs: { test: 'attr6' } }, true);

            expect(inputElem.attributes['test']).toBe('attr6');
            expect(inputElem.attributes['test2']).toBe(null);

            host.setInputs({ attrs: null }, true);

            expect(inputElem.attributes['test']).toBe(null);
        });
    });

    describe('Input prefix and suffix must be bound to nz-input-group', () => {
        it('should bind suffix to nzSuffix of nz-input-group', async () => {
            const mockedSuffix = 'suffix';
            const host = await createComponentWrapper(createComponent, { suffix: mockedSuffix });
            const inputElem = host.queryCss('nz-input-group');

            expect(inputElem.properties.nzSuffix).toBe(mockedSuffix);
        });

        it('should bind prefix to nzPrefix of nz-input-group', async () => {
            const mockedPrefix = 'prefix';
            const host = await createComponentWrapper(createComponent, { prefix: mockedPrefix });
            const inputElem = host.queryCss('nz-input-group');

            expect(inputElem.properties.nzPrefix).toBe(mockedPrefix);
        });
    });

    describe('Input outerPrefix and outerSuffix must be bound to nz-input-group', () => {
        it('should bind outerPrefix to nzAddOnBefore of nz-input-group', async () => {
            const mockedData = 'outerPrefix';
            const host = await createComponentWrapper(createComponent, { outerPrefix: mockedData });
            const inputElem = host.queryCss('nz-input-group');

            expect(inputElem.properties.nzAddOnBefore).toBe(mockedData);
        });

        it('should bind outerSuffix to nzAddOnAfter of nz-input-group', async () => {
            const mockedData = 'outerSuffix';
            const host = await createComponentWrapper(createComponent, { outerSuffix: mockedData });
            const inputElem = host.queryCss('nz-input-group');

            expect(inputElem.properties.nzAddOnAfter).toBe(mockedData);
        });
    });

    describe('valueChange', () => {
        it('should trigger change callback when ngModelChange was triggered', async () => {
            const host = await createComponentWrapper(createComponent);
            const inputElem = host.queryCss('input');

            inputElem.triggerEventHandler('ngModelChange', {});
            host.detectChanges();

            expect(host.hostComponent.valueChange).toHaveBeenCalled();
        });
    });
});
