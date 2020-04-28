import { Component, Input, QueryList, TemplateRef } from '@angular/core';
import { number } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { TableColumnsResolverService } from '../table/columns-resolver.service';
import { TableDataConfiguratorService } from '../table/data-configurator.service';
import { TableDataFetcherService } from '../table/data-fetcher.service';
import {
  TableFeatureTplContext,
  TableFeatureTplDirective,
} from '../table-feature/table-feature-tpl.directive';
import { TableFeatureComponent } from '../table-feature/table-feature.component';
import { CoreTableComponent } from '../table/table.component';
// import { TableFeaturesRendererTplComponent } from './table-features-renderer.component';

export default {
  title: 'TableFeaturesRendererComponent',
};

class MockTableFeatureComponent extends TableFeatureComponent {
  name = 'mock-feature';
  location = 'mocked-location';
  constructor(tplDirectives: QueryList<TableFeatureTplDirective>) {
    super(null as any);
    this.tplDirectives = tplDirectives;
  }
}

@Component({
  selector: 'render-features',
  template: `
    <spy-table-features-renderer
      [features]="features"
      [maxFeatures]="limit < 0 ? null : limit"
    ></spy-table-features-renderer>
  `,
})
class RenderFeaturesComponent {
  @Input() set templates(templates: TemplateRef<TableFeatureTplContext>[]) {
    // this.features = templates.map(tpl => new MockTableFeatureComponent(tpl));
  }

  @Input() limit?: number;

  features: MockTableFeatureComponent[] = [];
}

export const withFeatures = (): IStory => ({
  moduleMetadata: {
    imports: [],
    // declarations: [TableFeaturesRendererTplComponent, RenderFeaturesComponent],
    providers: [
      { provide: CoreTableComponent, useValue: 'CoreTableComponent' },
      {
        provide: TableColumnsResolverService,
        useValue: 'TableColumnsResolverService',
      },
      { provide: TableDataFetcherService, useValue: 'TableDataFetcherService' },
      {
        provide: TableDataConfiguratorService,
        useValue: 'TableDataConfiguratorService',
      },
    ],
  },
  template: `
    <render-features [templates]="[feat1, feat2, feat3]" [limit]="limit"></render-features>
    <ng-template #feat1>Feature #1</ng-template>
    <ng-template #feat2 let-loc="location">Feature #2 at {{ loc }}</ng-template>
    <ng-template #feat3>Feature #3</ng-template>
  `,
  props: {
    limit: number('Max features (-1 is unlimited)', -1, {
      min: -1,
      max: 5,
      range: true,
    }),
  },
});
