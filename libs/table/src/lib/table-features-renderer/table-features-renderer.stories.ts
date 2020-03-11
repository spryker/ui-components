import { Component, Input, TemplateRef } from '@angular/core';
import { number } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import {
  TableFeatureComponent,
  TableFeatureContext,
  TableComponent as ITableFeatureComponent,
} from '../table/table';
import { TableColumnsResolverService } from '../table/table.columns.resolver.service';
import { TableComponent } from '../table/table.component';
import { TableDataConfiguratorService } from '../table/table.data.configurator.service';
import { TableDataFetcherService } from '../table/table.data.fetcher.service';
import { TableFeaturesRendererComponent } from './table-features-renderer.component';

export default {
  title: 'TableFeaturesRendererComponent',
};

class MockTableFeatureComponent implements TableFeatureComponent {
  location = 'mocked-location';
  styles?: Record<string, string>;
  template?: TemplateRef<TableFeatureContext>;
  table?: ITableFeatureComponent;
  columnsResolverService?: TableColumnsResolverService;
  dataFetcherService?: TableDataFetcherService;
  dataConfiguratorService?: TableDataConfiguratorService;
  setTableComponent(table: any): void {}
  setColumnsResolverService(service: TableColumnsResolverService): void {}
  setDataFetcherService(service: TableDataFetcherService): void {}
  setDataConfiguratorService(service: TableDataConfiguratorService): void {}
  getTemplate(): TemplateRef<TableFeatureContext> {
    return this.templateRef;
  }
  constructor(private templateRef: TemplateRef<TableFeatureContext>) {}
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
  @Input() set templates(templates: TemplateRef<TableFeatureContext>[]) {
    this.features = templates.map(tpl => new MockTableFeatureComponent(tpl));
  }

  @Input() limit?: number;

  features: MockTableFeatureComponent[] = [];
}

export const withFeatures = (): IStory => ({
  moduleMetadata: {
    imports: [],
    declarations: [TableFeaturesRendererComponent, RenderFeaturesComponent],
    providers: [
      { provide: TableComponent, useValue: 'TableComponent' },
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
