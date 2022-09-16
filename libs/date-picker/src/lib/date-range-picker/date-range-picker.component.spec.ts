import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { DateRangePickerComponent } from './date-range-picker.component';

const mockedDates = {
    from: new Date('2012-12-12'),
    to: new Date('2012-12-17'),
};
const mockedPlaceholder = 'placeholder';
const mockedFormat = 'yyyy-MM-dd';
const mockedName = 'mockedName';

describe('DateRangePickerComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(DateRangePickerComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should render two <spy-date-picker> elements', async () => {
        const host = await createComponentWrapper(createComponent, { dates: mockedDates });
        const datePickerElemFrom = host.queryCss('spy-date-picker');
        const datePickerElemTo = host.queryCss('.ant-range-picker-col:last-child spy-date-picker');

        expect(datePickerElemFrom).toBeTruthy();
        expect(datePickerElemTo).toBeTruthy();
    });

    describe('@Input', () => {
        it('Input `dates.from` should be bound to `date` of first <spy-date-picker>', async () => {
            const host = await createComponentWrapper(createComponent, { dates: mockedDates });
            const datePickerElemFrom = host.queryCss('spy-date-picker');

            expect(datePickerElemFrom.properties.date).toBe(mockedDates.from);
        });

        it('Input `dates.to` should be bound to `date` of second <spy-date-picker>', async () => {
            const host = await createComponentWrapper(createComponent, { dates: mockedDates });
            const datePickerElemTo = host.queryCss('.ant-range-picker-col:last-child spy-date-picker');

            expect(datePickerElemTo.properties.date).toBe(mockedDates.to);
        });

        it('Object `{ to: dates.to }` should be bound to `enableDate` of first <spy-date-picker>', async () => {
            const host = await createComponentWrapper(createComponent, { dates: mockedDates });
            const datePickerElemFrom = host.queryCss('spy-date-picker');

            expect(datePickerElemFrom.properties.enableDate.to).toBe(mockedDates.to);
        });

        it('Object `{ from: dates.from }` should be bound to `enableDate` of second <spy-date-picker>', async () => {
            const host = await createComponentWrapper(createComponent, { dates: mockedDates });
            const datePickerElemTo = host.queryCss('.ant-range-picker-col:last-child spy-date-picker');

            expect(datePickerElemTo.properties.enableDate.from).toBe(mockedDates.from);
        });

        it('Input `placeholderFrom` should be bound to `placeholder` of first <spy-date-picker>', async () => {
            const host = await createComponentWrapper(createComponent, {
                dates: mockedDates,
                placeholderFrom: mockedPlaceholder,
            });
            const datePickerElemFrom = host.queryCss('spy-date-picker');

            expect(datePickerElemFrom.properties.placeholder).toBe(mockedPlaceholder);
        });

        it('Input `placeholderTo` should be bound to `placeholder` of second <spy-date-picker>', async () => {
            const host = await createComponentWrapper(createComponent, {
                dates: mockedDates,
                placeholderTo: mockedPlaceholder,
            });
            const datePickerElemTo = host.queryCss('.ant-range-picker-col:last-child spy-date-picker');

            expect(datePickerElemTo.properties.placeholder).toBe(mockedPlaceholder);
        });

        it('Input `nameFrom` should be bound to `name` of first <spy-date-picker>', async () => {
            const host = await createComponentWrapper(createComponent, { dates: mockedDates, nameFrom: mockedName });
            const datePickerElemFrom = host.queryCss('spy-date-picker');

            expect(datePickerElemFrom.properties.name).toBe(mockedName);
        });

        it('Input `nameTo` should be bound to `name` of second <spy-date-picker>', async () => {
            const host = await createComponentWrapper(createComponent, { dates: mockedDates, nameTo: mockedName });
            const datePickerElemTo = host.queryCss('.ant-range-picker-col:last-child spy-date-picker');

            expect(datePickerElemTo.properties.name).toBe(mockedName);
        });

        it('Input `clearButton` should be bound to `clearButton` of both date pickers', async () => {
            const host = await createComponentWrapper(createComponent, { dates: mockedDates, clearButton: true });
            const datePickerElemFrom = host.queryCss('spy-date-picker');
            const datePickerElemTo = host.queryCss('.ant-range-picker-col:last-child spy-date-picker');

            expect(datePickerElemFrom.properties.clearButton).toBeTruthy();
            expect(datePickerElemTo.properties.clearButton).toBeTruthy();
        });

        it('Input `disabled` should be bound to `disabled` of both date pickers', async () => {
            const host = await createComponentWrapper(createComponent, { dates: mockedDates, disabled: false });
            const datePickerElemFrom = host.queryCss('spy-date-picker');
            const datePickerElemTo = host.queryCss('.ant-range-picker-col:last-child spy-date-picker');

            expect(datePickerElemFrom.properties.disabled).toBeFalsy();
            expect(datePickerElemTo.properties.disabled).toBeFalsy();
        });

        it('Input `format` should be bound to `format` of both date pickers', async () => {
            const host = await createComponentWrapper(createComponent, { dates: mockedDates, format: mockedFormat });
            const datePickerElemFrom = host.queryCss('spy-date-picker');
            const datePickerElemTo = host.queryCss('.ant-range-picker-col:last-child spy-date-picker');

            expect(datePickerElemFrom.properties.format).toBe(mockedFormat);
            expect(datePickerElemTo.properties.format).toBe(mockedFormat);
        });

        it('Input `time` should be bound to `time` of both date pickers', async () => {
            const host = await createComponentWrapper(createComponent, { dates: mockedDates, time: true });
            const datePickerElemFrom = host.queryCss('spy-date-picker');
            const datePickerElemTo = host.queryCss('.ant-range-picker-col:last-child spy-date-picker');

            expect(datePickerElemFrom.properties.time).toBe(host.component.time);
            expect(datePickerElemTo.properties.time).toBe(host.component.time);
        });
    });

    describe('Outputs', () => {
        it('Output `datesChange` should be emmited with input dates everytime `dateChange` output emits from first picker', async () => {
            const host = await createComponentWrapper(createComponent, { dates: mockedDates, format: mockedFormat });

            host.hostComponent.datesChange = jest.fn();

            const datePickerElemFrom = host.queryCss('spy-date-picker');

            datePickerElemFrom.triggerEventHandler('dateChange', mockedDates.from);
            host.detectChanges();

            expect(host.hostComponent.datesChange).toHaveBeenCalledWith(mockedDates);
        });

        it('Output `datesChange` should be emmited with input dates everytime `dateChange` output emits from second picker', async () => {
            const host = await createComponentWrapper(createComponent, { dates: mockedDates, format: mockedFormat });

            host.hostComponent.datesChange = jest.fn();

            const datePickerElemTo = host.queryCss('.ant-range-picker-col:last-child spy-date-picker');

            datePickerElemTo.triggerEventHandler('dateChange', mockedDates.to);
            host.detectChanges();

            expect(host.hostComponent.datesChange).toHaveBeenCalledWith(mockedDates);
        });
    });
});
