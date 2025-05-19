import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, importProvidersFrom, Input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { DatasourceModule } from '@spryker/datasource';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { NotificationModule } from '@spryker/notification';
import { TableModule } from '@spryker/table';
import { TableSelectableFeatureModule } from '@spryker/table.feature.selectable';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { DrawerModule } from '@spryker/drawer';
import { ActionsModule } from '@spryker/actions';
import { DrawerActionHandlerService, DrawerActionModule } from '@spryker/actions.drawer';
import { TableBatchActionsFeatureModule } from './table-batch-actions-feature.module';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'spy-simple-component',
    template: `
        <div>
            Simple Component #{{ randomValue }} <br />
            Projected input value - {{ test }}
        </div>
    `,
})
class SimpleComponent {
    @Input() test?: string;
    @Input() method?: string;
    @Input() action?: any;

    randomValue = Math.floor(Math.random() * 100);
}

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    sku: `sku#${i}`,
    col2: availableActionsTitle(i),
    _actionIds: availableActions(i),
});

const availableActions = (index: number): string[] | undefined => {
    switch (index) {
        case 1:
            return ['update-offer'];
        case 2:
            return ['ship'];
        case 3:
            return [];
        case 4:
            return undefined;
        default:
            return ['update-offer', 'ship'];
    }
};

const availableActionsTitle = (index: number): string => {
    switch (index) {
        case 1:
            return 'update-offer';
        case 2:
            return 'ship';
        case 3:
            return 'none';
        case 4:
            return 'undefined = both';
        default:
            return 'both';
    }
};

export default {
    title: 'TableBatchActionsFeatureComponent',
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                provideHttpClient(),
                provideHttpClientTesting(),
                importProvidersFrom(TableModule.forRoot()),
                importProvidersFrom(NotificationModule.forRoot()),
                importProvidersFrom(
                    ActionsModule.withActions({
                        drawer: DrawerActionHandlerService,
                    }),
                ),
                importProvidersFrom(
                    DatasourceModule.withDatasources({
                        'mock-data': MockTableDatasourceService,
                    } as any),
                ),
                importProvidersFrom(
                    DrawerActionModule.withComponents({
                        simple_component: SimpleComponent,
                    }),
                ),
                importProvidersFrom(LocaleModule.forRoot({ defaultLocale: EN_LOCALE })),
                importProvidersFrom(EnLocaleModule),
            ],
        }),
        moduleMetadata({
            imports: [TableModule, DrawerModule, DefaultContextSerializationModule],
            declarations: [SimpleComponent],
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
                { id: 'sku', title: 'SKU' },
                { id: 'col2', title: 'Available Actions' },
            ],
            itemSelection: {
                enabled: true, // This will enable feature via config
            },
            batchActions: {
                enabled: true, // This will enable feature via config
                noActionsMessage: 'No available actions for selected rows',
                availableActionsPath: '_actionIds',
                rowIdPath: 'sku',
                actions: [
                    {
                        id: 'update-offer',
                        title: 'Update Offer(s)',
                        type: 'drawer',
                        component: 'simple_component',
                        options: {
                            inputs: {
                                action: 'https://.../?ids=${rowIds}',
                                method: 'POST',
                            },
                        },
                    },
                    {
                        id: 'ship',
                        title: 'Ship',
                        type: 'drawer',
                        component: 'simple_component',
                        options: {
                            inputs: {
                                action: 'https://.../?ids=${rowIds}',
                                method: 'POST',
                            },
                        },
                    },
                ],
            },
        },
    },
} as Meta;

export const viaHtml = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [TableBatchActionsFeatureModule, TableSelectableFeatureModule],
    },
    template: `
    <spy-table [config]="config">
      <spy-table-batch-actions-feature spy-table-feature></spy-table-batch-actions-feature>
      <spy-table-selectable-feature spy-table-feature></spy-table-selectable-feature>
    </spy-table>
  `,
});

export const viaConfig = (args) => ({
    props: args,
    applicationConfig: {
        providers: [
            importProvidersFrom(
                TableModule.withFeatures({
                    batchActions: () =>
                        import('./table-batch-actions-feature.module').then((m) => m.TableBatchActionsFeatureModule),
                    itemSelection: () =>
                        import('@spryker/table.feature.selectable').then((m) => m.TableSelectableFeatureModule),
                }),
            ),
        ],
    },
    template: `
    <spy-table [config]='config'></spy-table>
  `,
});
