import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DateRangePickerComponent } from './date-range-picker.component';

const mockedDates = {
    from: new Date('2012-12-12'),
    to: new Date('2012-12-17'),
};
const mockedPlaceholder = 'placeholder';
const mockedFormat = 'yyyy-MM-dd';
const mockedName = 'mockedName';

@Component({
    standalone: false,
    template: `
        <spy-date-range-picker
            [dates]="dates"
            [placeholderFrom]="placeholderFrom"
            [placeholderTo]="placeholderTo"
            [nameFrom]="nameFrom"
            [nameTo]="nameTo"
            [clearButton]="clearButton"
            [disabled]="disabled"
            [format]="format"
            [time]="time"
            (datesChange)="datesChange($event)"
        ></spy-date-range-picker>
    `,
})
class TestHostComponent {
    @Input() dates?: { from?: Date; to?: Date };
    @Input() placeholderFrom?: string;
    @Input() placeholderTo?: string;
    @Input() nameFrom?: string;
    @Input() nameTo?: string;
    @Input() clearButton?: boolean;
    @Input() disabled?: boolean;
    @Input() format?: string;
    @Input() time?: boolean;
    datesChange = jest.fn();
}

describe('DateRangePickerComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DateRangePickerComponent, TestHostComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });
    });

    function setup(initial: Partial<TestHostComponent> = { dates: mockedDates }) {
        const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
        Object.assign(fixture.componentInstance, initial);
        fixture.detectChanges();
        return fixture;
    }

    it('should render two <spy-date-picker> elements', () => {
        const fixture = setup();
        const datePickerFrom = fixture.debugElement.query(By.css('spy-date-picker'));
        const datePickerTo = fixture.debugElement.query(By.css('.ant-range-picker-col:last-child spy-date-picker'));
        expect(datePickerFrom).toBeTruthy();
        expect(datePickerTo).toBeTruthy();
    });

    describe('@Input', () => {
        it('`dates.from` -> first <spy-date-picker> `date`', () => {
            const fixture = setup();
            const fromDe = fixture.debugElement.query(By.css('spy-date-picker'));
            expect(fromDe.properties['date']).toBe(mockedDates.from);
        });

        it('`dates.to` -> second <spy-date-picker> `date`', () => {
            const fixture = setup();
            const toDe = fixture.debugElement.query(By.css('.ant-range-picker-col:last-child spy-date-picker'));
            expect(toDe.properties['date']).toBe(mockedDates.to);
        });

        it('`{ to: dates.to }` -> first <spy-date-picker> `enableDate`', () => {
            const fixture = setup();
            const fromDe = fixture.debugElement.query(By.css('spy-date-picker'));
            expect(fromDe.properties['enableDate'].to).toBe(mockedDates.to);
        });

        it('`{ from: dates.from }` -> second <spy-date-picker> `enableDate`', () => {
            const fixture = setup();
            const toDe = fixture.debugElement.query(By.css('.ant-range-picker-col:last-child spy-date-picker'));
            expect(toDe.properties['enableDate'].from).toBe(mockedDates.from);
        });

        it('`placeholderFrom` -> first <spy-date-picker> `placeholder`', () => {
            const fixture = setup({ dates: mockedDates, placeholderFrom: mockedPlaceholder });
            const fromDe = fixture.debugElement.query(By.css('spy-date-picker'));
            expect(fromDe.properties['placeholder']).toBe(mockedPlaceholder);
        });

        it('`placeholderTo` -> second <spy-date-picker> `placeholder`', () => {
            const fixture = setup({ dates: mockedDates, placeholderTo: mockedPlaceholder });
            const toDe = fixture.debugElement.query(By.css('.ant-range-picker-col:last-child spy-date-picker'));
            expect(toDe.properties['placeholder']).toBe(mockedPlaceholder);
        });

        it('`nameFrom` -> first <spy-date-picker> `name`', () => {
            const fixture = setup({ dates: mockedDates, nameFrom: mockedName });
            const fromDe = fixture.debugElement.query(By.css('spy-date-picker'));
            expect(fromDe.properties['name']).toBe(mockedName);
        });

        it('`nameTo` -> second <spy-date-picker> `name`', () => {
            const fixture = setup({ dates: mockedDates, nameTo: mockedName });
            const toDe = fixture.debugElement.query(By.css('.ant-range-picker-col:last-child spy-date-picker'));
            expect(toDe.properties['name']).toBe(mockedName);
        });

        it('`clearButton` -> both pickers', () => {
            const fixture = setup({ dates: mockedDates, clearButton: true });
            const fromDe = fixture.debugElement.query(By.css('spy-date-picker'));
            const toDe = fixture.debugElement.query(By.css('.ant-range-picker-col:last-child spy-date-picker'));
            expect(fromDe.properties['clearButton']).toBe(true);
            expect(toDe.properties['clearButton']).toBe(true);
        });

        it('`disabled` -> both pickers', () => {
            const fixture = setup({ dates: mockedDates, disabled: false });
            const fromDe = fixture.debugElement.query(By.css('spy-date-picker'));
            const toDe = fixture.debugElement.query(By.css('.ant-range-picker-col:last-child spy-date-picker'));
            expect(fromDe.properties['disabled']).toBe(false);
            expect(toDe.properties['disabled']).toBe(false);
        });

        it('`format` -> both pickers', () => {
            const fixture = setup({ dates: mockedDates, format: mockedFormat });
            const fromDe = fixture.debugElement.query(By.css('spy-date-picker'));
            const toDe = fixture.debugElement.query(By.css('.ant-range-picker-col:last-child spy-date-picker'));
            expect(fromDe.properties['format']).toBe(mockedFormat);
            expect(toDe.properties['format']).toBe(mockedFormat);
        });

        it('`time` -> both pickers (matches component.time)', () => {
            const fixture = setup({ dates: mockedDates, time: true });
            const cmp = fixture.debugElement.query(By.directive(DateRangePickerComponent))
                .componentInstance as DateRangePickerComponent;
            const fromDe = fixture.debugElement.query(By.css('spy-date-picker'));
            const toDe = fixture.debugElement.query(By.css('.ant-range-picker-col:last-child spy-date-picker'));
            expect(fromDe.properties['time']).toBe(cmp.time);
            expect(toDe.properties['time']).toBe(cmp.time);
        });
    });

    describe('Outputs', () => {
        it('`datesChange` emits with current dates when first picker emits `dateChange`', () => {
            const fixture = setup({ dates: mockedDates, format: mockedFormat });
            const fromDe = fixture.debugElement.query(By.css('spy-date-picker'));
            fromDe.triggerEventHandler('dateChange', mockedDates.from);
            fixture.detectChanges();
            expect(fixture.componentInstance.datesChange).toHaveBeenCalledWith(mockedDates);
        });

        it('`datesChange` emits with current dates when second picker emits `dateChange`', () => {
            const fixture = setup({ dates: mockedDates, format: mockedFormat });
            const toDe = fixture.debugElement.query(By.css('.ant-range-picker-col:last-child spy-date-picker'));
            toDe.triggerEventHandler('dateChange', mockedDates.to);
            fixture.detectChanges();
            expect(fixture.componentInstance.datesChange).toHaveBeenCalledWith(mockedDates);
        });
    });
});
