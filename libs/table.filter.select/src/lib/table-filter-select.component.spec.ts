import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectOptionItem } from '@spryker/select';
import { I18nTestService, TestLocaleModule } from '@spryker/locale/testing';
import { TableFilterSelectComponent } from './table-filter-select.component';
import { TableFilterSelect } from './types';

const mockSelectValues = [
    { title: 'Option 1', value: 'value_1' },
    { title: 'Option 2', value: 'value_2' },
];

const mockTransformedSelectValues: SelectOptionItem[] = [
    { title: 'Option 1', value: 'value_1' },
    { title: 'Option 2', value: 'value_2' },
];

const mockSelectValue = ['value_1'];

const mockSelectConfig: TableFilterSelect = {
    __capturedValue: '',
    id: 'Filter Id',
    title: 'Filter title',
    type: 'select',
    typeOptions: {
        values: mockSelectValues,
        multiselect: true,
    },
};

describe('TableFilterSelectComponent', () => {
    let fixture: any;
    let service: I18nTestService;

    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestLocaleModule],
            declarations: [TableFilterSelectComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        service = TestBed.inject(I18nTestService);
        fixture = TestBed.createComponent(TableFilterSelectComponent);
        fixture.detectChanges();
    });

    it('template must render <spy-select>', async () => {
        fixture.detectChanges();
        const selectElem = q('spy-select');
        expect(selectElem).toBeTruthy();
    });

    describe('@Input(config)', () => {
        it('`config.title` must be bound to `placeholder` input of the <spy-select> element', async () => {
            const token = 'table.filter.select.filter:title';
            fixture.componentRef.setInput('config', mockSelectConfig);
            fixture.componentRef.setInput('value', mockSelectValue);
            fixture.detectChanges();

            expect(service.getLocaleData(token, 'title')).toBe(mockSelectConfig.title);
        });

        it('`config.typeOptions.multiselect` must be bound to placeholder multiple of the <spy-select> element', async () => {
            fixture.componentRef.setInput('config', mockSelectConfig);
            fixture.componentRef.setInput('value', mockSelectValue);
            fixture.detectChanges();

            const selectElem = q('spy-select');
            expect(selectElem.properties.multiple).toBe(mockSelectConfig.typeOptions.multiselect);
        });

        it('`config.typeOptions.values` must be assigned to `selectOptions` property by mapping to type `SelectOptionItem`', async () => {
            fixture.componentRef.setInput('config', mockSelectConfig);
            fixture.componentRef.setInput('value', mockSelectValue);
            fixture.detectChanges();

            expect(fixture.componentInstance.selectOptions).toEqual(mockTransformedSelectValues);
        });

        it('`config.typeOptions.values` must be assigned to `selectOptions` property by mapping to type `SelectOptionItem` when config changed', async () => {
            fixture.componentRef.setInput('config', mockSelectConfig);
            fixture.componentRef.setInput('value', mockSelectValue);
            fixture.detectChanges();

            expect(fixture.componentInstance.selectOptions).toEqual(mockTransformedSelectValues);

            const newConfig: TableFilterSelect = {
                ...mockSelectConfig,
                typeOptions: { values: [mockSelectValues[0]], multiselect: true },
            };

            fixture.componentRef.setInput('config', newConfig);
            fixture.detectChanges();

            expect(fixture.componentInstance.selectOptions).toEqual([mockTransformedSelectValues[0]]);
        });
    });

    describe('@Input(value)', () => {
        it('`value` must be bound to `value` input of the <spy-select> element', async () => {
            fixture.componentRef.setInput('config', mockSelectConfig);
            fixture.componentRef.setInput('value', mockSelectValue);
            fixture.detectChanges();

            const selectElem = q('spy-select');
            expect(selectElem.properties.value).toEqual(mockSelectValue);
        });
    });

    describe('@Output(valueChange)', () => {
        it('must be triggered on `valueChange` output of the <spy-select> element', async () => {
            fixture.componentRef.setInput('config', mockSelectConfig);
            fixture.componentRef.setInput('value', mockSelectValue);
            jest.spyOn(fixture.componentInstance.valueChange, 'emit');
            fixture.detectChanges();

            q('spy-select').triggerEventHandler('valueChange', mockSelectValue[0]);
            fixture.detectChanges();

            expect(fixture.componentInstance.valueChange.emit).toHaveBeenCalledWith(mockSelectValue[0]);
        });
    });
});
