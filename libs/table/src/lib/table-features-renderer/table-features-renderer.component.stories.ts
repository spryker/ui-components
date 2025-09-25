import {
    ChangeDetectorRef,
    Component,
    Injector,
    Input,
    QueryList,
    ContentChildren,
    inject,
    runInInjectionContext,
} from '@angular/core';
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

function createMockTableFeatureComponent(tplDirectives: QueryList<TableFeatureTplDirective>, injector: Injector): any {
    return runInInjectionContext(injector, () => {
        const mockComponent = new (class extends TableFeatureComponent {
            name = 'mock-feature';
            location = 'mocked-location';

            constructor() {
                super();
                this.tplDirectives = tplDirectives;
                this.ngAfterViewInit();
            }
        })();

        return mockComponent;
    });
}

@Component({
    standalone: false,
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
    private injector = inject(Injector);
    private cdr = inject(ChangeDetectorRef);

    @Input() limit?: number;

    @ContentChildren(TableFeatureTplDirective) set tplDirectives(directives: QueryList<TableFeatureTplDirective>) {
        this.features = [createMockTableFeatureComponent(directives, this.injector)];
        this.cdr.detectChanges();
    }

    features: any[] = [];
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
