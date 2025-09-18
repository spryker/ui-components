import { NO_ERRORS_SCHEMA, Injectable, inject } from '@angular/core';
import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { I18nModule } from '@spryker/locale';
import { InvokeModule, PluckModule } from '@spryker/utils';
import { ActionsService } from '@spryker/actions';
import { DatasourceTypesToken } from '@spryker/datasource';
import { Observable } from 'rxjs';
import { TableFeaturesRendererComponent } from '../table-features-renderer/table-features-renderer.component';
import { TableFeaturesRendererDirective } from '../table-features-renderer/table-features-renderer.directive';
import { TableRenderFeatureDirective } from '../table-features-renderer/table-render-feature.directive';
import { TableFeaturesRegistryToken } from '../table-feature-loader';
import { CoreTableComponent } from './table.component';
import { TableColumns, TableConfig, TableData } from './table';

const mockDataUrl = 'https://test-data-url.com';
const mockColUrl = 'https://test-col-url.com';

const mockCols: TableColumns = [
    { id: 'col1', title: 'col1', sortable: true, width: '40%' },
    { id: 'col2', title: 'col2', sortable: true },
    { id: 'col3', title: 'col3', sortable: true },
];

const mockData: TableData = {
    data: [
        { col1: 'col1_data1', col2: 'col2_data1', col3: 'col3_data1' },
        { col1: 'col1_data2', col2: 'col2_data2', col3: 'col3_data2' },
        { col1: 'col1_data3', col2: 'col2_data2', col3: 'col3_data2' },
    ],
    total: 5,
    pageSize: 10,
    page: 1,
};

const mockConfig: TableConfig = {
    dataSource: { type: 'http' as never, url: mockDataUrl },
    columnsUrl: mockColUrl,
    mockFeature: { enabled: true },
};

const mockConfigCols: TableConfig = {
    dataSource: { type: 'http' as never, url: mockDataUrl },
    columns: mockCols,
};

@Injectable({ providedIn: 'root' })
class MockTableDatasourceHttpService {
    private http = inject(HttpClient);
    resolve(_injector: {}, datasource: Record<string, string>): Observable<TableData> {
        return this.http.get<TableData>(datasource.url);
    }
}

@Injectable()
class MockActionsService {
    trigger = jest.fn();
}

