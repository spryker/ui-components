import { TemplateRef } from '@angular/core';
import { TableFeatureTplContext } from '../table/table-feature-tpl.directive';
import { TableFeatureComponent } from '../table/table-feature.component';
import { Observable } from 'rxjs';

// tslint:disable-next-line: no-empty-interface
export interface TableFeaturesRendererContext {
  $implicit: FeatureRecord;
}

export interface FeatureRecord {
  component: TableFeatureComponent;
  template: TemplateRef<TableFeaturesRendererContext>;
  featureTemplate: TemplateRef<TableFeatureTplContext>;
  featureContext$?: Observable<TableFeatureTplContext>;
  featureStyles$?: Observable<Record<string, any>>;
}
