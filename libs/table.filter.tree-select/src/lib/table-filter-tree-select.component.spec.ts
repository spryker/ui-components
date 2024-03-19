import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { I18nTestService, TestLocaleModule } from '@spryker/locale/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { TableFilterTreeSelectComponent } from './table-filter-tree-select.component';
import { TableFilterTreeSelect } from './types';

const mockTreeSelectValues = [
    {
        title: 'Option 1',
        value: 'value_1',
    },
    {
        title: 'Option 2',
        value: 'value_2',
    },
];
const mockTreeSelectValue = ['value_1'];
const mockTreeSelectConfig: TableFilterTreeSelect = {
    __capturedValue: '',
    id: 'Filter Id',
    title: 'Filter title',
    type: 'tree-select',
    typeOptions: {
        values: mockTreeSelectValues,
        multiselect: true,
    },
};

describe('TableFilterTreeSelectComponent', () => {
    let service: I18nTestService;

    const { testModule, createComponent } = getTestingForComponent(TableFilterTreeSelectComponent, {
        ngModule: {
            imports: [TestLocaleModule],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(I18nTestService);
    });

    it('template must render <spy-tree-select>', async () => {
        const host = await createComponentWrapper(createComponent);
        const selectElem = host.queryCss('spy-tree-select');

        expect(selectElem).toBeTruthy();
    });

    describe('@Input(config)', () => {
        it('`config.title` must be bound to `placeholder` input of the <spy-tree-select> element', async () => {
            const token = 'table.filter.tree-select.filter:title';
            const host = await createComponentWrapper(createComponent, {
                config: mockTreeSelectConfig,
                value: mockTreeSelectValue,
            });
            const selectElem = host.queryCss('spy-tree-select');

            expect(service.getLocaleData(token, 'title')).toBe(mockTreeSelectConfig.title);
            expect(selectElem.properties.placeholder).toBe(token);
        });

        it('`config.typeOptions.multiselect` must be bound to placeholder multiple of the <spy-tree-select> element', async () => {
            const host = await createComponentWrapper(createComponent, {
                config: mockTreeSelectConfig,
                value: mockTreeSelectValue,
            });
            const selectElem = host.queryCss('spy-tree-select');

            expect(selectElem.properties.multiple).toBe(mockTreeSelectConfig.typeOptions.multiselect);
        });

        it('`config.typeOptions.values` must be assigned to `treeSelectOptions` property', async () => {
            const host = await createComponentWrapper(createComponent, {
                config: mockTreeSelectConfig,
                value: mockTreeSelectValue,
            });

            expect(host.component.treeSelectOptions).toEqual(mockTreeSelectValues);
        });
    });

    describe('@Input(value)', () => {
        it('`value` must be bound to `value` input of the <spy-tree-select> element', async () => {
            const host = await createComponentWrapper(createComponent, {
                config: mockTreeSelectConfig,
                value: mockTreeSelectValues as any,
            });
            const selectElem = host.queryCss('spy-tree-select');

            expect(selectElem.properties.value).toEqual(mockTreeSelectValues);
        });
    });

    describe('@Output(valueChange)', () => {
        it('must be triggered on `valueChange` output of the <spy-tree-select> element', async () => {
            const host = await createComponentWrapper(createComponent, {
                config: mockTreeSelectConfig,
                value: mockTreeSelectValue,
            });
            const selectElem = host.queryCss('spy-tree-select');

            selectElem.triggerEventHandler('valueChange', mockTreeSelectValue[0]);
            host.detectChanges();

            expect(host.hostComponent.valueChange).toHaveBeenCalledWith(mockTreeSelectValue[0]);
        });
    });
});
