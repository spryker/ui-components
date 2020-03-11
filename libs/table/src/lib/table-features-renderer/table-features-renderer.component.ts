import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import { TableFeatureComponent, TableFeatureContext } from '../table/table';
import { TableColumnsResolverService } from '../table/table.columns.resolver.service';
import { TableComponent } from '../table/table.component';
import { TableDataConfiguratorService } from '../table/table.data.configurator.service';
import { TableDataFetcherService } from '../table/table.data.fetcher.service';

interface FeatureRecord {
  component: TableFeatureComponent;
  template: TemplateRef<TableFeatureContext>;
  context: TableFeatureContext;
}

@Component({
  selector: 'spy-table-features-renderer',
  templateUrl: './table-features-renderer.component.html',
  styleUrls: ['./table-features-renderer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableFeaturesRendererComponent implements OnChanges {
  @Input() features?: TableFeatureComponent[];
  @Input() maxFeatures?: number;

  allFeatureRecords: FeatureRecord[] = [];
  featureRecords: FeatureRecord[] = [];

  constructor(
    private tableComponent: TableComponent,
    private columnsResolverService: TableColumnsResolverService,
    private dataFetcherService: TableDataFetcherService,
    private dataConfiguratorService: TableDataConfiguratorService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.features) {
      this.updateFeatures();
    }

    if (changes.maxFeatures) {
      this.limitFeatures();
    }
  }

  private updateFeatures() {
    this.features?.forEach(feature => this.initFeature(feature));

    this.allFeatureRecords =
      this.features?.map(feature => this.mapFeature(feature)) ?? [];

    this.limitFeatures();
  }

  private limitFeatures() {
    this.featureRecords =
      this.maxFeatures != null
        ? this.allFeatureRecords.slice(0, this.maxFeatures)
        : this.allFeatureRecords;
  }

  private initFeature(feature: TableFeatureComponent) {
    // FIXME(table): Remove `any` once TableComponent class is aligned with Spec interface
    feature.setTableComponent(this.tableComponent as any);
    feature.setColumnsResolverService(this.columnsResolverService);
    feature.setDataFetcherService(this.dataFetcherService);
    feature.setDataConfiguratorService(this.dataConfiguratorService);
  }

  private mapFeature(feature: TableFeatureComponent): FeatureRecord {
    return {
      component: feature,
      template: feature.getTemplate(),
      context: { location: feature.location },
    };
  }
}
