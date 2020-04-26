import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { FeatureRecord } from './types';

@Component({
  selector: 'spy-table-features-renderer-tpl',
  template: `
    <ng-container
      *ngTemplateOutlet="template; context: context$ | async"
    ></ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableFeaturesRendererTplComponent {
  @Input() set feature(val: FeatureRecord) {
    this.template = val.featureTemplate;
    this.context$ = val.featureContext$;
  }

  template?: FeatureRecord['featureTemplate'];
  context$?: FeatureRecord['featureContext$'];
}
