import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormItemComponent, FormItemModule } from '@spryker/form-item';
import { InputComponent, InputModule } from '@spryker/input';
import { AutocompleteComponent, AutocompleteModule } from '@spryker/autocomplete';
import { TableEditableService } from '@spryker/table.feature.editable';
import { ContextPipe, DefaultContextSerializationModule, InvokeModule } from '@spryker/utils';
import { DatasourceService } from '@spryker/datasource';
import { createComponentWrapper } from '@spryker/internal-utils';
import { of } from 'rxjs';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
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
    options: [
        {
            value: 'value',
            title: 'title',
        },
    ],
};
const context: any = {
    value: 'testValue',
    config: {
        id: 'id',
    },
};

class MockTableEditableService {
    updateValue = jest.fn();
}

class MockDatasourceService implements Partial<DatasourceService> {
    resolve = jest.fn().mockReturnValue(of([]));
}

describe('TableColumnAutocompleteComponent', () => {
    let tableEditableService: MockTableEditableService;

    const { testModule, createComponent } = getTestingForComponent(TableColumnAutocompleteComponent, {
        ngModule: {
            imports: [
                InputModule,
                FormItemModule,
                DefaultContextSerializationModule,
                NoopAnimationsModule,
                InvokeModule,
                AutocompleteModule,
            ],
            declarations: [ContextPipe],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [testModule],
            providers: [
                MockTableEditableService,
                MockDatasourceService,
                {
                    provide: DatasourceService,
                    useExisting: MockDatasourceService,
                },
            ],
            teardown: { destroyAfterEach: false },
        }).overrideComponent(TableColumnAutocompleteComponent, {
            set: {
                providers: [
                    {
                        provide: TableEditableService,
                        useExisting: MockTableEditableService,
                    },
                ],
            },
        });

        tableEditableService = TestBed.inject(MockTableEditableService);
    });

    it('Template must render <spy-form-item> element', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock, context });
        const formItemElem = host.queryCss('spy-form-item');

        expect(formItemElem).toBeTruthy();
    });

    it('Template must render <spy-autocomplete> element', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock, context });
        const autocompleteElem = host.queryCss('spy-autocomplete');

        expect(autocompleteElem).toBeTruthy();
    });

    it('Input `error` must be bound to `config.editableError`', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock, context });
        const formItemElem = host.queryComponent(FormItemComponent);

        expect(formItemElem.error).toBe(configMock.editableError);
    });

    it('Template must render <spy-input> element as [control]', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock, context });
        const inputElem = host.queryCss('spy-input[control]');

        expect(inputElem).toBeTruthy();
        expect(inputElem.parent.attributes['class']).toContain('ant-form-item-control-input-content');
    });

    describe('@Input()', () => {
        it('`prefix` must be bound to `prefix` input of the <spy-input> element', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const inputElem = host.queryComponent(InputComponent);

            expect(inputElem.prefix).toBe(configMock.prefix);
        });

        it('`suffix` must be bound to `suffix` input of the <spy-input> element', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const inputElem = host.queryComponent(InputComponent);

            expect(inputElem.suffix).toBe(configMock.suffix);
        });

        it('`outerPrefix` must be bound to `outerPrefix` input of the <spy-input> element', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const inputElem = host.queryComponent(InputComponent);

            expect(inputElem.outerPrefix).toBe(configMock.outerPrefix);
        });

        it('`outerSuffix` must be bound to `outerSuffix` input of the <spy-input> element', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const inputElem = host.queryComponent(InputComponent);

            expect(inputElem.outerSuffix).toBe(configMock.outerSuffix);
        });

        it('`value` must be bound to `value` input of the <spy-input> element', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const inputElem = host.queryComponent(InputComponent);

            expect(inputElem.value).toBe(configMock.value);
        });

        it('`type` must be bound to `type` input of the <spy-input> element', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const inputElem = host.queryComponent(InputComponent);

            expect(inputElem.type).toBe(configMock.type);
        });

        it('`placeholder` must be bound to `placeholder` input of the <spy-input> element', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const inputElem = host.queryComponent(InputComponent);

            expect(inputElem.placeholder).toBe(configMock.placeholder);
        });

        it('`options` must be bound to `options` input of the <spy-autocomplete> element', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const autocompleteElem = host.queryComponent(AutocompleteComponent);

            expect(autocompleteElem.options).toBe(configMock.options);
        });

        it('`datasource` must be bound to `datasource` property of the <spy-autocomplete> element', async () => {
            const mockDatasourceConfig = {
                type: 'inline',
            };
            const host = await createComponentWrapper(createComponent, {
                config: {
                    ...configMock,
                    datasource: mockDatasourceConfig,
                },
                context,
            });
            const autocompleteElem = host.queryComponent(AutocompleteComponent);

            expect(autocompleteElem.datasource).toEqual(mockDatasourceConfig);
        });
    });

    describe('@Output()', () => {
        it('`valueChange` of the <spy-input> element should trigger `TableEditableService.updateValue()`', async () => {
            const mockValue = 'value';
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const inputElem = host.queryCss('spy-input');

            inputElem.triggerEventHandler('valueChange', mockValue);
            host.detectChanges();

            expect(tableEditableService.updateValue).toHaveBeenCalledWith(mockValue, context.config);
        });

        it('`valueChange` of the <spy-input> element should update `context.value`', async () => {
            const mockValue = 'value';
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const inputElem = host.queryCss('spy-input');

            inputElem.triggerEventHandler('valueChange', mockValue);
            host.detectChanges();

            expect(host.component.context.value).toBe(mockValue);
        });
    });
});
