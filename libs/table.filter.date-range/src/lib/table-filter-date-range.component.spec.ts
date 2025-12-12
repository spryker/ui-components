import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableFilterDateRangeComponent } from './table-filter-date-range.component';
import { TableFilterDateRange } from './types';

const mockDateRangeConfig: TableFilterDateRange = {
    __capturedValue: {},
    id: 'Filter Id',
    title: 'Filter title',
    type: 'date-range',
    typeOptions: {
        placeholderFrom: 'from',
        placeholderTo: 'to',
        format: 'yyyy-MM-dd',
    },
};

const mockValue = { from: '2012-12-12', to: '2012-12-17' };

describe('TableFilterDateRangeComponent', () => {
    let fixture: any;

    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TableFilterDateRangeComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(TableFilterDateRangeComponent);
        fixture.detectChanges();
    });

    it('template must render <spy-date-range-picker>', async () => {
        fixture.componentRef.setInput('config', mockDateRangeConfig);
        fixture.detectChanges();

        const dateRangeElem = q('spy-date-range-picker');
        expect(dateRangeElem).toBeTruthy();
    });

    describe('@Input(config)', () => {
        it('`value` must be bound to `dates` input of the <spy-date-range-picker> element', async () => {
            fixture.componentRef.setInput('config', mockDateRangeConfig);
            fixture.componentRef.setInput('value', mockValue);
            fixture.detectChanges();

            const de = q('spy-date-range-picker');
            expect(de.properties.dates).toBe(mockValue);
        });

        it('`config.typeOptions.placeholderFrom` must be bound to `placeholderFrom` input of the <spy-date-range-picker> element', async () => {
            fixture.componentRef.setInput('config', mockDateRangeConfig);
            fixture.componentRef.setInput('value', mockValue);
            fixture.detectChanges();

            const de = q('spy-date-range-picker');
            expect(de.properties.placeholderFrom).toBe(mockDateRangeConfig.typeOptions.placeholderFrom);
        });

        it('`config.typeOptions.placeholderTo` must be bound to `placeholderTo` input of the <spy-date-range-picker> element', async () => {
            fixture.componentRef.setInput('config', mockDateRangeConfig);
            fixture.componentRef.setInput('value', mockValue);
            fixture.detectChanges();

            const de = q('spy-date-range-picker');
            expect(de.properties.placeholderTo).toBe(mockDateRangeConfig.typeOptions.placeholderTo);
        });

        it('`config.typeOptions.format` must be bound to `format` input of the <spy-date-range-picker> element', async () => {
            fixture.componentRef.setInput('config', mockDateRangeConfig);
            fixture.componentRef.setInput('value', mockValue);
            fixture.detectChanges();

            const de = q('spy-date-range-picker');
            expect(de.properties.format).toBe(mockDateRangeConfig.typeOptions.format);
        });
    });

    describe('@Output(valueChange)', () => {
        it('must be triggered on `datesChange` output of the <spy-date-range-picker> element', async () => {
            fixture.componentRef.setInput('config', mockDateRangeConfig);
            fixture.componentRef.setInput('value', mockValue);
            jest.spyOn(fixture.componentInstance.valueChange, 'emit');
            fixture.detectChanges();

            q('spy-date-range-picker').triggerEventHandler('datesChange', true);
            fixture.detectChanges();

            expect(fixture.componentInstance.valueChange.emit).toHaveBeenCalledWith(true);
        });
    });
});
