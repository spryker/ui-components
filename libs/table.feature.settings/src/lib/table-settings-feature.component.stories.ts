import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { IStory, Meta } from '@storybook/angular';
import { CheckboxModule } from '@spryker/checkbox';
import { DatasourceModule } from '@spryker/datasource';
import { IconModule } from '@spryker/icon';
import { IconDragModule } from '@spryker/icon/icons';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { TableModule } from '@spryker/table';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';

import { TableSettingsFeatureModule } from './table-settings-feature.module';

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1 #${i}`,
    col2: 'col2',
    col3: 'col3',
});

export default {
    title: 'TableSettingsFeatureComponent',
    parameters: {
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
        tableId: 'tableID',
        config: {
            dataSource: {
                type: 'mock-data',
                dataGenerator: tableDataGenerator,
            } as unknown as MockTableDatasourceConfig,
            columns: [
                { id: 'col1', title: 'Column #1', hideable: true },
                { id: 'col2', title: 'Column #2', hideable: true },
                { id: 'col3', title: 'Column #3', hideable: true },
            ],
            columnConfigurator: {
                enabled: true, // This will enable feature via config
            },
        },
    },
} as Meta;

export const viaHtml = getSettingsStory(
    `
    <spy-table [config]="config" [tableId]="tableId">
        <spy-table-settings-feature spy-table-feature>
        </spy-table-settings-feature>
    </spy-table>
  `,
    [TableSettingsFeatureModule],
);

export const viaConfig = getSettingsStory(
    `
    <spy-table [config]="config" [tableId]="tableId">
  `,
    [
        TableModule.withFeatures({
            columnConfigurator: () =>
                import('./table-settings-feature.module').then((m) => m.TableSettingsFeatureModule),
        }),
    ],
);

function getSettingsStory(template: string, extraNgModules: any[] = []): (args) => IStory {
    return (args) => ({
        props: args,
        moduleMetadata: {
            imports: [
                HttpClientTestingModule,
                BrowserAnimationsModule,
                TableModule.forRoot(),
                DatasourceModule.withDatasources({
                    'mock-data': MockTableDatasourceService,
                } as any),
                TableSettingsFeatureModule,
                LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
                EnLocaleModule,
                DefaultContextSerializationModule,
                CheckboxModule,
                IconModule,
                IconDragModule,
                ...extraNgModules,
            ],
            providers: [
                {
                    provide: ANALYZE_FOR_ENTRY_COMPONENTS,
                    useValue: [LayoutFlatHostComponent],
                    multi: true,
                },
            ],
        },
        template,
    });
}
