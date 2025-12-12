import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestService, TestLocaleModule } from '@spryker/locale/testing';
import { TableFilterTreeSelectComponent } from './table-filter-tree-select.component';
import { TableFilterTreeSelect } from './types';

const mockTreeSelectValues = [
    { title: 'Option 1', value: 'value_1' },
    { title: 'Option 2', value: 'value_2' },
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
    let fixture: any;
    let service: I18nTestService;

    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestLocaleModule],
            declarations: [TableFilterTreeSelectComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        service = TestBed.inject(I18nTestService);
        fixture = TestBed.createComponent(TableFilterTreeSelectComponent);
        fixture.detectChanges();
    });

    it('template must render <spy-tree-select>', async () => {
        fixture.detectChanges();
        const selectElem = q('spy-tree-select');
        expect(selectElem).toBeTruthy();
    });

    describe('@Input(config)', () => {
        it('`config.title` must be bound to `placeholder` input of the <spy-tree-select> element', async () => {
            const token = 'table.filter.tree-select.filter:title';

            fixture.componentRef.setInput('config', mockTreeSelectConfig);
            fixture.componentRef.setInput('value', mockTreeSelectValue);
            fixture.detectChanges();

            const selectElem = q('spy-tree-select');
            expect(service.getLocaleData(token, 'title')).toBe(mockTreeSelectConfig.title);
            expect(selectElem.properties.placeholder).toBe(token);
        });

        it('`config.typeOptions.multiselect` must be bound to placeholder multiple of the <spy-tree-select> element', async () => {
            fixture.componentRef.setInput('config', mockTreeSelectConfig);
            fixture.componentRef.setInput('value', mockTreeSelectValue);
            fixture.detectChanges();

            const selectElem = q('spy-tree-select');
            expect(selectElem.properties.multiple).toBe(mockTreeSelectConfig.typeOptions.multiselect);
        });

        it('`config.typeOptions.values` must be assigned to `treeSelectOptions` property', async () => {
            fixture.componentRef.setInput('config', mockTreeSelectConfig);
            fixture.componentRef.setInput('value', mockTreeSelectValue);
            fixture.detectChanges();

            expect(fixture.componentInstance.treeSelectOptions).toEqual(mockTreeSelectValues);
        });
    });

    describe('@Input(value)', () => {
        it('`value` must be bound to `value` input of the <spy-tree-select> element', async () => {
            fixture.componentRef.setInput('config', mockTreeSelectConfig);
            fixture.componentRef.setInput('value', mockTreeSelectValues as any);
            fixture.detectChanges();

            const selectElem = q('spy-tree-select');
            expect(selectElem.properties.value).toEqual(mockTreeSelectValues);
        });
    });

    describe('@Output(valueChange)', () => {
        it('must be triggered on `valueChange` output of the <spy-tree-select> element', async () => {
            fixture.componentRef.setInput('config', mockTreeSelectConfig);
            fixture.componentRef.setInput('value', mockTreeSelectValue);
            jest.spyOn(fixture.componentInstance.valueChange, 'emit');
            fixture.detectChanges();

            q('spy-tree-select').triggerEventHandler('valueChange', mockTreeSelectValue[0]);
            fixture.detectChanges();

            expect(fixture.componentInstance.valueChange.emit).toHaveBeenCalledWith(mockTreeSelectValue[0]);
        });
    });
});
