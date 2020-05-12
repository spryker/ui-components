import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TypedSimpleChanges } from '@spryker/utils';
import { combineLatest, of, ReplaySubject, Subject } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { TableFeatureTplContext } from '../table-feature/table-feature-tpl.directive';
import { FeatureRecord } from './types';

export class TableRenderFeatureDirectiveInputs {
  @Input() spyTableRenderFeature?: FeatureRecord;
}

@Directive({
  selector: '[spyTableRenderFeature]',
})
export class TableRenderFeatureDirective
  extends TableRenderFeatureDirectiveInputs
  implements OnInit, OnChanges {
  private destroyed$ = new Subject<void>();
  private feature$ = new ReplaySubject<FeatureRecord>(1);

  private template$ = this.feature$.pipe(
    map(feature => feature.featureTemplate),
  );
  private templateContext$ = this.feature$.pipe(
    switchMap(feature => feature.featureContext$ ?? of(undefined)),
    startWith(undefined),
  );

  constructor(private vcr: ViewContainerRef, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    combineLatest([this.template$, this.templateContext$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([template, context]) =>
        this.renderFeature(template, context),
      );
  }

  ngOnChanges(
    changes: TypedSimpleChanges<TableRenderFeatureDirectiveInputs>,
  ): void {
    if (changes.spyTableRenderFeature) {
      this.feature$.next(this.spyTableRenderFeature);
    }
  }

  private renderFeature(
    template: TemplateRef<TableFeatureTplContext>,
    context?: TableFeatureTplContext,
  ): void {
    this.vcr.clear();
    this.vcr.createEmbeddedView(template, context);
    this.cdr.markForCheck();
  }
}
