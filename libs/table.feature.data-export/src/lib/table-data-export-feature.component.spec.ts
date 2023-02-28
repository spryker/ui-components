import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestTableFeatureComponent, TestTableFeatureMocks, TestTableFeatureTplDirective } from '@spryker/table/testing';
import {
    TableColumnsResolverService,
    TableData,
    TableDataConfiguratorService,
    TableDatasourceService,
} from '@spryker/table';
import { ButtonSize, ButtonVariant } from '@spryker/button';
import { TableDataExportFeatureComponent } from './table-data-export-feature.component';

const mockConfig = {
    enabled: true,
    action: {
        type: 'table-data-export',
        url: '/html-request',
    },
    actionTitle: 'Table Data Export',
};

@Component({
    selector: 'spy-test-host',
    template: `
        <test-table-feature>
            <spy-table-data-export-feature></spy-table-data-export-feature>
        </test-table-feature>
    `,
})
class TestHostComponent {}

describe('TableDataExportFeatureComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let testTableFeature: TestTableFeatureComponent;
    let mockData: TableData;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestTableFeatureTplDirective,
                TableDataExportFeatureComponent,
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
                    useValue: 'TableDataConfiguratorService',
                },
                {
                    provide: TestTableFeatureMocks,
                    useValue: {
                        config: mockConfig,
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
        fixture.detectChanges();
    }));

    it('should render `.spy-table-data-export-feature` element', () => {
        const featureElem = fixture.debugElement.query(By.css('spy-table-data-export-feature'));

        expect(featureElem).toBeTruthy();
    });

    it('should render <spy-button-action> component', () => {
        const buttonComponent = fixture.debugElement.query(By.css('spy-button-action'));

        expect(buttonComponent).toBeTruthy();
    });

    it('should bound `mockConfig.action` to the `action` input of <spy-button-action> component', () => {
        const buttonComponent = fixture.debugElement.query(By.css('spy-button-action'));

        expect(buttonComponent.properties.action).toBe(mockConfig.action);
    });

    it('should bound `size` and `variant` to the <spy-button-action> component properties', () => {
        const buttonComponent = fixture.debugElement.query(By.css('spy-button-action'));

        expect(buttonComponent.properties.size).toBe(ButtonSize.Small);
        expect(buttonComponent.properties.variant).toBe(ButtonVariant.Outline);
    });

    it('should render `mockConfig.actionTitle` to the <spy-button-action> component', () => {
        const buttonComponent = fixture.debugElement.query(By.css('spy-button-action'));

        expect(buttonComponent.nativeElement.textContent.trim()).toBe(mockConfig.actionTitle);
    });
});
