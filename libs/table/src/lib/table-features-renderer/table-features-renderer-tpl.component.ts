import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Observable, ReplaySubject } from 'rxjs';
import { mapTo, switchAll, tap } from 'rxjs/operators';

import { FeatureRecord } from './types';

@Component({
  selector: 'spy-table-features-renderer-tpl',
  templateUrl: './table-features-renderer-tpl.component.html',
  styleUrls: ['./table-features-renderer-tpl.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableFeaturesRendererTplComponent {
  @Input() set feature(val: FeatureRecord) {
    this.template = val.featureTemplate;
    this.context$ = val.featureContext$;
    this.setStyles$.next(val.featureStyles$);
  }

  @HostBinding('style') styles?: SafeStyle;

  template?: FeatureRecord['featureTemplate'];
  context$?: FeatureRecord['featureContext$'];

  private setStyles$ = new ReplaySubject<Observable<string>>(1);

  syncStyles$ = this.setStyles$.pipe(
    switchAll(),
    tap(
      styles =>
        (this.styles = this.domSanitizer.bypassSecurityTrustStyle(styles)),
    ),
    mapTo(''),
  );

  constructor(private domSanitizer: DomSanitizer) {}
}
