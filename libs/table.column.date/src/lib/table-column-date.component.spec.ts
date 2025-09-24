import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { TableColumnDateComponent } from './table-column-date.component';

const configMock: any = [
    {
        date: new Date('2020-01-01T17:25:00'),
        format: 'mediumDate',
    },
    {
        date: new Date('2020-01-01T17:25:00'),
        format: 'mm:ss',
    },
    {
        date: '${displayValue}',
        format: 'mm:ss',
    },
];
const context: any = {
    displayValue: new Date('2020-01-01T17:25:00'),
};

describe('TableColumnDateComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(TableColumnDateComponent, {
        ngModule: {
            imports: [DefaultContextSerializationModule],
            declarations: [ContextPipe],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('Template must render value from `config.date` converted by `DatePipe` with custom format value', async () => {
        const expectedValue = '25:00';
        const host = await createComponentWrapper(createComponent, { config: configMock[1], context });
        const tableElem = host.queryCss('spy-table-column-date');

        expect(tableElem.nativeElement.textContent).toContain(expectedValue);
    });

    it('Template must render value from `config.date` converted by `DatePipe` with format value', async () => {
        const expectedValue = 'Jan 1, 2020';
        const host = await createComponentWrapper(createComponent, { config: configMock[0], context });
        const tableElem = host.queryCss('spy-table-column-date');

        expect(tableElem.nativeElement.textContent).toContain(expectedValue);
    });

    it('Template must render value from `config.date` with dynamic text string from context', async () => {
        const expectedValue = '25:00';
        const host = await createComponentWrapper(createComponent, { config: configMock[2], context });
        const tableElem = host.queryCss('spy-table-column-date');

        expect(tableElem.nativeElement.textContent).toContain(expectedValue);
    });
});
