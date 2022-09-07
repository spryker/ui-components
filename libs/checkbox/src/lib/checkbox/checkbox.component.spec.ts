import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { ApplyAttrsModule } from '@spryker/utils';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(CheckboxComponent, {
        ngModule: {
            imports: [ApplyAttrsModule],
            schemas: [NO_ERRORS_SCHEMA],
        },
        projectContent: 'Label',
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should create', async () => {
        const host = await createComponent({}, true);

        expect(host.component).toBeTruthy();
    });

    const checkboxSelector = 'label[nz-checkbox]';
    const hiddenInputSelector = `${checkboxSelector} + input`;

    describe('Template', () => {
        it('must render <label> with `nz-checkbox` from Ant Design', async () => {
            const host = await createComponent({}, true);
            const labelElem = host.queryCss(checkboxSelector);

            expect(labelElem).toBeTruthy();
        });

        it('must render hidden HTML <input>', async () => {
            const host = await createComponent({}, true);
            const inputElem = host.queryCss(hiddenInputSelector);

            expect(inputElem).toBeTruthy();
        });

        it('must render default slot', async () => {
            const host = await createComponent({}, true);
            const labelElem = host.queryCss(checkboxSelector);

            expect(labelElem.nativeElement.textContent).toMatch('Label');
        });
    });

    describe('@Input(spyId)', () => {
        it('must be bound to id property of hidden HTML <input>', async () => {
            const testId = 'testId';
            const host = await createComponent({ spyId: testId }, true);
            const inputElem = host.queryCss(hiddenInputSelector);

            host.detectChanges();
            console.log(inputElem);
            expect(inputElem.attributes.id).toBe(testId);
        });
    });

    describe('@Input(name)', () => {
        it('must be bound to name attribute of hidden HTML <input>', async () => {
            const testName = 'testName';
            const host = await createComponent({ name: testName }, true);
            const inputElem = host.queryCss(hiddenInputSelector);

            expect(inputElem.attributes.name).toBe(testName);
        });
    });

    describe('@Input(required)', () => {
        it('must be bound to required property of hidden HTML <input>', async () => {
            const testRequired = true;
            const host = await createComponent({ required: testRequired }, true);
            const inputElem = host.queryCss(hiddenInputSelector);

            expect(inputElem.properties.required).toBe(testRequired);
        });
    });

    describe('@Input(indeterminate)', () => {
        it('must be bound to `nzIndeterminate` input of `nz-checkbox`', async () => {
            const testIndeterminate = true;
            const host = await createComponent({ indeterminate: testIndeterminate }, true);
            const labelElem = host.queryCss(checkboxSelector);

            expect(labelElem.properties.nzIndeterminate).toBe(testIndeterminate);
        });
    });

    describe('@Input(disabled)', () => {
        it('must be bound to disabled property of hidden HTML <input>', async () => {
            const testDisabled = true;
            const host = await createComponent({ disabled: testDisabled }, true);
            const inputElem = host.queryCss(hiddenInputSelector);

            expect(inputElem.properties.disabled).toBe(testDisabled);
        });

        it('must be bound to `nzDisabled` input of `nz-checkbox`', async () => {
            const testDisabled = true;
            const host = await createComponent({ disabled: testDisabled }, true);
            const labelElem = host.queryCss(checkboxSelector);

            expect(labelElem.properties.nzDisabled).toBe(testDisabled);
        });
    });

    describe('@Input(attrs)', () => {
        it('must be bound to the appropriate attributes of hidden HTML <input>', async () => {
            const host = await createComponent({ attrs: { test: 'attr1', test2: 'attr2' } }, true);
            const inputElem = host.queryCss(hiddenInputSelector);

            expect(inputElem.attributes['test']).toBe('attr1');
            expect(inputElem.attributes['test2']).toBe('attr2');
        });

        it('must parses to JSON format if it string', async () => {
            const host = await createComponent({ attrs: '{"test":"attr1","test2":"attr2"}' as any }, true);
            const inputElem = host.queryCss(hiddenInputSelector);

            expect(inputElem.attributes['test']).toBe('attr1');
            expect(inputElem.attributes['test2']).toBe('attr2');
        });

        it('must updates when changed', async () => {
            const host = await createComponent({ attrs: { test: 'attr1', test2: 'attr2' } }, true);
            const inputElem = host.queryCss(hiddenInputSelector);

            host.setInputs({ attrs: { test: 'attr6' } }, true);

            expect(inputElem.attributes['test']).toBe('attr6');
            expect(inputElem.attributes['test2']).toBe(null);

            host.setInputs({ attrs: { test: null } }, true);

            expect(inputElem.attributes['test']).toBe(null);

            host.setInputs({ attrs: { test: '' } }, true);

            expect(inputElem.attributes['test']).toBe('');
        });
    });

    describe('@Input(checked)', () => {
        it('must be bound to ngModel property of hidden HTML <input> with negative `indeterminate` input', async () => {
            const testChecked = true;
            const testIndeterminate = false;
            const host = await createComponent({ checked: testChecked, indeterminate: testIndeterminate }, true);
            const inputElem = host.queryCss(hiddenInputSelector);

            expect(inputElem.properties.ngModel).toBe(testChecked && !testIndeterminate);
        });

        it('must be bound to `ngModel` input of `nz-checkbox`', async () => {
            const testChecked = true;
            const host = await createComponent({ checked: testChecked }, true);
            const labelElem = host.queryCss(checkboxSelector);

            expect(labelElem.properties.ngModel).toBe(testChecked);
        });
    });

    describe('@Output(checkedChange)', () => {
        it('must be emitted every time `ngModelChange` emits from `nz-checkbox`', async () => {
            const host = await createComponent({}, true);
            const labelElem = host.queryCss(checkboxSelector);

            labelElem.triggerEventHandler('ngModelChange', null);
            host.detectChanges();

            expect(host.hostComponent.checkedChange).toHaveBeenCalled();
        });
    });
});
