import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestTableFeatureTplDirective, TestTableFeatureComponent, TestTableFeatureMocks } from '@spryker/table/testing';
import { TableSearchFeatureComponent } from './table-search-feature.component';
import {
    TableColumnsResolverService,
    TableData,
    TableDataConfig,
    TableDataConfiguratorService,
    TableDatasourceService,
} from '@spryker/table';
import { ReplaySubject } from 'rxjs';
import { InputModule } from '@spryker/input';

@Component({
    selector: 'spy-test-host',
    template: `
        <test-table-feature>
            <spy-table-search-feature></spy-table-search-feature>
        </test-table-feature>
    `,
})
class TestHostComponent {}

class MockTableDataConfiguratorService {
    readonly config$ = new ReplaySubject<TableDataConfig>(1);
}

describe('TableSearchFeatureComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let testTableFeature: TestTableFeatureComponent;
    let mockData: TableData;

    const inputSelector = 'spy-input';
    const iconSelector = 'spy-icon';

    function queryInput(): DebugElement {
        return fixture.debugElement.query(By.css(inputSelector));
    }

    function queryIcon(): DebugElement {
        return fixture.debugElement.query(By.css(iconSelector));
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [InputModule],
            declarations: [
                TestTableFeatureTplDirective,
                TableSearchFeatureComponent,
                TestTableFeatureComponent,
                TestHostComponent,
            ],
            providers: [
                {
                    provide: TableColumnsResolverService,
                    useValue: 'TableColumnsResolverService',
                },
                {
                    provide: TableDatasourceService,
                    useValue: 'TableDatasourceService',
                },
                {
                    provide: TableDataConfiguratorService,
                    useExisting: MockTableDataConfiguratorService,
                },
                MockTableDataConfiguratorService,
                {
                    provide: TestTableFeatureMocks,
                    useValue: {
                        config: {
                            enabled: true,
                            placeholder: '123',
                        },
                    },
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });
    });

    beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        testTableFeature = fixture.debugElement.query(By.directive(TestTableFeatureComponent)).componentInstance;

        mockData = {
            data: [{}],
            page: 0,
            pageSize: 0,
            total: 10,
        };

        fixture.detectChanges();
        tick();

        testTableFeature.featureMocks?.table.data$?.next(mockData);
        testTableFeature.featureMocks?.table.isLoading$?.next(true);
        TestBed.inject(MockTableDataConfiguratorService).config$.next({});
    }));

    it('should render `spy-input`', () => {
        fixture.detectChanges();

        expect(queryInput()).toBeTruthy();
    });

    it('should render `spy-icon`', () => {
        fixture.detectChanges();

        expect(queryIcon()).toBeTruthy();
    });

    it('should bind placeholder to input', () => {
        fixture.detectChanges();
        const expectedValue = '123';

        const inputPlaceholder = fixture.debugElement.query(By.css('input')).attributes.placeholder;
        expect(inputPlaceholder).toBe(expectedValue);
    });
});
