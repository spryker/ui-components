import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ApplyAttrsModule } from '@spryker/utils';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(TextareaComponent, {
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

    it('template must render <textarea> with [nz-input] from Ant Design', async () => {
        const host = await createComponentWrapper(createComponent);
        const textareaElem = host.queryCss('textarea[nz-input]');

        expect(textareaElem).toBeTruthy();
    });

    describe('Inputs must be bound to internal <textarea>', () => {
        it('should bind `placeholder` to `placeholder` attribute of <textarea>', async () => {
            const mockedPlaceholder = 'test placeholder';
            const host = await createComponentWrapper(createComponent, { placeholder: mockedPlaceholder });
            const textareaElem = host.queryCss('textarea');

            expect(textareaElem.attributes.placeholder).toBe(mockedPlaceholder);
        });

        it('should bind `value` to `value` of <textarea>', async () => {
            const mockedValue = 'test value';
            const host = await createComponentWrapper(createComponent, { value: mockedValue });
            const textareaElem = host.queryCss('textarea');

            expect(textareaElem.properties.value).toBe(mockedValue);
        });

        it('should bind `name` to `name` attribute of <textarea>', async () => {
            const mockedName = 'test name';
            const host = await createComponentWrapper(createComponent, { name: mockedName });
            const textareaElem = host.queryCss('textarea');

            expect(textareaElem.attributes.name).toBe(mockedName);
        });

        it('should bind `disabled` to `disabled` of <textarea>', async () => {
            const host = await createComponentWrapper(createComponent, { disabled: true });
            const textareaElem = host.queryCss('textarea');

            expect(textareaElem.properties.disabled).toBe(true);
        });

        it('should bind `rows` to `rows` attribute of <textarea>', async () => {
            const host = await createComponentWrapper(createComponent, { rows: 2 });
            const textareaElem = host.queryCss('textarea');

            expect(textareaElem.attributes.rows).toBe('2');
        });

        it('should bind `cols` to `cols` attribute of <textarea>', async () => {
            const host = await createComponentWrapper(createComponent, { cols: 2 });
            const textareaElem = host.queryCss('textarea');

            expect(textareaElem.attributes.cols).toBe('2');
        });
    });

    describe('Input attrs', () => {
        it('should parse and bind `attrs` to the appropriate attributes of <textarea>', async () => {
            const host = await createComponentWrapper(createComponent, { attrs: { test: 'attr1', test2: 'attr2' } });
            const textareaElem = host.queryCss('textarea');

            expect(textareaElem.attributes['test']).toBe('attr1');
            expect(textareaElem.attributes['test2']).toBe('attr2');
        });

        it('should `attrs` updates appropriate attributes when changed', async () => {
            const host = await createComponentWrapper(createComponent, { attrs: { test: 'attr1', test2: 'attr2' } });
            const textareaElem = host.queryCss('textarea');

            host.setInputs({ attrs: { test: 'attr6' } }, true);

            expect(textareaElem.attributes['test']).toBe('attr6');
            expect(textareaElem.attributes['test2']).toBe(null);

            host.setInputs({ attrs: null }, true);

            expect(textareaElem.attributes['test']).toBe(null);
        });
    });

    it('template must render <textarea> with [nzautosize] from Ant Design', async () => {
        const host = await createComponentWrapper(createComponent);
        const textareaElem = host.queryCss('textarea[nzautosize]');

        expect(textareaElem).toBeTruthy();
    });
});
