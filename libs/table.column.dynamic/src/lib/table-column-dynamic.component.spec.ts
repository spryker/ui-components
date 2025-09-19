// libs/table/src/lib/columns/dynamic/table-column-dynamic.component.spec.ts
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DatasourceService } from '@spryker/datasource';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { BehaviorSubject, of } from 'rxjs';
import { TableColumnDynamicComponent } from './table-column-dynamic.component';

const configMock: any = {
    datasource: {
        type: 'inline',
        data: {
            type: 'select',
            typeOptions: {
                options: [
                    { title: 'Option dynamic 1', value: 'Option dynamic 1' },
                    { title: 'Option dynamic 2', value: 'Option dynamic 2' },
                ],
            },
        },
    },
};

const context: any = {
    value: 'value',
    i: '0',
    j: '2',
    config: {
        id: 'dynamic',
        title: 'dynamic',
    },
};

class MockDatasourceService implements Partial<DatasourceService> {
    resolve = jest.fn();
}

describe('TableColumnDynamicComponent', () => {
    let fixture: any;
    let datasource: MockDatasourceService;

    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DefaultContextSerializationModule],
            declarations: [TableColumnDynamicComponent, ContextPipe],
            providers: [
                MockDatasourceService,
                { provide: DatasourceService, useExisting: MockDatasourceService },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        datasource = TestBed.inject(MockDatasourceService);
        fixture = TestBed.createComponent(TableColumnDynamicComponent);
    });

    it('should render <spy-table-column-renderer> element with config from datasource', fakeAsync(() => {
        datasource.resolve.mockReturnValue(of(configMock.datasource.data));

        fixture.componentRef.setInput('config', configMock);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        tick();
        fixture.detectChanges();

        const updatedConfigMock = {
            ...configMock.datasource.data,
            id: context.config.id,
            title: context.config.title,
        };

        const de = q('spy-table-column-renderer');
        expect(de).toBeTruthy();
        expect(de.properties.config).toEqual(updatedConfigMock);
    }));

    it('should render <nz-spin> if `isColConfigLoading$` signal invokes', fakeAsync(() => {
        const datasourceData$ = new BehaviorSubject(of(configMock.datasource.data));
        datasource.resolve.mockReturnValue(datasourceData$);

        fixture.componentRef.setInput('config', configMock);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        let spinDe = q('nz-spin');
        expect(spinDe).toBeTruthy();

        tick();
        fixture.detectChanges();

        datasourceData$.next(configMock as any);
        tick();
        fixture.detectChanges();

        spinDe = q('nz-spin');
        expect(spinDe).toBeFalsy();
    }));

    it('should bound `colData` property to the `data` input of <spy-table-column-renderer> element', () => {
        fixture.componentRef.setInput('config', configMock);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const de = q('spy-table-column-renderer');
        expect(de.properties.data).toStrictEqual({ dynamic: context.value });
    });

    it('should bound `i` property from `@Input(type)` to the `i` input of <spy-table-column-renderer> element', () => {
        fixture.componentRef.setInput('config', configMock);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const de = q('spy-table-column-renderer');
        expect(de.properties.i).toStrictEqual(context.i);
    });

    it('should bound `j` property from `@Input(type)` to the `j` input of <spy-table-column-renderer> element', () => {
        fixture.componentRef.setInput('config', configMock);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const de = q('spy-table-column-renderer');
        expect(de.properties.j).toStrictEqual(context.j);
    });
});
