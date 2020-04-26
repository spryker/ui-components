import { Component, Input } from '@angular/core';

import { TableFeatureTplContext } from '../table/table-feature-tpl.directive';
import { TableFeatureComponent } from '../table/table-feature.component';

@Component({
  selector: 'spy-table-features-renderer',
  template: `
    <ng-template
      [spyTableFeaturesRenderer]="location"
      [spyTableFeaturesRendererFeatures]="features"
      [spyTableFeaturesRendererMaxFeatures]="maxFeatures"
      [spyTableFeaturesRendererContext]="context"
      #featuresRenderer="spyTableFeaturesRenderer"
      let-feature
    >
      <div>
        <ng-template
          [spyTableRenderFeature]="feature"
          [spyTableRenderFeatureRenderer]="featuresRenderer"
        ></ng-template>
      </div>
    </ng-template>
  `,
})
export class TableFeaturesRendererComponent {
  @Input() location?: string;
  @Input() features?: TableFeatureComponent[];
  @Input() maxFeatures?: number;
  @Input() context?: TableFeatureTplContext;
}
