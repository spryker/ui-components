import { Component, NgModule } from '@angular/core';
import { ModuleWithFeature, TableFeatureComponent, TableFeatureLocation, TableFeatureModule } from '@spryker/table';

@Component({
  selector: 'spy-mock-feature',
  template: `
    <div *spyTableFeatureTpl="tableFeatureLocation.top" class="top-feature">Top Feature</div>
  `
})
class MockFeatureComponent extends TableFeatureComponent {
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
