import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { combineLatest, of, ReplaySubject, Subject } from 'rxjs';
import {
  debounceTime,
  map,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { TableFeatureTplContext } from '../table/table-feature-tpl.directive';
import { FeatureRecord } from './types';

@Directive({
  selector: '[spyTableRenderFeature]',
})
export class TableRenderFeatureDirective implements OnInit, OnChanges {
  @Input() spyTableRenderFeature?: FeatureRecord;

  private destroyed$ = new Subject<void>();
  private feature$ = new ReplaySubject<FeatureRecord>(1);

  private template$ = this.feature$.pipe(
    map(feature => feature.featureTemplate),
  );
  private templateContext$ = this.feature$.pipe(
    switchMap(feature => feature.featureContext$ ?? of(undefined)),
    startWith(undefined),
  );

  constructor(private vcr: ViewContainerRef, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    combineLatest([this.template$, this.templateContext$])
      .pipe(debounceTime(0), takeUntil(this.destroyed$))
      .subscribe(([template, context]) =>
        this.renderFeature(template, context),
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.spyTableRenderFeature) {
      this.feature$.next(this.spyTableRenderFeature);
    }
  }

  private renderFeature(
    template: TemplateRef<TableFeatureTplContext>,
    context?: TableFeatureTplContext,
  ) {
    this.vcr.clear();
    this.vcr.createEmbeddedView(template, context);
    this.cdr.markForCheck();
  }
}