describe('TableComponent', () => {
    let fixture: any;
    let httpTestingController: HttpTestingController;

    const q = (css: string) => fixture.debugElement.query(By.css(css));
    const qAll = (css: string) => fixture.debugElement.queryAll(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PluckModule, I18nModule, InvokeModule],
            declarations: [
                CoreTableComponent,
                TableFeaturesRendererComponent,
                TableFeaturesRendererDirective,
                TableRenderFeatureDirective,
            ],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                MockActionsService,
                { provide: ActionsService, useExisting: MockActionsService },
                {
                    provide: DatasourceTypesToken,
                    useValue: { http: MockTableDatasourceHttpService },
                    multi: true,
                },
                {
                    provide: TableFeaturesRegistryToken,
                    useValue: {
                        mockFeature: () =>
                            import('../../../testing/src/mock-feature-component').then((m) => m.MockFeatureModule),
                    },
                    multi: true,
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(CoreTableComponent);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('Template structure', () => {
        it('must render <nz-table>', fakeAsync(() => {
            fixture.componentRef.setInput('config', mockConfig);
            fixture.detectChanges();

            tick();
            fixture.detectChanges();

            verifyDataRequest();
            fixture.detectChanges();

            verifyColumnsRequest();
            fixture.detectChanges();

            const tableDe = q('nz-table');
            expect(tableDe).toBeTruthy();
        }));

        it('must render <thead> with input `nzSortFn` must be `true`', fakeAsync(() => {
            fixture.componentRef.setInput('config', mockConfig);
            fixture.detectChanges();

            tick();
            fixture.detectChanges();

            verifyDataRequest();
            fixture.detectChanges();

            verifyColumnsRequest();
            fixture.detectChanges();

            const theadDe = q('thead');
            expect(theadDe).toBeTruthy();
            expect(theadDe.nativeNode.nzSortFn).toBe('true');
        }));
    });

    describe('Host', () => {
        it('should have class <spy-table>', fakeAsync(() => {
            fixture.componentRef.setInput('config', mockConfig);
            fixture.detectChanges();

            tick();
            fixture.detectChanges();

            flush();

            expect(fixture.nativeElement.classList.contains('spy-table')).toBeTruthy();
        }));
    });

    describe('spy-table-features-renderer', () => {
        it('must render features in the appropriate blocks', fakeAsync(() => {
            fixture.componentRef.setInput('config', mockConfig);
            fixture.componentInstance.tableData$ = (window as any).rxjs?.of?.([{}]); // не мешает, но и не обязателен
            fixture.detectChanges();

            tick();
            fixture.detectChanges();

            verifyDataRequest();
            fixture.detectChanges();

            verifyColumnsRequest();
            fixture.detectChanges();

            tick();
            fixture.detectChanges();

            expect(q('.ant-table-features--top .top-feature')).toBeTruthy();
            expect(q('.ant-table-features--before-table .before-table-feature')).toBeTruthy();
            expect(q('.ant-table-features--after-table .after-table-feature')).toBeTruthy();
            expect(q('.ant-table-features--bottom .bottom-feature')).toBeTruthy();
            expect(q('.ant-table-features--hidden .hidden-feature')).toBeTruthy();

            expect(q('thead th:last-child .header-ext-header-feature')).toBeTruthy();
            expect(q('thead th:first-child .before-cols-header-feature')).toBeTruthy();
            expect(qAll('thead th .header-feature').length).toBe(3);
            expect(q('thead th:nth-child(5) .after-cols-header-feature')).toBeTruthy();

            expect(q('tbody tr:nth-child(1).before-rows-feature')).toBeTruthy();
            expect(q('tbody tr:nth-child(2) td:first-child .before-cols-feature')).toBeTruthy();
            expect(qAll('tbody tr:nth-child(2) td .cell-feature').length).toBe(3);
            expect(q('tbody tr:nth-child(2) td:nth-child(5) .after-cols-feature')).toBeTruthy();
            expect(q('tbody tr:nth-child(3).after-rows-feature')).toBeTruthy();
        }));
    });

    describe('@Input(config)', () => {
        describe('columnsUrl dataSourceUrl columns', () => {
            it('returned columns$ Observable should match the right data with `columnsUrl` key', fakeAsync(() => {
                fixture.componentRef.setInput('config', mockConfig);
                fixture.detectChanges();

                tick();
                fixture.detectChanges();

                verifyDataRequest();
                fixture.detectChanges();

                verifyColumnsRequest();
                fixture.detectChanges();

                const callback = jest.fn();
                fixture.componentInstance.columns$.subscribe(callback);
                expect(callback).toHaveBeenCalledWith(mockCols);
            }));

            it('returned columns$ Observable should match the right data with `columns` key', fakeAsync(() => {
                fixture.componentRef.setInput('config', mockConfigCols);
                fixture.detectChanges();

                tick();
                fixture.detectChanges();

                verifyDataRequest();
                fixture.detectChanges();

                const callback = jest.fn();
                fixture.componentInstance.columns$.subscribe(callback);
                expect(callback).toHaveBeenCalledWith(mockCols);
            }));

            it('returned data$ Observable should match the right data', fakeAsync(() => {
                fixture.componentRef.setInput('config', mockConfig);
                fixture.detectChanges();

                tick();
                fixture.detectChanges();

                verifyDataRequest();
                fixture.detectChanges();

                verifyColumnsRequest();
                fixture.detectChanges();

                const callback = jest.fn();
                fixture.componentInstance.data$.subscribe(callback);
                expect(callback).toHaveBeenCalledWith(mockData);
            }));

            it('prop data$ must be mapped into <tbody> and render <spy-table-column-renderer> at each <td>', fakeAsync(() => {
                fixture.componentRef.setInput('config', mockConfig);
                fixture.detectChanges();

                tick();
                fixture.detectChanges();

                verifyDataRequest();
                fixture.detectChanges();

                verifyColumnsRequest();
                fixture.detectChanges();

                const colRendererDe = q('tr:first-child td:first-child spy-table-column-renderer');
                const rows = qAll('tr th'); // как в оригинале

                expect(rows.length).toBe(mockData.data.length);
                expect(colRendererDe).toBeTruthy();
                expect(colRendererDe.properties.config).toBe(mockCols[0]);
                expect(colRendererDe.properties.data).toBe(mockData.data[0]);
                expect(colRendererDe.properties.template).toBe(undefined);
            }));

            it('prop columns$ must be mapped into <thead> and create with <tr> and each <th> of the <table>', fakeAsync(() => {
                fixture.componentRef.setInput('config', mockConfig);
                fixture.detectChanges();

                tick();
                fixture.detectChanges();

                verifyDataRequest();
                fixture.detectChanges();

                verifyColumnsRequest();
                fixture.detectChanges();

                const ths = qAll('tr th');
                expect(ths.length).toBe(mockCols.length);
                expect(ths[0].nativeNode.nzShowSort).toBe(mockCols[0].sortable);
                expect(ths[0].nativeNode.nzWidth).toBe(mockCols[0].width);
                expect(ths[0].nativeNode.nzColumnKey).toBe(mockCols[0].id);
                expect(ths[0].nativeElement.textContent).toMatch(mockCols[0].title);
            }));
        });
    });

    function verifyColumnsRequest() {
        const req = httpTestingController.expectOne(mockColUrl);
        expect(req.request.method).toBe('GET');
        req.flush(mockCols);
        tick();
    }

    function verifyDataRequest() {
        const req = httpTestingController.expectOne((r) => r.url.includes(mockDataUrl));
        expect(req.request.method).toBe('GET');
        req.flush(mockData);
        tick();
    }
});
