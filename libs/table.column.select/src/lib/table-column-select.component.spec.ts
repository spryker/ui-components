import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatasourceService } from '@spryker/datasource';
import { FormItemComponent, FormItemModule } from '@spryker/form-item';
import { SelectComponent, SelectModule } from '@spryker/select';
import { TableEditableService } from '@spryker/table.feature.editable';
import { ContextPipe, DefaultContextSerializationModule, InvokeModule } from '@spryker/utils';
import { createComponentWrapper } from '@spryker/internal-utils';
import { of } from 'rxjs';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { TableColumnSelectComponent } from './table-column-select.component';

const configMock: any = {
    placeholder: 'testPlaceholder',
    options: [{ title: 'testTitle', value: 'testValue' }],
    multiple: true,
    search: true,
    disableClear: true,
    showSelectAll: true,
    selectAllTitle: 'testSelectAllTitle',
    noOptionsText: 'testNoOptionsText',
    editableError: 'testError',
};
const context: any = {
    value: 'testValue',
};

class MockTableEditableService {
    updateValue = jest.fn();
}

class MockDatasourceService implements Partial<DatasourceService> {
    resolve = jest.fn().mockReturnValue(of([]));
}

describe('TableColumnSelectComponent', () => {
    let tableEditableService: MockTableEditableService;

    const { testModule, createComponent } = getTestingForComponent(TableColumnSelectComponent, {
        ngModule: {
            imports: [
                SelectModule,
                FormItemModule,
                DefaultContextSerializationModule,
                NoopAnimationsModule,
                InvokeModule,
            ],
            declarations: [ContextPipe],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            providers: [MockTableEditableService, MockDatasourceService],
            teardown: { destroyAfterEach: false },
        })
            .overrideComponent(TableColumnSelectComponent, {
                set: {
                    providers: [
                        {
                            provide: TableEditableService,
                            useExisting: MockTableEditableService,
                        },
                    ],
                },
            })
            .overrideComponent(SelectComponent, {
                set: {
                    providers: [
                        {
                            provide: DatasourceService,
                            useExisting: MockDatasourceService,
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

    it('Input error must be bound to config.editableError', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock, context });
        const formItemElem = host.queryComponent(FormItemComponent);

        expect(formItemElem.error).toBe(configMock.editableError);
    });

    it('Template must render <spy-select> element as [control]', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock, context });
        const selectElem = host.queryCss('spy-select[control]');

        expect(selectElem).toBeTruthy();
        expect(selectElem.parent.attributes['class']).toContain('ant-form-item-control-input-content');
    });

    describe('@Input()', () => {
        it('`placeholder` must be bound to `placeholder` select of the <spy-select> element', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const selectElem = host.queryComponent(SelectComponent);

            expect(selectElem.placeholder).toBe(configMock.placeholder);
        });

        it('`options` must be bound to `options` select of the <spy-select> element', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const selectElem = host.queryComponent(SelectComponent);

            expect(selectElem.options).toBe(configMock.options);
        });

        it('`multiple` must be bound to `multiple` select of the <spy-select> element', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const selectElem = host.queryComponent(SelectComponent);

            expect(selectElem.multiple).toBe(configMock.multiple);
        });

        it('`search` must be bound to `search` select of the <spy-select> element', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const selectElem = host.queryComponent(SelectComponent);

            expect(selectElem.search).toBe(configMock.search);
        });

        it('`disableClear` must be bound to `disableClear` select of the <spy-select> element', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const selectElem = host.queryComponent(SelectComponent);

            expect(selectElem.disableClear).toBe(configMock.disableClear);
        });

        it('`showSelectAll` must be bound to `showSelectAll` select of the <spy-select> element', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const selectElem = host.queryComponent(SelectComponent);

            expect(selectElem.showSelectAll).toBe(configMock.showSelectAll);
        });

        it('`selectAllTitle` must be bound to `selectAllTitle` select of the <spy-select> element', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const selectElem = host.queryComponent(SelectComponent);

            expect(selectElem.selectAllTitle).toBe(configMock.selectAllTitle);
        });

        it('`noOptionsText` must be bound to `noOptionsText` select of the <spy-select> element', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const selectElem = host.queryComponent(SelectComponent);

            expect(selectElem.noOptionsText).toBe(configMock.noOptionsText);
        });

        it('`datasource` must be bound to `datasource` property of the <spy-select> element', async () => {
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
            const selectElem = host.queryComponent(SelectComponent);

            expect(selectElem?.datasource).toEqual(mockDatasourceConfig);
        });
    });

    describe('@Output()', () => {
        it('must be triggered on `valueChange` output of the <spy-select> element', async () => {
            const mockValue = 'value';
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const selectElem = host.queryCss('spy-select');

            selectElem.triggerEventHandler('valueChange', mockValue);
            host.detectChanges();

            expect(tableEditableService.updateValue).toHaveBeenCalledWith(mockValue, context.config);
        });

        it('`valueChange` of the <spy-input> element should update `context.value`', async () => {
            const mockValue = 'value';
            const host = await createComponentWrapper(createComponent, { config: configMock, context });
            const selectElem = host.queryCss('spy-select');

            selectElem.triggerEventHandler('valueChange', mockValue);
            host.detectChanges();

            expect(host.component.context?.value).toBe(mockValue);
        });
    });
});
