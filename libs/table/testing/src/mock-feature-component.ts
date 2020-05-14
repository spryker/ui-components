import { Component, NgModule } from '@angular/core';
import {
  ModuleWithFeature,
  TableFeatureComponent,
  TableFeatureLocation,
  TableFeatureModule,
} from '@spryker/table';

@Component({
  selector: 'spy-mock-feature',
  template: `
    <div *spyTableFeatureTpl="tableFeatureLocation.top" class="top-feature">
      Top Feature
    </div>
    <div
      *spyTableFeatureTpl="tableFeatureLocation.beforeTable"
      class="before-table-feature"
    >
      Before Table Feature
    </div>
    <div
      *spyTableFeatureTpl="tableFeatureLocation.afterTable"
      class="after-table-feature"
    >
      After Table Feature
    </div>
    <div
      *spyTableFeatureTpl="tableFeatureLocation.bottom"
      class="bottom-feature"
    >
      Bottom Feature
    </div>
    <div
      *spyTableFeatureTpl="tableFeatureLocation.hidden"
      class="hidden-feature"
    >
      Hidden Feature
    </div>
    <div
      *spyTableFeatureTpl="tableFeatureLocation.beforeColsHeader"
      class="before-cols-header-feature"
    >
      Before Cols Header Feature
    </div>
    <div
      *spyTableFeatureTpl="tableFeatureLocation.afterColsHeader"
      class="after-cols-header-feature"
    >
      After Cols Header Feature
    </div>
    <div
      *spyTableFeatureTpl="tableFeatureLocation.headerExt"
      class="header-ext-header-feature"
    >
      Header Ext Feature
    </div>
    <div
      *spyTableFeatureTpl="tableFeatureLocation.beforeCols"
      class="before-cols-feature"
    >
      Before Cols Feature
    </div>
    <div
      *spyTableFeatureTpl="tableFeatureLocation.afterCols"
      class="after-cols-feature"
    >
      After Cols Feature
    </div>
  `,
})
export class MockFeatureComponent extends TableFeatureComponent {
  name = 'mockFeature';
  tableFeatureLocation = TableFeatureLocation;
}

@NgModule({
  imports: [TableFeatureModule],
  exports: [MockFeatureComponent],
  declarations: [MockFeatureComponent],
  entryComponents: [MockFeatureComponent],
})
export class MockFeatureModule implements ModuleWithFeature {
  featureComponent = MockFeatureComponent;
}
