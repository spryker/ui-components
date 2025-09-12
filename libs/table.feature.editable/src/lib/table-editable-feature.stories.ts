import { CommonModule } from '@angular/common';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, importProvidersFrom, Injectable, Input, OnInit, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DatasourceModule } from '@spryker/datasource';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { NotificationModule } from '@spryker/notification';
import {
    TableColumnComponent,
    TableColumnContext,
    TableColumns,
    TableColumnTypeComponent,
    TableModule,
} from '@spryker/table';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';

import { TableEditableFeatureModule } from './table-editable-feature.module';
import { TableEditableService } from './table-editable-feature.service';
import { TableEditableEditRequestToken } from './tokens';
import { provideHttpClient } from '@angular/common/http';

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col2: `${i} col2`,
    col3: `${i} col3`,
    col4: `${i} col4`,
    isRowEditable: i % 2 === 0,
});

class TableEditableDataSerializer {
    serialize(data: any): unknown {
        return JSON.stringify(data);
    }
}

@Injectable({ providedIn: 'root' })
class EditColumnConfig {
    type = 'text';
    value?: string;
    editableError?: string;
}

@Component({
    standalone: false,
    selector: 'spy-edit-column',
    template: `
        Edit Column {{ context.config.id }}
        <div>
            <input
                [type]="config?.type"
                [value]="context?.value"
                (input)="updateValue(input.value)"
                [style.border]="'1px solid black'"
                #input
            />
            <div>
                {{ config?.editableError }}
            </div>
        </div>
    `,
    providers: [TableEditableService],
})
@TableColumnTypeComponent(EditColumnConfig)
class EditColumnComponent implements TableColumnComponent<EditColumnConfig>, OnInit {
    private tableEditableService = inject(TableEditableService);

    @Input() config?: EditColumnConfig;
    @Input() context?: TableColumnContext;
    @Input() items?: unknown;

    ngOnInit(): void {
        if (!this.context?.value && this.config?.value) {
            this.updateValue(this.config?.value);
        }
    }

    updateValue(value: string): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.context!.value = value;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.tableEditableService.updateValue(value, this.context!.config);
    }
}

export default {
    title: 'TableEditableFeatureComponent',
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                provideHttpClient(),
                provideHttpClientTesting(),
                importProvidersFrom(TableModule.forRoot()),
                importProvidersFrom(
                    TableModule.withColumnComponents({
                        edit: EditColumnComponent,
                    } as any),
                ),
                importProvidersFrom(
                    DatasourceModule.withDatasources({
                        'mock-data': MockTableDatasourceService,
                    } as any),
                ),
                importProvidersFrom(NotificationModule.forRoot()),
                importProvidersFrom(LocaleModule.forRoot({ defaultLocale: EN_LOCALE })),
                importProvidersFrom(EnLocaleModule),
                {
                    provide: TableEditableEditRequestToken,
                    useClass: TableEditableDataSerializer,
                },
            ],
        }),
        moduleMetadata({
            imports: [CommonModule, MockHttpModule, TableModule, DefaultContextSerializationModule],
            declarations: [EditColumnComponent],
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
        mockHttp: {
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
                { id: 'col4', title: 'Column #4' },
            ] as TableColumns,
            editable: {
                columns: [
                    { id: 'col1', type: 'edit' as any },
                    { id: 'col2', type: 'edit' as any },
                    { id: 'col3', type: 'edit' as any },
                    {
                        id: 'col4',
                        type: 'edit' as any,
                        typeOptions: { value: 'default' },
                    },
                ] as unknown as TableColumns,
                create: {
                    addButton: {
                        type: 'button',
                        shape: 'default',
                        variant: 'secondary',
                        size: 'lg',
                        icon: 'warning',
                    },
                    cancelButton: {},
                    disableForCols: ['col2'],
                    formInputName: 'form-input-name',
                    initialData: {
                        data: [
                            { col3: 'Option 1', hideCancel: true },
                            { col1: 'value' },
                            { col1: 'value', col3: 'Option 1', col4: 'value' },
                            { col2: 'value' },
                            { col2: 'value', col3: 'value' },
                            { col1: 'value', col3: 'Option 1', col4: 'value' },
                        ],
                        errors: {
                            2: {
                                rowError: 'message',
                                columnErrors: {
                                    col1: 'errorMessage errorMessage errorMessage',
                                },
                            },
                            0: {
                                rowError: 'message',
                                columnErrors: {
                                    col3: 'errorMessage errorMessage errorMessage',
                                },
                            },
                        },
                    },
                },
                update: {
                    url: '/table-update-cell',
                    saveButton: {},
                    cancelButton: {},
                    disableForCols: ['col2'],
                },
                disableRowKey: 'isRowEditable',
            },
        },
        mockHttp: setMockHttp([
            {
                url: '/table-update-cell',
                data: {},
            },
        ]),
    },
} as Meta;

export const viaHtml = (args) => ({
    props: args,
    moduleMetadata: { imports: [TableEditableFeatureModule] },
    template: `
      <spy-table [config]="config" [mockHttp]="mockHttp">
        <spy-table-editable-feature spy-table-feature></spy-table-editable-feature>
      </spy-table>
    `,
});

export const viaConfig = (args) => ({
    props: args,
    applicationConfig: {
        providers: [
            importProvidersFrom(
                TableModule.withFeatures({
                    editable: () => import('./table-editable-feature.module').then((m) => m.TableEditableFeatureModule),
                }),
            ),
        ],
    },
    template: `
    <spy-table [config]="config" [mockHttp]="mockHttp"></spy-table>
  `,
});
