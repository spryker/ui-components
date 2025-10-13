import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { IconModule } from '@spryker/icon';
import { I18nModule } from '@spryker/locale';
import { PopoverModule } from '@spryker/popover';
import { ContextModule, InvokeModule, PluckModule } from '@spryker/utils';
import { SelectComponentsModule } from '@spryker/web-components';
import { ActionsModule } from '@spryker/actions';
import { SpinnerModule } from '@spryker/spinner';
import { NzTableModule } from 'ng-zorro-antd/table';
import { provideTableColumnComponents } from './column-type';
import { IconNoDataModule, IconNoFilteredDataModule } from './icons';
import { TableColumnListComponent } from './table-column-list/table-column-list.component';
import { TableColumnRendererComponent } from './table-column-renderer/table-column-renderer.component';
import { provideTableFeatures, TableFeaturesRegistry } from './table-feature-loader';
import { TableFeatureModule } from './table-feature';
import {
    TableRenderFeatureDirective,
    TableFeaturesRendererComponent,
    TableFeaturesRendererDirective,
} from './table-features-renderer';
import { TableColumnComponentDeclaration } from './table';
import { ColTplDirective } from './table/col-tpl.directive';
import { CoreTableComponent } from './table/table.component';

@NgModule({
    imports: [
        CommonModule,
        NzTableModule,
        ContextModule,
        TableFeatureModule,
        SelectComponentsModule,
        PluckModule,
        IconModule,
        IconNoDataModule,
        IconNoFilteredDataModule,
        I18nModule,
        PopoverModule,
        InvokeModule,
        ActionsModule,
        SpinnerModule,
    ],
    declarations: [
        CoreTableComponent,
        TableColumnRendererComponent,
        ColTplDirective,
        TableFeaturesRendererComponent,
        TableFeaturesRendererDirective,
        TableRenderFeatureDirective,
        TableColumnListComponent,
    ],
    exports: [CoreTableComponent, ColTplDirective, TableFeatureModule, TableColumnRendererComponent],
})
export class TableModule {
    static forRoot(): ModuleWithProviders<TableModule> {
        return {
            ngModule: TableModule,
            providers: [
                provideTableColumnComponents({
                    list: TableColumnListComponent,
                }),
            ],
        };
    }

    static withColumnComponents(components: TableColumnComponentDeclaration): ModuleWithProviders<TableModule> {
        return {
            ngModule: TableModule,
            providers: [provideTableColumnComponents(components)],
        };
    }

    static withFeatures(features: TableFeaturesRegistry): ModuleWithProviders<TableModule> {
        return {
            ngModule: TableModule,
            providers: [provideTableFeatures(features)],
        };
    }
}
