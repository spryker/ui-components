import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { CheckboxModule } from '@spryker/checkbox';
import { DatasourceModule } from '@spryker/datasource';
import { TableModule } from '@spryker/table';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';

import { TableSelectableFeatureModule } from './table-selectable-feature.module';
import { TableSelectionChangeEvent } from './types';

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1 #${i}`,
    col2: 'col2',
    col3: 'col3',
});

export default {
    title: 'TableSelectableFeatureComponent',
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
                {
                    provide: ANALYZE_FOR_ENTRY_COMPONENTS,
                    useValue: [LayoutFlatHostComponent],
                    multi: true,
                },
            ],
        }),
        moduleMetadata({
            imports: [CheckboxModule, TableModule, DefaultContextSerializationModule],
        }),
    ],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=1365%3A7734',
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
                { id: 'col1', title: 'Column #1' },
                { id: 'col2', title: 'Column #2' },
                { id: 'col3', title: 'Column #3' },
            ],
            itemSelection: {
                enabled: true, // This will enable feature via config
            },
        },
    },
} as Meta;

export const viaHtml = (args) => ({
    props: {
        ...args,
        events: {
            itemSelection: (event: TableSelectionChangeEvent) => console.log('SelectionChange', event),
        },
    },
    moduleMetadata: { imports: [TableSelectableFeatureModule] },
    template: `
    <spy-table [config]='config' [events]='events'>
      <spy-table-selectable-feature spy-table-feature></spy-table-selectable-feature>
    </spy-table>
  `,
});

export const viaConfig = (args) => ({
    props: {
        ...args,
        events: {
            itemSelection: (event: TableSelectionChangeEvent) => console.log('SelectionChange', event),
        },
    },
    applicationConfig: {
        providers: [
            importProvidersFrom(
                TableModule.withFeatures({
                    itemSelection: () =>
                        import('./table-selectable-feature.module').then((m) => m.TableSelectableFeatureModule),
                }),
            ),
        ],
    },
    template: `
    <spy-table [config]='config' [events]='events'>
  `,
});
