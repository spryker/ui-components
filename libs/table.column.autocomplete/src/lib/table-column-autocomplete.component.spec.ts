import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { FormItemModule, FormItemComponent } from '@spryker/form-item';
import { InputModule, InputComponent } from '@spryker/input';
import { AutocompleteModule, AutocompleteComponent } from '@spryker/autocomplete';
import { TableEditableService } from '@spryker/table.feature.editable';
import { DatasourceService } from '@spryker/datasource';
import { ContextPipe, DefaultContextSerializationModule, InvokeModule } from '@spryker/utils';

import { TableColumnAutocompleteComponent } from './table-column-autocomplete.component';

const configMock: any = {
    placeholder: 'testPlaceholder',
    value: 'testValue',
    type: 'testType',
    prefix: 'testPrefix',
    suffix: 'testSuffix',
    outerPrefix: 'testOuterPrefix',
    outerSuffix: 'testOuterSuffix',
    editableError: 'testError',
    options: [{ value: 'value', title: 'title' }],
};

const context: any = {
    value: 'testValue',
    config: { id: 'id' },
};

class MockTableEditableService {
    updateValue = jest.fn();
}

class MockDatasourceService {
    resolve = jest.fn().mockReturnValue(of([]));
}

describe('TableColumnAutocompleteComponent', () => {
    let fixture: any;
    let tableEditableService: MockTableEditableService;

    const q = (css: string) => fixture.debugElement.query(By.css(css));
    const qAll = (css: string) => fixture.debugElement.queryAll(By.css(css));
    const qDir = <T>(dir: any) => fixture.debugElement.query(By.directive(dir));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                InputModule,
                FormItemModule,
                DefaultContextSerializationModule,
                NoopAnimationsModule,
                InvokeModule,
                AutocompleteModule,
            ],
            declarations: [TableColumnAutocompleteComponent, ContextPipe],
            providers: [
                MockTableEditableService,
                MockDatasourceService,
                { provide: DatasourceService, useExisting: MockDatasourceService },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        })
            .overrideComponent(TableColumnAutocompleteComponent, {
                set: {
                    providers: [{ provide: TableEditableService, useExisting: MockTableEditableService }],
                },
            })
            .compileComponents();

        fixture = TestBed.createComponent(TableColumnAutocompleteComponent);
        tableEditableService = TestBed.inject(MockTableEditableService);
    });

    it('Template must render <spy-form-item> element', () => {
        fixture.componentRef.setInput('config', configMock);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const formItemElem = q('spy-form-item');
        expect(formItemElem).toBeTruthy();
    });

    it('Template must render <spy-autocomplete> element', () => {
        fixture.componentRef.setInput('config', configMock);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const autocompleteElem = q('spy-autocomplete');
        expect(autocompleteElem).toBeTruthy();
    });

    it('Input `error` must be bound to `config.editableError`', () => {
        fixture.componentRef.setInput('config', configMock);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const formItemCmp = qDir<FormItemComponent>(FormItemComponent).componentInstance as FormItemComponent;
        expect(formItemCmp.error).toBe(configMock.editableError);
    });

    it('Template must render <spy-input> element as [control]', () => {
        fixture.componentRef.setInput('config', configMock);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const inputEl = q('spy-input[control]');
        expect(inputEl).toBeTruthy();
        expect(inputEl.parent.attributes['class']).toContain('ant-form-item-control-input-content');
    });

    describe('@Input()', () => {
        it('`prefix` must be bound to `prefix` input of the <spy-input> element', () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputCmp = qDir<InputComponent>(InputComponent).componentInstance as InputComponent;
            expect(inputCmp.prefix).toBe(configMock.prefix);
        });

        it('`suffix` must be bound to `suffix` input of the <spy-input> element', () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputCmp = qDir<InputComponent>(InputComponent).componentInstance as InputComponent;
            expect(inputCmp.suffix).toBe(configMock.suffix);
        });

        it('`outerPrefix` must be bound to `outerPrefix` input of the <spy-input> element', () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputCmp = qDir<InputComponent>(InputComponent).componentInstance as InputComponent;
            expect(inputCmp.outerPrefix).toBe(configMock.outerPrefix);
        });

        it('`outerSuffix` must be bound to `outerSuffix` input of the <spy-input> element', () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputCmp = qDir<InputComponent>(InputComponent).componentInstance as InputComponent;
            expect(inputCmp.outerSuffix).toBe(configMock.outerSuffix);
        });

        it('`value` must be bound to `value` input of the <spy-input> element', () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputCmp = qDir<InputComponent>(InputComponent).componentInstance as InputComponent;
            expect(inputCmp.value).toBe(configMock.value);
        });

        it('`type` must be bound to `type` input of the <spy-input> element', () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputCmp = qDir<InputComponent>(InputComponent).componentInstance as InputComponent;
            expect(inputCmp.type).toBe(configMock.type);
        });

        it('`placeholder` must be bound to `placeholder` input of the <spy-input> element', () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputCmp = qDir<InputComponent>(InputComponent).componentInstance as InputComponent;
            expect(inputCmp.placeholder).toBe(configMock.placeholder);
        });

        it('`options` must be bound to `options` input of the <spy-autocomplete> element', () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const acCmp = qDir<AutocompleteComponent>(AutocompleteComponent).componentInstance as AutocompleteComponent;
            expect(acCmp.options).toBe(configMock.options);
        });

        it('`datasource` must be bound to `datasource` property of the <spy-autocomplete> element', () => {
            const mockDatasourceConfig = { type: 'inline' };
            fixture.componentRef.setInput('config', { ...configMock, datasource: mockDatasourceConfig });
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const acCmp = qDir<AutocompleteComponent>(AutocompleteComponent).componentInstance as AutocompleteComponent;
            expect(acCmp.datasource).toEqual(mockDatasourceConfig);
        });
    });

    describe('@Output()', () => {
        it('`valueChange` of the <spy-input> element should trigger `TableEditableService.updateValue()`', () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputDe = q('spy-input');
            const mockValue = 'value';

            inputDe.triggerEventHandler('valueChange', mockValue);
            fixture.detectChanges();

            expect(tableEditableService.updateValue).toHaveBeenCalledWith(mockValue, context.config);
        });

        it('`valueChange` of the <spy-input> element should update `context.value`', () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputDe = q('spy-input');
            const mockValue = 'value';

            inputDe.triggerEventHandler('valueChange', mockValue);
            fixture.detectChanges();

            expect(fixture.componentInstance.context.value).toBe(mockValue);
        });
    });
});
