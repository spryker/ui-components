import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { TableFeatureComponent, TableFeatureTplContext } from '../table-feature';

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
