import { Component, DebugElement, Injector, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    TableActionsService,
    TableColumnsResolverService,
    TableData,
    TableDataConfig,
    TableDataConfiguratorService,
    TableDatasourceService,
    TableFeatureLocation,
} from '@spryker/table';
import {
    TestTableFeatureComponent,
    TestTableFeatureMocks,
    TestTableFeatureTplContext,
    TestTableFeatureTplDirective,
} from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { ReplaySubject } from 'rxjs';

import { TableRowActionsFeatureComponent } from './table-row-actions-feature.component';
import { FilterAvailableActionsPipe } from './table-row-actions.pipe';

@Component({
    standalone: false,
    selector: 'spy-test-host',
    template: `
        <test-table-feature>
            <spy-table-row-actions-feature></spy-table-row-actions-feature>
        </test-table-feature>
    `,
})
class TestHostComponent {}

class MockTableDataConfiguratorService {
    readonly config$ = new ReplaySubject<TableDataConfig>(1);
}

class TableMockActionsService {
    trigger = jest.fn();
}

const mockInjector = 'mockInjector';

describe('TableRowActionsFeatureComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let testTableFeature: TestTableFeatureComponent;
    let mockData: TableData;
    let tableActionsService: TableMockActionsService;
    const mockActions = [
        { id: '1234', title: '123', type: 'rowActions', typeOptions: {} },
        { id: 'add', title: 'Add', type: 'rowActions', typeOptions: {} },
    ];
    const mockClick = '1234';

    const dropdownSelector = 'spy-dropdown';

    function queryDropdown(): DebugElement {
        return fixture.debugElement.query(By.css(dropdownSelector));
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DefaultContextSerializationModule],
            declarations: [
                TestTableFeatureTplDirective,
                TableRowActionsFeatureComponent,
                TestTableFeatureComponent,
                TestHostComponent,
                FilterAvailableActionsPipe,
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
                    useClass: MockTableDataConfiguratorService,
                },
                TableMockActionsService,
                {
                    provide: TableActionsService,
                    useExisting: TableMockActionsService,
                },
                {
                    provide: TestTableFeatureMocks,
                    useValue: {
                        config: {
                            enabled: true,
                            actions: mockActions,
                            click: mockClick,
                        },
                    },
                },
                {
                    provide: TestTableFeatureTplContext,
                    useValue: {
                        [TableFeatureLocation.afterCols]: {
                            data: {},
                            i: 0,
                        },
                    },
                },
                {
                    provide: Injector,
                    useValue: mockInjector,
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });
    });

    beforeEach(fakeAsync(() => {
        tableActionsService = TestBed.inject(TableMockActionsService);
        fixture = TestBed.createComponent(TestHostComponent);
        testTableFeature = fixture.debugElement.query(By.directive(TestTableFeatureComponent)).componentInstance;

        mockData = {
            data: [{}],
            page: 3,
            pageSize: 30,
            total: 10,
        };

        fixture.detectChanges();
        tick();

        testTableFeature.featureMocks?.table.data$?.next(mockData);
        fixture.detectChanges();
    }));

    it('should render `spy-dropdown`', fakeAsync(() => {
        expect(queryDropdown()).toBeTruthy();
    }));

    it('should bind `actions` by default to `items` property of `spy-dropdown`', fakeAsync(() => {
        const transformedActions = mockActions.map(({ id: action, title }) => ({
            action,
            title,
        }));

        expect(queryDropdown().properties.items).toEqual(transformedActions);
    }));

    it('should trigger `handleAction` method of TableActionsService with data when dropdown changes', fakeAsync(() => {
        const actionTriggeredRes = {
            action: mockActions[0],
            items: [mockData.data[0]],
        };
        const mockContext = {
            row: {},
            rowId: '',
        };

        queryDropdown().triggerEventHandler('actionTriggered', mockActions[0].id);

        fixture.detectChanges();

        expect(tableActionsService.trigger).toHaveBeenCalledWith(actionTriggeredRes, mockContext);
    }));
});
