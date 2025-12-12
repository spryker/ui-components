import { Component, Input } from '@angular/core';

import { TableFeatureTplContext } from '../table-feature/table-feature-tpl.directive';
import { TableFeatureComponent } from '../table-feature/table-feature.component';

@Component({
    standalone: false,
    selector: 'spy-table-features-renderer',
    template: `
        <ng-template
            [spyTableFeaturesRenderer]="location"
            [spyTableFeaturesRendererFeatures]="features"
            [spyTableFeaturesRendererMaxFeatures]="maxFeatures"
            [spyTableFeaturesRendererContext]="context"
            let-feature
        >
            <div class="spy-table-features-renderer__content" [ngStyle]="feature.featureStyles$ | async">
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
