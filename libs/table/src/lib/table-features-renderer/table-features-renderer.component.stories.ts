import { ChangeDetectorRef, Component, Injector, Input, QueryList, ContentChildren } from '@angular/core';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {
    TableColumnsResolverService,
    TableDataConfiguratorService,
    TableDatasourceService,
    CoreTableComponent,
} from '../table';
import { TableFeatureTplDirective, TableFeatureComponent } from '../table-feature';
import { TableFeaturesRendererComponent } from './table-features-renderer.component';
import { TableFeaturesRendererDirective } from './table-features-renderer.directive';
import { TableRenderFeatureDirective } from './table-render-feature.directive';
import { TableFeaturesRendererService } from './table-features-renderer.service';

class MockTableFeatureComponent extends TableFeatureComponent {
    name = 'mock-feature';
    location = 'mocked-location';
    constructor(tplDirectives: QueryList<TableFeatureTplDirective>, injector: Injector) {
        super(injector);
        this.tplDirectives = tplDirectives;
        this.ngAfterViewInit();
    }
}

@Component({
    selector: 'spy-render-features',
    template: `
        <spy-table-features-renderer
            [features]="features"
            [maxFeatures]="limit < 0 ? null : limit"
            location="mocked-location"
        ></spy-table-features-renderer>
        <ng-content></ng-content>
    `,
})
class RenderFeaturesComponent {
    @Input() limit?: number;

    @ContentChildren(TableFeatureTplDirective) set tplDirectives(directives: QueryList<TableFeatureTplDirective>) {
        this.features = [new MockTableFeatureComponent(directives, this.injector)];
        this.cdr.detectChanges();
    }

    constructor(private injector: Injector, private cdr: ChangeDetectorRef) {}

    features: MockTableFeatureComponent[] = [];
}

export default {
    title: 'TableFeaturesRendererComponent',
    decorators: [
        applicationConfig({
            providers: [
                { provide: CoreTableComponent, useValue: 'CoreTableComponent' },
                {
                    provide: TableColumnsResolverService,
                    useValue: 'TableColumnsResolverService',
                },
                { provide: TableDatasourceService, useValue: 'TableDatasourceService' },
                {
                    provide: TableDataConfiguratorService,
                    useValue: 'TableDataConfiguratorService',
                },
                TableFeaturesRendererService,
            ],
        }),
        moduleMetadata({
            imports: [CommonModule],
            declarations: [
                RenderFeaturesComponent,
                TableFeatureTplDirective,
                TableFeaturesRendererComponent,
                TableFeaturesRendererDirective,
                TableRenderFeatureDirective,
            ],
        }),
    ],
    argTypes: {
        limit: {
            control: { type: 'range', min: 1, max: 4, step: 1 },
        },
    },
    args: {
        limit: 4,
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-render-features [limit]="limit">
      <div *spyTableFeatureTpl="'mocked-location'">feat</div>
      <div *spyTableFeatureTpl="'mocked-location'">feat2</div>
      <div *spyTableFeatureTpl="'mocked-location'">feat3</div>
      <div *spyTableFeatureTpl="'mocked-location'">feat4</div>
    </spy-render-features>
  `,
});
