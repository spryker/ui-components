import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, importProvidersFrom, Injectable, Input, OnInit } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DatasourceModule } from '@spryker/datasource';
import { MockHttpModule } from '@spryker/internal-utils';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { ContextModule, ContextService, DefaultContextSerializationModule, InvokeModule } from '@spryker/utils';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '../../../testing/src';
import { ColumnTypeOption, TableColumnTypeComponent } from '../column-type';
import { TableColumnListConfig } from '../table-column-list/table-column-list.component';
import { TableFeatureComponent } from '../table-feature';
import { TableModule } from '../table.module';
import { TableColumnComponent, TableColumnContext, TableConfig, TableFeatureLocation } from './table';
import { CoreTableComponent } from './table.component';

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1 #${i}`,
    col2: 'col2',
    col3: ['col3', 'col3', 'col3'],
    col4: ['col4', 'col3', 'col2', 'col1'],
});

const tableConfig: TableConfig = {
    dataSource: {
        type: 'mock-data',
        dataGenerator: tableDataGenerator,
    } as unknown as MockTableDatasourceConfig,
    columns: [
        { id: 'col1', sortable: true, title: 'Column #1', width: '20%' },
        { id: 'col2', sortable: true, title: 'Column #2', width: '20%' },
        {
            id: 'col3',
            title: 'Column #3',
            type: 'list',
            typeOptions: {
                limit: 0,
                type: 'test',
                typeOptions: {
                    text: '${value}',
                },
                typeOptionsMappings: {
                    text: { col3: 'Active', false: 'Inactive' },
                    color: { col3: 'green' },
                },
            },
        },
        {
            id: 'col4',
            title: 'Column #4',
            type: 'list',
            typeOptions: {
                limit: 1,
                type: 'test',
                typeOptions: {
                    text: '${value} in ${row.col1}',
                },
            },
        },
    ],
};

@Injectable({ providedIn: 'root' })
class TableColumnTestConfig {
    @ColumnTypeOption()
    text? = this.contextService.wrap('displayValue');

    constructor(private contextService: ContextService) {}
}

@Component({
    selector: 'spy-table-column-test',
    template: ` {{ config.text | context : context }} `,
})
@TableColumnTypeComponent(TableColumnTestConfig)
class TableColumnTestComponent implements TableColumnComponent<TableColumnTestConfig> {
    @Input() items?: any;
    @Input() config?: TableColumnTestConfig;
    @Input() context?: TableColumnContext;
}

declare module '../table' {
    interface TableColumnTypeRegistry {
        list: TableColumnListConfig;
    }
}

