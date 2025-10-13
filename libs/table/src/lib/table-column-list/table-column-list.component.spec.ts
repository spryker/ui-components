import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableColumnListComponent, TableColumnListConfig } from './table-column-list.component';

const mockConfig: TableColumnListConfig = {
    limit: 2,
    type: 'test',
    typeOptions: {
        text: '${value}',
    },
};

const mockContext = {
    $implicit: 'test value',
    config: {
        id: 'sku',
        title: 'sku',
        type: 'list',
        typeOptions: {
            limit: 2,
            type: 'test',
            typeOptions: {
                text: '${value}',
            },
        },
    },
    row: {
        name: 'name',
        sku: 'non transformed value',
    },
    i: 0,
};

const mockContextWithSimpleValue: any = {
    ...mockContext,
    value: 'test value',
};

const mockContextWithMultiple: any = {
    ...mockContext,
    value: ['test value', 'test', 'test'],
};

const mockContextWithMultipleNoLimit: any = {
    ...mockContext,
    value: ['test value'],
};

const mockTransformedData = { name: 'name', sku: 'test value' };
const mockTransformedConfig = {
    id: 'sku',
    title: 'sku',
    type: 'test',
    typeOptions: { text: '${value}' },
};

describe('TableColumnListComponent', () => {
    let fixture: any;

    const q = (css: string) => fixture.debugElement.query(By.css(css));
    const qAll = (css: string) => fixture.debugElement.queryAll(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TableColumnListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(TableColumnListComponent);
        fixture.detectChanges();
    });

    it('should render <spy-popover> element if `values.length` more than `valueLimit`', () => {
        fixture.componentRef.setInput('config', mockConfig);
        fixture.componentRef.setInput('context', mockContextWithMultiple);
        fixture.detectChanges();

        const popoverElem = q('spy-popover');

        expect(mockContext.config.typeOptions.limit < mockContextWithMultiple.value.length).toBeTruthy();
        expect(popoverElem).toBeTruthy();
    });

    it('should not render <spy-popover> element if `values.length` less or equal than `valueLimit`', () => {
        fixture.componentRef.setInput('config', mockConfig);
        fixture.componentRef.setInput('context', mockContextWithMultipleNoLimit);
        fixture.detectChanges();

        const popoverElem = q('spy-popover');

        expect(mockContext.config.typeOptions.limit >= mockContextWithMultipleNoLimit.value.length).toBeTruthy();
        expect(popoverElem).toBeFalsy();
    });

    it('should render `.spy-table-column-list__trigger` with `values.length` if `values.length` more than `valueLimit`', () => {
        fixture.componentRef.setInput('config', mockConfig);
        fixture.componentRef.setInput('context', mockContextWithMultiple);
        fixture.detectChanges();

        const triggerElem = q('.spy-table-column-list__trigger');

        expect(mockContext.config.typeOptions.limit < mockContextWithMultiple.value.length).toBeTruthy();
        expect(triggerElem).toBeTruthy();
        expect(triggerElem.nativeElement.textContent).toContain(`(${mockContextWithMultiple.value.length})`);
    });

    it('should render <spy-table-column-renderer> element', () => {
        fixture.componentRef.setInput('config', mockConfig);
        fixture.componentRef.setInput('context', mockContextWithSimpleValue);
        fixture.detectChanges();

        const columnElem = q('spy-table-column-renderer');

        expect(columnElem).toBeTruthy();
    });

    it('<spy-table-column-renderer> element should bind transformed `config` to the input `config`', () => {
        fixture.componentRef.setInput('config', mockConfig);
        fixture.componentRef.setInput('context', mockContextWithSimpleValue);
        fixture.detectChanges();

        const columnElem = q('spy-table-column-renderer');

        expect(columnElem.properties.config).toEqual(mockTransformedConfig);
    });

    it('<spy-table-column-renderer> element should bind transformed `data` to the input `data`', () => {
        fixture.componentRef.setInput('config', mockConfig);
        fixture.componentRef.setInput('context', mockContextWithSimpleValue);
        fixture.detectChanges();

        const columnElem = q('spy-table-column-renderer');

        expect(columnElem.properties.data).toEqual(mockTransformedData);
    });
});
