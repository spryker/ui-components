import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    TableColumnsResolverService,
    TableData,
    TableDataConfiguratorService,
    TableDatasourceService,
    TableFeatureLocation,
} from '@spryker/table';
import {
    TestTableFeatureComponent,
    TestTableFeatureMocks,
    TestTableFeatureTplDirective,
    TestTableFeatureTplContext,
} from '@spryker/table/testing';

import { TableSelectableFeatureComponent } from './table-selectable-feature.component';

@Component({
    standalone: false,
    selector: 'spy-test-host',
    template: `
        <test-table-feature>
            <spy-table-selectable-feature></spy-table-selectable-feature>
        </test-table-feature>
    `,
})
class TestHostComponent {}

describe('TableSelectableFeatureComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let testTableFeature: TestTableFeatureComponent;
    let mockData: TableData;
    const mockItemSelectionEventData = [{ data: {}, index: 0 }];

    const checkboxSelector = 'spy-checkbox';

    function queryHeaderCheckbox(): DebugElement {
        return fixture.debugElement.queryAll(By.css(checkboxSelector))[0];
    }

    function queryColumnCheckbox(): DebugElement {
        return fixture.debugElement.queryAll(By.css(checkboxSelector))[1];
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestTableFeatureTplDirective,
                TableSelectableFeatureComponent,
                TestHostComponent,
                TestTableFeatureComponent,
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
                    useValue: 'TableDataConfiguratorService',
                },
                {
                    provide: TestTableFeatureMocks,
                    useValue: {
                        config: {
                            enabled: true,
                        },
                    },
                },
                {
                    provide: TestTableFeatureTplContext,
                    useValue: {
                        [TableFeatureLocation.beforeCols]: {
                            i: 0,
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
            total: 0,
        };

        fixture.detectChanges();
        tick();

        testTableFeature.featureMocks?.table.data$?.next(mockData);
        fixture.detectChanges();
    }));

    describe('header template', () => {
        it('should render `spy-checkbox`', fakeAsync(() => {
            fixture.detectChanges();

            expect(queryHeaderCheckbox()).toBeTruthy();
        }));

        it('should bind `false` by default to `checked` property of `spy-checkbox`', fakeAsync(() => {
            expect(queryHeaderCheckbox().properties.checked).toBe(false);
        }));

        it('should bind `false` by default to `indeterminate` input of `spy-checkbox``', fakeAsync(() => {
            expect(queryHeaderCheckbox().properties.indeterminate).toBe(false);
        }));

        it('should toggle column checkbox when checked', fakeAsync(() => {
            queryHeaderCheckbox().triggerEventHandler('checkedChange', true);

            fixture.detectChanges();

            expect(queryColumnCheckbox().properties.checked).toBe(true);

            queryHeaderCheckbox().triggerEventHandler('checkedChange', false);

            fixture.detectChanges();

            expect(queryColumnCheckbox().properties.checked).toBe(false);
        }));

        it('should emit `itemSelection` with data when check changes', fakeAsync(() => {
            queryHeaderCheckbox().triggerEventHandler('checkedChange', true);

            fixture.detectChanges();

            expect(testTableFeature.featureMocks?.table.eventHandler).toHaveBeenCalledWith(
                'itemSelection',
                mockItemSelectionEventData,
            );

            queryHeaderCheckbox().triggerEventHandler('checkedChange', false);

            fixture.detectChanges();

            expect(testTableFeature.featureMocks?.table.eventHandler).toHaveBeenCalledWith('itemSelection', []);
        }));
    });

    describe('column template', () => {
        it('should render `spy-checkbox`', fakeAsync(() => {
            expect(queryColumnCheckbox()).toBeTruthy();
        }));

        it('should bind `false` by default to `checked` property of `spy-checkbox`', fakeAsync(() => {
            expect(queryColumnCheckbox().properties.checked).toBeFalsy();
        }));

        it('should set check checkbox when it is checked', fakeAsync(() => {
            expect(queryColumnCheckbox().properties.checked).toBeFalsy();

            queryColumnCheckbox().triggerEventHandler('checkedChange', true);

            fixture.detectChanges();

            expect(queryColumnCheckbox().properties.checked).toBe(true);
        }));

        it('should check header checkbox when all checked', fakeAsync(() => {
            queryColumnCheckbox().triggerEventHandler('checkedChange', true);

            fixture.detectChanges();

            expect(queryHeaderCheckbox().properties.checked).toBe(true);
        }));

        it('should set header checkbox indeterminate when some checked', fakeAsync(() => {
            mockData.data = [{}, {}];
            testTableFeature.featureMocks?.table.data$?.next(mockData);

            fixture.detectChanges();

            queryColumnCheckbox().triggerEventHandler('checkedChange', true);

            fixture.detectChanges();

            expect(queryHeaderCheckbox().properties.checked).toBe(false);
            expect(queryHeaderCheckbox().properties.indeterminate).toBe(true);
        }));

        it('should call `TableComponent.updateRowClasses` when checked changes', fakeAsync(() => {
            queryColumnCheckbox().triggerEventHandler('checkedChange', true);

            fixture.detectChanges();

            expect(testTableFeature.featureMocks?.table.updateRowClasses).toHaveBeenCalledWith('0', {
                'ant-table-row--selected': true,
            });

            queryColumnCheckbox().triggerEventHandler('checkedChange', false);

            fixture.detectChanges();

            expect(testTableFeature.featureMocks?.table.updateRowClasses).toHaveBeenCalledWith('0', {
                'ant-table-row--selected': false,
            });
        }));

        it('should emit `itemSelection` with data when check changes', fakeAsync(() => {
            queryColumnCheckbox().triggerEventHandler('checkedChange', true);

            fixture.detectChanges();

            expect(testTableFeature.featureMocks?.table.eventHandler).toHaveBeenCalledWith(
                'itemSelection',
                mockItemSelectionEventData,
            );

            queryColumnCheckbox().triggerEventHandler('checkedChange', false);

            fixture.detectChanges();

            expect(testTableFeature.featureMocks?.table.eventHandler).toHaveBeenCalledWith('itemSelection', []);
        }));
    });
});
