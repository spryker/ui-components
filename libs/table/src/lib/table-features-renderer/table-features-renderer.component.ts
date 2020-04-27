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
      let-feature
    >
      <div [ngStyle]="feature.featureStyles$ | async">
        <ng-template [spyTableRenderFeature]="feature"></ng-template>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .spy-table-features-renderer {
        display: flex;
      }
    `,
  ],
})
export class TableFeaturesRendererComponent {
  @Input() location?: string;
  @Input() features?: TableFeatureComponent[];
  @Input() maxFeatures?: number;
  @Input() context?: TableFeatureTplContext;
}