export default {
    title: 'TableComponent',
    component: CoreTableComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(HttpClientTestingModule),
                importProvidersFrom(TableModule.forRoot()),
                importProvidersFrom(
                    TableModule.withColumnComponents({
                        test: TableColumnTestComponent,
                    } as any),
                ),
                importProvidersFrom(
                    DatasourceModule.withDatasources({
                        'mock-data': MockTableDatasourceService,
                    } as any),
                ),
                importProvidersFrom(LocaleModule.forRoot({ defaultLocale: EN_LOCALE })),
                importProvidersFrom(EnLocaleModule),
            ],
        }),
        moduleMetadata({
            imports: [ContextModule, MockHttpModule, TableModule, DefaultContextSerializationModule],
            declarations: [TableColumnTestComponent],
        }),
    ],
    parameters: {
        controls: {
            include: ['config', 'tableId'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=319%3A445',
            allowFullscreen: true,
        },
    },
    argTypes: {
        //ToDo: change to readonly after release https://github.com/storybookjs/storybook/issues/14048
        config: {
            table: {
                disable: true,
            },
        },
    },
    args: {
        config: tableConfig,
        tableId: 'someId',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
        <spy-table [config]="config" [tableId]="tableId">
            <div *spyColTpl="'col1'; let col1">spyColTpl: {{ col1 }}</div>
            <ng-template spyColTpl="col2" let-col2>spyColTpl Template: {{ col2 }}</ng-template>
        </spy-table>
    `,
});

@Component({
    selector: 'spy-custom-feature',
    template: `
        <ng-container [ngSwitch]="location">
            <ng-container *ngSwitchCase="tableFeatureLocation.header">
                <div
                    *spyTableFeatureTpl="
                        location;
                        let cellTpl;
                        let cellContext = context;
                        let config = config;
                        let i = i
                    "
                >
                    Extended Custom Header!
                    <div style="outline: 1px solid gray">
                        <ng-container *ngTemplateOutlet="cellTpl; context: cellContext"></ng-container>
                    </div>
                    {{ log | spyInvoke : { config: config, i: i } }}
                </div>
            </ng-container>

            <ng-container *ngSwitchCase="tableFeatureLocation.cell">
                <div
                    *spyTableFeatureTpl="
                        location;
                        let cellTpl;
                        let cellContext = context;
                        let config = config;
                        let row = row;
                        let value = value;
                        let i = i
                    "
                >
                    <p>Extended Custom Cell!</p>
                    <div style="outline: 1px solid gray">
                        <ng-container *ngTemplateOutlet="cellTpl; context: cellContext"></ng-container>
                    </div>
                    {{
                        log
                            | spyInvoke
                                : {
                                      config: config,
                                      row: row,
                                      value: value,
                                      i: i
                                  }
                    }}
                </div>
            </ng-container>

            <ng-container *ngSwitchDefault>
                <div *spyTableFeatureTpl="location; let data = data; let i = i">
                    Custom Table Feature &#64; {{ location }}!
                    {{ log | spyInvoke : { data: data, i: i } }}
                </div>
            </ng-container>
        </ng-container>
    `,
    providers: [{ provide: TableFeatureComponent, useExisting: CustomFeatureComponent }],
})
class CustomFeatureComponent extends TableFeatureComponent implements OnInit {
    tableFeatureLocation = TableFeatureLocation;

    @Input() location?: TableFeatureLocation;

    ngOnInit(): void {
        console.log(`Custom Table Feature @ ${this.location}!`);
    }

    log(context: any) {
        console.log('Feature context', context);
    }
}

function getFeatureStory(location: TableFeatureLocation) {
    return (args) => ({
        props: {
            ...args,
            location,
        },
        moduleMetadata: {
            imports: [InvokeModule],
            declarations: [CustomFeatureComponent],
        },
        template: `
            <spy-table [config]="config" [tableId]="tableId">
              <spy-custom-feature spy-table-feature [location]="location"></spy-custom-feature>
            </spy-table>
        `,
    });
}

export const withFeatureInTop = getFeatureStory(TableFeatureLocation.top);

export const withFeatureInBeforeTable = getFeatureStory(TableFeatureLocation.beforeTable);

export const withFeatureInHeader = getFeatureStory(TableFeatureLocation.header);

export const withFeatureInHeaderExt = getFeatureStory(TableFeatureLocation.headerExt);

export const withFeatureInBeforeRows = getFeatureStory(TableFeatureLocation.beforeRows);

export const withFeatureInBeforeColsHeader = getFeatureStory(TableFeatureLocation.beforeColsHeader);

export const withFeatureInBeforeCols = getFeatureStory(TableFeatureLocation.beforeCols);

export const withFeatureInCell = getFeatureStory(TableFeatureLocation.cell);

export const withFeatureInAfterCols = getFeatureStory(TableFeatureLocation.afterCols);

export const withFeatureInAfterColsHeader = getFeatureStory(TableFeatureLocation.afterColsHeader);

export const withFeatureInAfterRows = getFeatureStory(TableFeatureLocation.afterRows);

export const withFeatureInAfterTable = getFeatureStory(TableFeatureLocation.afterTable);

export const withFeatureInBottom = getFeatureStory(TableFeatureLocation.bottom);

export const withFeatureInHidden = getFeatureStory(TableFeatureLocation.hidden);
