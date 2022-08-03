import {
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  QueryList,
  ContentChildren,
} from '@angular/core';
import { Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {
  TableColumnsResolverService,
  TableDataConfiguratorService,
  TableDatasourceService,
  CoreTableComponent,
} from '../table';
import {
  TableFeatureTplDirective,
  TableFeatureComponent,
} from '../table-feature';
import { TableFeaturesRendererComponent } from './table-features-renderer.component';
import { TableFeaturesRendererDirective } from './table-features-renderer.directive';
import { TableRenderFeatureDirective } from './table-render-feature.directive';
import { TableFeaturesRendererService } from './table-features-renderer.service';

export default {
  title: 'TableFeaturesRendererComponent',
  argTypes: {
    limit: {
      control: { type: 'range', min: -1, max: 5, step: 1 },
    },
  },
  args: {
    limit: -1,
  },
} as Meta;

class MockTableFeatureComponent extends TableFeatureComponent {
  name = 'mock-feature';
  location = 'mocked-location';
  constructor(
    tplDirectives: QueryList<TableFeatureTplDirective>,
    injector: Injector,
  ) {
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

  @ContentChildren(TableFeatureTplDirective) set tplDirectives(
    directives: QueryList<TableFeatureTplDirective>,
  ) {
    this.features = [new MockTableFeatureComponent(directives, this.injector)];
    this.cdr.detectChanges();
  }

  constructor(private injector: Injector, private cdr: ChangeDetectorRef) {}

  features: MockTableFeatureComponent[] = [];
}

export const withFeatures = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [CommonModule],
    declarations: [
      RenderFeaturesComponent,
      TableFeatureTplDirective,
      TableFeaturesRendererComponent,
      TableFeaturesRendererDirective,
      TableRenderFeatureDirective,
    ],
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
  },
  template: `
    <spy-render-features [limit]="limit">
      <div *spyTableFeatureTpl="'mocked-location'">feat</div>
      <div *spyTableFeatureTpl="'mocked-location'">feat2</div>
      <div *spyTableFeatureTpl="'mocked-location'">feat3</div>
      <div *spyTableFeatureTpl="'mocked-location'">feat4</div>
    </spy-render-features>
  `,
});
