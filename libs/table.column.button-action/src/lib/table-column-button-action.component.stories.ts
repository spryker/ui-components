import { provideHttpClientTesting } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActionsModule } from '@spryker/actions';
import { NotificationActionHandlerService } from '@spryker/actions.notification';
import { RedirectActionHandlerService } from '@spryker/actions.redirect';
import { ButtonSize, ButtonVariant } from '@spryker/button';
import { DatasourceModule } from '@spryker/datasource';
import { IconPlusModule } from '@spryker/icon/icons';
import { NotificationModule, NotificationWrapperComponent } from '@spryker/notification';
import { TableActionTriggeredEvent, TableModule } from '@spryker/table';
import { TableRowActionsFeatureModule } from '@spryker/table.feature.row-actions';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { ContextModule, DefaultContextSerializationModule } from '@spryker/utils';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { TableColumnButtonActionComponent } from './table-column-button-action.component';
import { TableColumnButtonActionModule } from './table-column-button-action.module';
import { provideHttpClient } from '@angular/common/http';

export default {
    title: 'TableColumnButtonActionComponent',
    component: TableColumnButtonActionComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(
                    ActionsModule.withActions({
                        redirect: RedirectActionHandlerService,
                    }),
                ),
            ],
        }),
        moduleMetadata({
            imports: [TableColumnButtonActionModule, DefaultContextSerializationModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['config', 'context'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=1365%3A7734',
            allowFullscreen: true,
        },
    },
} as Meta;

const mockUsers = [
    {
        id: 1,
        name: 'Chandra Scrimshaw',
        email: 'cscrimshaw0@cisco.com',
    },
    {
        id: 2,
        name: 'Esta Ivie',
        email: 'eivie1@alexa.com',
    },
    {
        id: 3,
        name: 'Jeanne Du Plantier',
        email: 'jdu2@noaa.gov',
    },
    {
        id: 4,
        name: 'Rodrique Abramamovh',
        email: 'rabramamovh3@loc.gov',
    },
    {
        id: 5,
        name: 'Jany Dawnay',
        email: 'jdawnay4@imgur.com',
    },
    {
        id: 6,
        name: 'Carolina Rissom',
        email: 'crissom5@jugem.jp',
    },
    {
        id: 7,
        name: 'Helga Truelove',
        email: 'htruelove6@gizmodo.com',
    },
    {
        id: 8,
        name: 'Sidoney Bazely',
        email: 'sbazely7@reverbnation.com',
    },
    {
        id: 9,
        name: 'Emelita Clampett',
        email: 'eclampett8@youtube.com',
    },
    {
        id: 10,
        name: 'Ivette Yeld',
        email: 'iyeld9@army.mil',
    },
];

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: mockUsers[i].id,
    col2: mockUsers[i].name,
    col3: mockUsers[i].email,
    col4: mockUsers[i].id % 3 ? 'Assist' : 'Partially assist',
    availableActions: i % 2 === 0 ? ['add', 'edit', 'delete'] : undefined,
});

export const primary = (args) => ({
    props: args,
});
primary.args = {
    config: {
        text: '${value}',
        action: {
            type: 'redirect',
            url: '${url}',
        },
        variant: ButtonVariant.Critical,
    },
    context: {
        value: 'Button with redirect action',
        url: 'https://spryker.com',
    },
};

export const withTable = (args) => ({
    props: {
        ...args,
        events: {
            table: (event: TableActionTriggeredEvent) => console.info('actionTriggered', event),
        },
    },
    applicationConfig: {
        providers: [
            provideHttpClient(),
            provideHttpClientTesting(),
            importProvidersFrom(TableModule.forRoot()),
            importProvidersFrom(
                TableModule.withColumnComponents({
                    'button-action': TableColumnButtonActionComponent,
                } as any),
            ),
            importProvidersFrom(NotificationModule.forRoot()),
            importProvidersFrom(
                ActionsModule.withActions({
                    notification: NotificationActionHandlerService,
                }),
                TableModule.withFeatures({
                    rowActions: () =>
                        import('@spryker/table.feature.row-actions').then((m) => m.TableRowActionsFeatureModule),
                }),
            ),
            importProvidersFrom(
                DatasourceModule.withDatasources({
                    'mock-data': MockTableDatasourceService,
                } as any),
            ),
        ],
    },
    moduleMetadata: {
        imports: [ContextModule, TableModule, IconPlusModule, TableRowActionsFeatureModule],
        entryComponents: [NotificationWrapperComponent],
    },
    template: `
        <spy-table [events]='events' [config]="config"></spy-table>
    `,
});
withTable.args = {
    config: {
        dataSource: {
            type: 'mock-data',
            dataGenerator: tableDataGenerator,
        } as unknown as MockTableDatasourceConfig,
        rowActions: {
            enabled: true, // This will enable feature via config
            actions: [
                { id: '1234', title: '123' },
                { id: '2345', title: '234' },
                { id: 'add', title: 'Add' },
                { id: 'edit', title: 'Edit' },
                { id: 'delete', title: 'Delete' },
            ],
            click: '1234',
            availableActionsPath: 'availableActions',
        },
        columns: [
            { id: 'col1', title: 'ID', sortable: true, width: '10%' },
            { id: 'col2', title: 'Name', sortable: true },
            { id: 'col3', title: 'Email', sortable: true },
            {
                id: 'col4',
                title: 'Action',
                type: 'button-action',
                typeOptions: {
                    text: '${value}',
                    icon: 'plus',
                    action: {
                        type: 'notification',
                        notifications: [
                            {
                                title: 'Assistance to ${row.col2}',
                                description: 'Email ${row.col3} for assistance',
                                closeable: true,
                            },
                        ],
                    },
                },
                typeOptionsMappings: {
                    variant: { 'Partially assist': ButtonVariant.CriticalOutline },
                    size: { 'Partially assist': ButtonSize.Small },
                },
            },
        ],
    },
};
withTable.argTypes = {
    //ToDo: change to readonly after release https://github.com/storybookjs/storybook/issues/14048
    config: {
        table: {
            disable: true,
        },
    },
    context: {
        table: {
            disable: true,
        },
    },
};
