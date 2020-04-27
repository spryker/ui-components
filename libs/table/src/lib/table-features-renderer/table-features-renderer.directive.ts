import {
  ApplicationRef,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Injector,
  Input,
  IterableChanges,
  IterableDiffers,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { isNonNullable } from '@spryker/utils';
import { combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import {
  TableFeatureTplContext,
  TableFeatureTplDirective,
} from '../table/table-feature-tpl.directive';
import { TableFeatureComponent } from '../table/table-feature.component';
import { TableFeaturesRendererTplComponent } from './table-features-renderer-tpl.component';
import { FeatureRecord, TableFeaturesRendererContext } from './types';

@Directive({
  selector: '[spyTableFeaturesRenderer]',
  exportAs: 'spyTableFeaturesRenderer',
})
export class TableFeaturesRendererDirective implements OnInit, OnDestroy {
  @Input() set spyTableFeaturesRenderer(val: string) {
    this.location$.next(val);
  }

  @Input() set spyTableFeaturesRendererFeatures(val: TableFeatureComponent[]) {
    this.features$.next(val || []);
  }

  @Input() set spyTableFeaturesRendererMaxFeatures(val: number) {
    this.maxFeatures$.next(val);
  }

  @Input() set spyTableFeaturesRendererContext(val: TableFeatureTplContext) {
    this.context$.next(val);
  }

  private featuresRendererFactory = this.cfr.resolveComponentFactory(
    TableFeaturesRendererTplComponent,
  );

  private featuresDiffer = this.iterableDiffers
    .find([])
    .create<FeatureRecord>((idx, feature) => feature.component);

  private destroyed$ = new Subject<void>();
  private location$ = new ReplaySubject<string>(1);
  private features$ = new ReplaySubject<TableFeatureComponent[]>(1);
  private maxFeatures$ = new ReplaySubject<number>(1);
  private context$ = new ReplaySubject<TableFeatureTplContext>(1);

  private featureLocations$ = this.features$.pipe(
    switchMap(features =>
      combineLatest(
        features.map(feature =>
          feature.tplDirectives$.pipe(
            switchMap(tplDirectives =>
              combineLatest(
                tplDirectives.map(tplDirective => tplDirective.locations$),
              ),
            ),
            debounceTime(0),
          ),
        ),
      ),
    ),
    debounceTime(0),
  );

  private allFeatureRecords$: Observable<FeatureRecord[]> = combineLatest([
    this.features$,
    this.location$,
    this.featureLocations$,
  ]).pipe(
    debounceTime(0),
    switchMap(([features, location, featureLocations]) =>
      combineLatest(
        features.map((feature, i) =>
          feature.tplDirectives$.pipe(
            map(tplDirectives =>
              tplDirectives
                .filter((_, j) => featureLocations[i][j].includes(location))
                .map(tplDirective => this.mapFeature(feature, tplDirective)),
            ),
          ),
        ),
      ),
    ),
    debounceTime(0),
    map(featureRecords => featureRecords.flat()),
  );

  private featureRecords$: Observable<FeatureRecord[]> = combineLatest([
    this.allFeatureRecords$,
    this.maxFeatures$.pipe(startWith(undefined)),
  ]).pipe(
    debounceTime(0),
    map(([features, maxFeatures]) => features.slice(0, maxFeatures)),
  );

  private featureChanges$ = this.featureRecords$.pipe(
    map(features => this.featuresDiffer.diff(features)),
    filter(isNonNullable),
  );

  constructor(
    private templateRef: TemplateRef<TableFeaturesRendererContext>,
    private vcr: ViewContainerRef,
    private iterableDiffers: IterableDiffers,
    private injector: Injector,
    private cfr: ComponentFactoryResolver,
    private renderer: Renderer2,
    private appRef: ApplicationRef,
    private cdr: ChangeDetectorRef,
  ) {}

  renderFeatureTo(location: ElementRef, feature: FeatureRecord) {
    const componentRef = this.featuresRendererFactory.create(this.injector);

    const parent = this.renderer.parentNode(location.nativeElement);

    this.renderer.insertBefore(
      parent,
      componentRef.location.nativeElement,
      location.nativeElement,
    );

    this.appRef.attachView(componentRef.hostView);

    componentRef.instance.feature = feature;
    componentRef.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.featureChanges$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(features => this.updateFeatures(features));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.vcr.clear();
  }

  private mapFeature(
    feature: TableFeatureComponent,
    tplDirective: TableFeatureTplDirective,
  ): FeatureRecord {
    return {
      component: feature,
      template: this.templateRef,
      featureTemplate: tplDirective.template,
      featureContext$: this.context$,
      featureStyles$: tplDirective.styles$,
    };
  }

  private updateFeatures(changes: IterableChanges<FeatureRecord>) {
    changes.forEachAddedItem(record =>
      // Index always exists when adding feature
      // tslint:disable-next-line: no-non-null-assertion
      this.renderFeatureTpl(record.item, record.currentIndex!),
    );

    changes.forEachMovedItem(record =>
      // Index always exists when moving feature
      // tslint:disable-next-line: no-non-null-assertion
      this.moveFeature(record.previousIndex!, record.currentIndex!),
    );

    changes.forEachRemovedItem(record =>
      // Index always exists when removing feature
      // tslint:disable-next-line: no-non-null-assertion
      this.destroyFeature(record.currentIndex!),
    );
  }

  private renderFeatureTpl(feature: FeatureRecord, idx: number) {
    this.vcr.createEmbeddedView<TableFeaturesRendererContext>(
      this.templateRef,
      { $implicit: feature },
      idx,
    );

    this.cdr.markForCheck();
  }

  private moveFeature(prevIdx: number, idx: number) {
    const viewRef = this.vcr.get(prevIdx);

    if (viewRef) {
      this.vcr.move(viewRef, idx);
    }
  }

  private destroyFeature(idx: number) {
    this.vcr.remove(idx);
  }
}
