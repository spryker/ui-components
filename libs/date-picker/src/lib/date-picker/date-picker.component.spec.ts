import { NO_ERRORS_SCHEMA, Component, Input, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { ToIsoDateFormatModule } from '@spryker/utils';
import { TestLocaleModule } from '@spryker/locale/testing';
import { DatePickerComponent } from './date-picker.component';

const nzDatePickerSelector = 'nz-date-picker';
const mockedDate = new Date('2012-12-12');
const mockedExpectedDate = '2012-12-12T00:00:00.000Z';
const mockedFormat = 'yyyy-MM-dd';
const mockedPlaceholder = 'placeholder';
const mockedCallValue = 'mockedCallValue';
const mockedName = 'mockedName';
const mockedEnableTimeObject = {
    onlyWorkHours: false,
    from: '2020.11.05 8:30',
    to: '2020.11.05 17:30',
};
const mockedEnableTimeFunction = () => ({
    hours: () => [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    minutes: () => [...Array(31).keys()],
    seconds: () => [],
});
const mockedDisabledTime = () => ({
    nzDisabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 18, 19, 20, 21, 22, 23],
    nzDisabledMinutes: () => [...Array(29).keys()].map((_, index) => 31 + index),
    nzDisabledSeconds: () => [],
});

@Component({
    standalone: false,
    template: `
        <spy-date-picker
            [clearButton]="clearButton"
            [disabled]="disabled"
            [date]="date"
            [format]="format"
            [name]="name"
            [placeholder]="placeholder"
            [enableTime]="enableTime"
            [time]="time"
            [open]="open"
            (dateChange)="onDateChange($event)"
            (openChange)="onOpenChange($event)"
        ></spy-date-picker>
    `,
})
class TestHostComponent {
    @Input() clearButton?: boolean;
    @Input() disabled?: boolean;
    @Input() date?: Date;
    @Input() format?: string;
    @Input() name?: string;
    @Input() placeholder?: string;
    @Input() enableTime?: any;
    @Input() time?: boolean;
    @Input() open?: boolean;

    onDateChange = jest.fn();
    onOpenChange = jest.fn();
}

describe('DatePickerComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DatePickerComponent, TestHostComponent],
            imports: [TestLocaleModule, NoopAnimationsModule, ToIsoDateFormatModule, NzDatePickerModule],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
            providers: [
                { provide: LOCALE_ID, useValue: 'en-US' },
                { provide: NZ_I18N, useValue: en_US },
            ],
        });

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should render <nz-date-picker> element from Ant Design', () => {
        const datePicker = fixture.debugElement.query(By.css(nzDatePickerSelector));
        expect(datePicker).toBeTruthy();
    });

    describe('@Input', () => {
        it('Input `clearButton` -> `nzAllowClear`', () => {
            fixture.componentInstance.clearButton = true;
            fixture.detectChanges();
            const datePicker = fixture.debugElement.query(By.css(nzDatePickerSelector));
            expect(datePicker.componentInstance.nzAllowClear).toBe(true);
        });

        it('Input `disabled` -> `nzDisabled`', () => {
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            const datePicker = fixture.debugElement.query(By.css(nzDatePickerSelector));
            expect(datePicker.componentInstance.nzDisabled).toBe(true);
        });

        it('Input `date` -> hidden input ngModel (ISO)', () => {
            fixture.componentInstance.date = mockedDate;
            fixture.detectChanges();
            const hidden = fixture.debugElement.query(By.css('input[type="hidden"]'));
            expect(hidden.properties.ngModel).toBe(mockedExpectedDate);
        });

        it('Input `date` -> <nz-date-picker> ngModel', () => {
            fixture.componentInstance.date = mockedDate;
            fixture.detectChanges();
            const datePicker = fixture.debugElement.query(By.css(nzDatePickerSelector));
            expect(datePicker.properties.ngModel).toEqual(mockedDate);
        });

        it('Input `format` -> `nzFormat`', () => {
            fixture.componentInstance.format = mockedFormat;
            fixture.detectChanges();
            const datePicker = fixture.debugElement.query(By.css(nzDatePickerSelector));
            expect(datePicker.componentInstance.nzFormat).toBe(mockedFormat);
        });

        it('Input `name` -> hidden input `name`', () => {
            fixture.componentInstance.name = mockedName;
            fixture.detectChanges();
            const hidden = fixture.debugElement.query(By.css('input[type="hidden"]'));
            expect(hidden.properties.name).toBe(mockedName);
        });

        it('Input `placeholder` -> `nzPlaceHolder`', () => {
            fixture.componentInstance.placeholder = mockedPlaceholder;
            fixture.detectChanges();
            const datePicker = fixture.debugElement.query(By.css(nzDatePickerSelector));
            expect(datePicker.componentInstance.nzPlaceHolder).toBe(mockedPlaceholder);
        });

        it('Input `enableTime` (object) -> `nzDisabledTime`', () => {
            fixture.componentInstance.enableTime = mockedEnableTimeObject;
            fixture.detectChanges();
            const cmp = fixture.debugElement.query(By.directive(DatePickerComponent))
                .componentInstance as DatePickerComponent;
            const datePicker = fixture.debugElement.query(By.css(nzDatePickerSelector));
            expect(datePicker.componentInstance.nzDisabledTime).toBe(cmp.disabledTime);
        });

        it('Input `enableTime` (function) -> `nzDisabledTime`', () => {
            fixture.componentInstance.enableTime = mockedEnableTimeFunction;
            fixture.detectChanges();
            const cmp = fixture.debugElement.query(By.directive(DatePickerComponent))
                .componentInstance as DatePickerComponent;
            const datePicker = fixture.debugElement.query(By.css(nzDatePickerSelector));
            expect(datePicker.componentInstance.nzDisabledTime).toBe(cmp.disabledTime);
        });

        it('disabledTime returns expected functions with object input', () => {
            fixture.componentInstance.time = true;
            fixture.componentInstance.enableTime = mockedEnableTimeObject;
            fixture.detectChanges();

            const cmp = fixture.debugElement.query(By.directive(DatePickerComponent))
                .componentInstance as DatePickerComponent;
            const disabledTime = cmp.disabledTime(new Date());

            expect(disabledTime.nzDisabledHours()).toEqual(mockedDisabledTime().nzDisabledHours());
            expect(disabledTime.nzDisabledMinutes(17)).toEqual(mockedDisabledTime().nzDisabledMinutes());
            expect(disabledTime.nzDisabledSeconds()).toEqual(mockedDisabledTime().nzDisabledSeconds());
        });

        it('disabledTime returns expected functions with function input', () => {
            fixture.componentInstance.time = true;
            fixture.componentInstance.enableTime = mockedEnableTimeFunction;
            fixture.detectChanges();

            const cmp = fixture.debugElement.query(By.directive(DatePickerComponent))
                .componentInstance as DatePickerComponent;
            const disabledTime = cmp.disabledTime(new Date());

            expect(disabledTime.nzDisabledHours()).toEqual(mockedDisabledTime().nzDisabledHours());
            expect(disabledTime.nzDisabledMinutes(8)).toEqual(mockedDisabledTime().nzDisabledMinutes());
            expect(disabledTime.nzDisabledSeconds()).toEqual(mockedDisabledTime().nzDisabledSeconds());
        });

        it('Input `time` -> `nzShowTime` equals component.nzTime', () => {
            fixture.componentInstance.time = true;
            fixture.detectChanges();
            const cmp = fixture.debugElement.query(By.directive(DatePickerComponent))
                .componentInstance as DatePickerComponent;
            const datePicker = fixture.debugElement.query(By.css(nzDatePickerSelector));
            expect(datePicker.componentInstance.nzShowTime).toBe(cmp.nzTime);
        });
    });

    describe('@Output', () => {
        it('`dateChange` emits on `ngModelChange` from <nz-date-picker>', () => {
            const datePicker = fixture.debugElement.query(By.css(nzDatePickerSelector));
            datePicker.triggerEventHandler('ngModelChange', mockedCallValue);
            expect(fixture.componentInstance.onDateChange).toHaveBeenCalledWith(mockedCallValue);
        });

        it('`openChange` emits on `nzOnOpenChange` from <nz-date-picker>', () => {
            const datePicker = fixture.debugElement.query(By.css(nzDatePickerSelector));
            datePicker.triggerEventHandler('nzOnOpenChange', mockedCallValue);
            fixture.detectChanges();
            expect(fixture.componentInstance.onOpenChange).toHaveBeenCalledWith(mockedCallValue);
        });
    });

    describe('Methods / classes', () => {
        it('applies `open` class when `open` input is true', fakeAsync(() => {
            fixture.componentInstance.open = true;
            fixture.detectChanges();

            tick();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            const hostEl: HTMLElement = fixture.debugElement.query(By.css('spy-date-picker')).nativeElement;
            expect(hostEl.classList.contains('open')).toBe(true);
        }));

        it('does not apply `open` class when `open` input is false', fakeAsync(() => {
            fixture.componentInstance.open = false;
            fixture.detectChanges();

            tick();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            const hostEl: HTMLElement = fixture.debugElement.query(By.css('spy-date-picker')).nativeElement;
            expect(hostEl.classList.contains('open')).toBe(false);
        }));
    });
});
