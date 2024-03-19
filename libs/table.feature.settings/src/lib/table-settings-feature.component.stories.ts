import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
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
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(HttpClientTestingModule),
                importProvidersFrom(TableModule.forRoot()),
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
            imports: [
                TableModule,
                TableSettingsFeatureModule,
                DefaultContextSerializationModule,
                CheckboxModule,
                IconModule,
                IconDragModule,
            ],
        }),
    ],
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

export const viaHtml = (args) => ({
    props: args,
    moduleMetadata: { imports: [TableSettingsFeatureModule] },
    template: `
    <spy-table [config]='config'>
        <spy-table-settings-feature spy-table-feature>
        </spy-table-settings-feature>
    </spy-table>
  `,
});

export const viaConfig = (args) => ({
    props: args,
    applicationConfig: {
        providers: [
            importProvidersFrom(
                TableModule.withFeatures({
                    columnConfigurator: () =>
                        import('./table-settings-feature.module').then((m) => m.TableSettingsFeatureModule),
                }),
            ),
        ],
    },
    template: `
    <spy-table [config]='config'>
  `,
});
