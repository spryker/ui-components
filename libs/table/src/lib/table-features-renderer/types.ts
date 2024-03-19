import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { TableFeatureTplContext } from '../table-feature/table-feature-tpl.directive';
import { TableFeatureComponent } from '../table-feature/table-feature.component';

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
