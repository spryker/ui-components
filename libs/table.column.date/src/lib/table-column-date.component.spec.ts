import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { TableColumnDateComponent } from './table-column-date.component';

const configMock: any[] = [
    { date: new Date('2020-01-01T17:25:00'), format: 'mediumDate' },
    { date: new Date('2020-01-01T17:25:00'), format: 'mm:ss' },
    { date: '${displayValue}', format: 'mm:ss' },
];

const context: any = {
    displayValue: new Date('2020-01-01T17:25:00'),
};

describe('TableColumnDateComponent', () => {
    let fixture: any;

    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, DefaultContextSerializationModule],
            declarations: [TableColumnDateComponent, ContextPipe],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(TableColumnDateComponent);
    });

    it('Template must render value from `config.date` converted by `DatePipe` with custom format value', () => {
        const expectedValue = '25:00';

        fixture.componentRef.setInput('config', configMock[1]);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain(expectedValue);
    });

    it('Template must render value from `config.date` converted by `DatePipe` with format value', () => {
        const expectedValue = 'Jan 1, 2020';

        fixture.componentRef.setInput('config', configMock[0]);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain(expectedValue);
    });

    it('Template must render value from `config.date` with dynamic text string from context', () => {
        const expectedValue = '25:00';

        fixture.componentRef.setInput('config', configMock[2]);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain(expectedValue);
    });
});
