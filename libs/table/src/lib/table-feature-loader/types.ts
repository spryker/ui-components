import { Type } from '@angular/core';

import { TableFeatureComponent } from '../table-feature/table-feature.component';

export interface ModuleWithFeature {
  featureComponent: Type<TableFeatureComponent>;
}

export type TableFeatureLoader = () => Promise<Type<ModuleWithFeature>>;

export interface TableFeaturesRegistry {
  [featureName: string]: TableFeatureLoader;
}

export interface TableFeaturesLoaded {
  [featureName: string]: Type<ModuleWithFeature>;
}
