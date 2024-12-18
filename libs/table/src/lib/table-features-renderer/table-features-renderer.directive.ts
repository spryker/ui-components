import {
    ChangeDetectorRef,
    Directive,
    Input,
    IterableChanges,
    IterableDiffers,
    OnChanges,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewContainerRef,
    SimpleChanges,
} from '@angular/core';
import { isNonNullable } from '@spryker/utils';
import { combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, filter, map, startWith, switchAll, takeUntil } from 'rxjs/operators';

import { TableFeatureTplContext } from '../table-feature/table-feature-tpl.directive';
import { TableFeatureComponent } from '../table-feature/table-feature.component';
import { TableFeaturesRendererService } from './table-features-renderer.service';
import { FeatureRecord, TableFeaturesRendererContext } from './types';
import { TableFeatureLocation } from '../table/table';

@Directive({
    selector: '[spyTableFeaturesRenderer]',
    exportAs: 'spyTableFeaturesRenderer',
})
export class TableFeaturesRendererDirective implements OnInit, OnChanges, OnDestroy {
    @Input() spyTableFeaturesRenderer?: TableFeatureLocation;
    @Input() spyTableFeaturesRendererFeatures?: TableFeatureComponent[];
    @Input() spyTableFeaturesRendererMaxFeatures?: number;
    @Input() spyTableFeaturesRendererContext?: TableFeatureTplContext;
    private featuresDiffer = this.iterableDiffers.find([]).create<FeatureRecord>((idx, feature) => feature.component);

    private destroyed$ = new Subject<void>();
    private maxFeatures$ = new ReplaySubject<number>(1);
    private context$ = new ReplaySubject<TableFeatureTplContext>(1);

    private setAllFeatureRecords$ = new ReplaySubject<Observable<FeatureRecord[]>>(1);
    private allFeatureRecords$ = this.setAllFeatureRecords$.pipe(
        switchAll(),
        map((features) =>
            features.map((feature) => ({
                ...feature,
                template: this.templateRef,
                featureContext$: this.context$,
            })),
        ),
    );

    private featureRecords$: Observable<FeatureRecord[]> = combineLatest([
        this.allFeatureRecords$,
        this.maxFeatures$.pipe(startWith(undefined)),
    ]).pipe(
        debounceTime(0),
        map(([features, maxFeatures]) => features.slice(0, maxFeatures)),
    );

    private featureChanges$ = this.featureRecords$.pipe(
        map((features) => this.featuresDiffer.diff(features)),
        filter(isNonNullable),
    );

    constructor(
        private templateRef: TemplateRef<TableFeaturesRendererContext>,
        private vcr: ViewContainerRef,
        private iterableDiffers: IterableDiffers,
        private cdr: ChangeDetectorRef,
        private featuresRendererService: TableFeaturesRendererService,
    ) {}

    ngOnInit(): void {
        this.featureChanges$.pipe(takeUntil(this.destroyed$)).subscribe((features) => this.updateFeatures(features));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.spyTableFeaturesRenderer || changes.spyTableFeaturesRendererFeatures) {
            this.setAllFeatureRecords$.next(
                this.featuresRendererService.trackFeatureRecords(
                    this.spyTableFeaturesRendererFeatures,
                    this.spyTableFeaturesRenderer,
                ),
            );
        }

        if (changes.spyTableFeaturesRendererContext && this.spyTableFeaturesRendererContext) {
            this.context$.next(this.spyTableFeaturesRendererContext);
        }

        if (changes.spyTableFeaturesRendererMaxFeatures && this.spyTableFeaturesRendererMaxFeatures) {
            this.maxFeatures$.next(this.spyTableFeaturesRendererMaxFeatures);
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.vcr.clear();
    }

    private updateFeatures(changes: IterableChanges<FeatureRecord>): void {
        changes.forEachAddedItem((record) =>
            // Index always exists when adding feature
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.renderFeatureTpl(record.item, record.currentIndex!),
        );

        changes.forEachMovedItem((record) =>
            // Index always exists when moving feature
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.moveFeature(record.previousIndex!, record.currentIndex!),
        );

        changes.forEachRemovedItem((record) =>
            // Index always exists when removing feature
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.destroyFeature(record.currentIndex!),
        );
    }

    private renderFeatureTpl(feature: FeatureRecord, idx: number): void {
        this.vcr.createEmbeddedView<TableFeaturesRendererContext>(this.templateRef, { $implicit: feature }, idx);

        this.cdr.markForCheck();
    }

    private moveFeature(prevIdx: number, idx: number): void {
        const viewRef = this.vcr.get(prevIdx);

        if (viewRef) {
            this.vcr.move(viewRef, idx);
        }
    }

    private destroyFeature(idx: number): void {
        this.vcr.remove(idx);
    }
}
