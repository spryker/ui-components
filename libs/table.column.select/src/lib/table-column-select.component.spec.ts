import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatasourceService } from '@spryker/datasource';
import { FormItemComponent, FormItemModule } from '@spryker/form-item';
import { SelectComponent, SelectModule } from '@spryker/select';
import { TableEditableService } from '@spryker/table.feature.editable';
import { ContextPipe, DefaultContextSerializationModule, InvokeModule } from '@spryker/utils';
import { of } from 'rxjs';
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
    config: { id: 'id' },
};

class MockTableEditableService {
    updateValue = jest.fn();
}

class MockDatasourceService implements Partial<DatasourceService> {
    resolve = jest.fn().mockReturnValue(of([]));
}

describe('TableColumnSelectComponent', () => {
    let fixture: any;
    let tableEditableService: MockTableEditableService;

    const q = (css: string) => fixture.debugElement.query(By.css(css));
    const qDir = <T>(dir: any) => fixture.debugElement.query(By.directive(dir))?.componentInstance as T;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SelectModule,
                FormItemModule,
                DefaultContextSerializationModule,
                NoopAnimationsModule,
                InvokeModule,
            ],
            declarations: [TableColumnSelectComponent, ContextPipe],
            providers: [MockTableEditableService, MockDatasourceService],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        })
            .overrideComponent(TableColumnSelectComponent, {
                set: {
                    providers: [{ provide: TableEditableService, useExisting: MockTableEditableService }],
                },
            })
            .overrideComponent(SelectComponent, {
                set: {
                    providers: [{ provide: DatasourceService, useExisting: MockDatasourceService }],
                },
            })
            .compileComponents();

        tableEditableService = TestBed.inject(MockTableEditableService);
        fixture = TestBed.createComponent(TableColumnSelectComponent);
        fixture.detectChanges();
    });

    it('Template must render <spy-form-item> element', async () => {
        fixture.componentRef.setInput('config', configMock);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const formItemElem = q('spy-form-item');
        expect(formItemElem).toBeTruthy();
    });

    it('Input error must be bound to config.editableError', async () => {
        fixture.componentRef.setInput('config', configMock);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const formItem = qDir<FormItemComponent>(FormItemComponent);
        expect(formItem.error).toBe(configMock.editableError);
    });

    it('Template must render <spy-select> element as [control]', async () => {
        fixture.componentRef.setInput('config', configMock);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const selectElem = q('spy-select[control]');
        expect(selectElem).toBeTruthy();
        expect(selectElem.parent.attributes['class']).toContain('ant-form-item-control-input-content');
    });

    describe('@Input()', () => {
        it('`placeholder` must be bound to `placeholder` select of the <spy-select> element', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const cmp = qDir<SelectComponent>(SelectComponent);
            expect(cmp.placeholder).toBe(configMock.placeholder);
        });

        it('`options` must be bound to `options` select of the <spy-select> element', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const cmp = qDir<SelectComponent>(SelectComponent);
            expect(cmp.options).toBe(configMock.options);
        });

        it('`multiple` must be bound to `multiple` select of the <spy-select> element', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const cmp = qDir<SelectComponent>(SelectComponent);
            expect(cmp.multiple).toBe(configMock.multiple);
        });

        it('`search` must be bound to `search` select of the <spy-select> element', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const cmp = qDir<SelectComponent>(SelectComponent);
            expect(cmp.search).toBe(configMock.search);
        });

        it('`disableClear` must be bound to `disableClear` select of the <spy-select> element', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const cmp = qDir<SelectComponent>(SelectComponent);
            expect(cmp.disableClear).toBe(configMock.disableClear);
        });

        it('`showSelectAll` must be bound to `showSelectAll` select of the <spy-select> element', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const cmp = qDir<SelectComponent>(SelectComponent);
            expect(cmp.showSelectAll).toBe(configMock.showSelectAll);
        });

        it('`selectAllTitle` must be bound to `selectAllTitle` select of the <spy-select> element', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const cmp = qDir<SelectComponent>(SelectComponent);
            expect(cmp.selectAllTitle).toBe(configMock.selectAllTitle);
        });

        it('`noOptionsText` must be bound to `noOptionsText` select of the <spy-select> element', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const cmp = qDir<SelectComponent>(SelectComponent);
            expect(cmp.noOptionsText).toBe(configMock.noOptionsText);
        });

        it('`datasource` must be bound to `datasource` property of the <spy-select> element', async () => {
            const mockDatasourceConfig = { type: 'inline' as const };

            fixture.componentRef.setInput('config', { ...configMock, datasource: mockDatasourceConfig });
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const cmp = qDir<SelectComponent>(SelectComponent);
            expect(cmp.datasource).toEqual(mockDatasourceConfig);
        });
    });

    describe('@Output()', () => {
        it('must be triggered on `valueChange` output of the <spy-select> element', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            q('spy-select').triggerEventHandler('valueChange', 'value');
            fixture.detectChanges();

            expect(tableEditableService.updateValue).toHaveBeenCalledWith('value', context.config);
        });

        it('`valueChange` of the <spy-input> element should update `context.value`', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            q('spy-select').triggerEventHandler('valueChange', 'value');
            fixture.detectChanges();

            expect(fixture.componentInstance.context.value).toBe('value');
        });
    });
});
