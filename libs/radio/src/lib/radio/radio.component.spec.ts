import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { RadioModule } from '../radio.module';
import { RadioComponent } from './radio.component';

@Component({
    selector: 'spy-test',
    template: `
        <spy-radio-group>
            <spy-radio
                [value]="value"
                [disabled]="disabled"
                [hasError]="hasError"
                (selected)="selectedSpy($event)"
            ></spy-radio>
        </spy-radio-group>
    `,
})
class TestGroupComponent {
    @Input() value: any;
    @Input() disabled: any;
    @Input() hasError: any;
    selectedSpy = jest.fn<string, any[]>();
}

describe('RadioComponent', () => {
    describe('Single Radio', () => {
        const { testModule, createComponent } = getTestingForComponent(RadioComponent, {
            ngModule: { schemas: [NO_ERRORS_SCHEMA] },
        });

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [testModule],
                teardown: { destroyAfterEach: false },
            });
        });

        it('should render `label[nz-radio]`', async () => {
            const host = await createComponentWrapper(createComponent);
            const labelElem = host.queryCss('label[nz-radio]');

            expect(labelElem).toBeTruthy();
        });

        it('should bound @Input(value) to the input `nzValue` of `label` element', async () => {
            const mockValue = 'mockValue';
            const host = await createComponentWrapper(createComponent, { value: mockValue });
            const labelElem = host.queryCss('label');

            expect(labelElem.properties.nzValue).toBe(mockValue);
        });

        it('should bound @Input(disabled) to the input `nzDisabled` of `label` element', async () => {
            const mockDisabled = true;
            const host = await createComponentWrapper(createComponent, { disabled: mockDisabled });
            const labelElem = host.queryCss('label');

            expect(labelElem.properties.nzDisabled).toBe(mockDisabled);
        });

        it('should add `spy-radio--disabled` to the host if @Input(disabled) is `true`', async () => {
            const host = await createComponentWrapper(createComponent);
            const radioComponent = host.queryCss('spy-radio');

            expect(radioComponent.classes['spy-radio--disabled']).toBeFalsy();

            host.setInputs({ disabled: true }, true);

            expect(radioComponent.classes['spy-radio--disabled']).toBeTruthy();
        });

        it('should add `spy-radio--error` to the host if @Input(hasError) is `true`', async () => {
            const host = await createComponentWrapper(createComponent);
            const radioComponent = host.queryCss('spy-radio');

            expect(radioComponent.classes['spy-radio--error']).toBeFalsy();

            host.setInputs({ hasError: true }, true);

            expect(radioComponent.classes['spy-radio--error']).toBeTruthy();
        });

        it('should trigger `selected` callback when `ngModelChange` on `label` element was triggered', async () => {
            const mockValue = 'mockValue';
            const host = await createComponentWrapper(createComponent, { value: mockValue });
            const labelElem = host.queryCss('label');

            labelElem.triggerEventHandler('ngModelChange', {});
            host.detectChanges();

            expect(host.hostComponent.selected).toHaveBeenCalledWith(mockValue);
        });
    });

    describe('Input element', () => {
        const { testModule, createComponent } = getTestingForComponent(RadioComponent, {
            ngModule: {
                imports: [NzRadioModule],
                schemas: [NO_ERRORS_SCHEMA],
            },
        });

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [testModule],
                teardown: { destroyAfterEach: false },
            });
        });

        it('should set @Input(value) to the input element', async () => {
            const mockValue = 'mockValue';
            const host = await createComponentWrapper(createComponent, { value: mockValue });
            const inputElem = host.queryCss('label[nz-radio] input');

            expect(inputElem.nativeElement.value).toBe(mockValue);
        });
    });

    describe('Radio With Group Component', () => {
        const { testModule, createComponent } = getTestingForComponent(TestGroupComponent, {
            ngModule: {
                imports: [RadioModule],
                schemas: [NO_ERRORS_SCHEMA],
            },
        });

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [testModule],
                teardown: { destroyAfterEach: false },
            });
        });

        it('should bound @Input(value) to the input `nzValue` of `label` element', async () => {
            const mockValue = 'mockValue';
            const host = await createComponentWrapper(createComponent, { value: mockValue });
            const labelElem = host.queryCss('label');

            expect(labelElem.attributes['ng-reflect-nz-value']).toBe(mockValue);
        });

        it('should bound @Input(disabled) to the input `nzDisabled` of `label` element', async () => {
            const host = await createComponentWrapper(createComponent, { disabled: true });
            const labelElem = host.queryCss('label');

            expect(labelElem.attributes['ng-reflect-nz-disabled']).toBe('true');
        });

        it('should add `spy-radio--disabled` to the `.spy-radio` if @Input(disabled) is `true`', async () => {
            const host = await createComponentWrapper(createComponent);
            const radioElement = host.queryCss('.spy-radio');

            expect(radioElement.classes['spy-radio--disabled']).toBeFalsy();

            host.setInputs({ disabled: true }, true);

            expect(radioElement.classes['spy-radio--disabled']).toBeTruthy();
        });

        it('should add `spy-radio--error` to the `.spy-radio` if @Input(hasError) is `true`', async () => {
            const host = await createComponentWrapper(createComponent);
            const radioElement = host.queryCss('.spy-radio');

            expect(radioElement.classes['spy-radio--error']).toBeFalsy();

            host.setInputs({ hasError: true }, true);

            expect(radioElement.classes['spy-radio--error']).toBeTruthy();
        });
    });
});
