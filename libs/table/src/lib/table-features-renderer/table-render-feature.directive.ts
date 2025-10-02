import {
    ChangeDetectorRef,
    Directive,
    Input,
    OnChanges,
    OnInit,
    TemplateRef,
    ViewContainerRef,
    SimpleChanges,
    inject,
} from '@angular/core';
import { combineLatest, of, ReplaySubject, Subject } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs';

import { TableFeatureTplContext } from '../table-feature/table-feature-tpl.directive';
import { FeatureRecord } from './types';

@Directive({ standalone: false, selector: '[spyTableRenderFeature]' })
export class TableRenderFeatureDirective implements OnInit, OnChanges {
    protected vcr = inject(ViewContainerRef);
    protected cdr = inject(ChangeDetectorRef);

    @Input() spyTableRenderFeature?: FeatureRecord;

    private destroyed$ = new Subject<void>();
    private feature$ = new ReplaySubject<FeatureRecord>(1);

    private template$ = this.feature$.pipe(map((feature) => feature.featureTemplate));
    private templateContext$ = this.feature$.pipe(
        switchMap((feature) => feature.featureContext$ ?? of(undefined)),
        startWith(undefined),
    );

    ngOnInit(): void {
        combineLatest([this.template$, this.templateContext$])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(([template, context]) => this.renderFeature(template, context));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.spyTableRenderFeature && this.spyTableRenderFeature) {
            this.feature$.next(this.spyTableRenderFeature);
        }
    }

    private renderFeature(template: TemplateRef<TableFeatureTplContext>, context?: TableFeatureTplContext): void {
        this.vcr.clear();
        this.vcr.createEmbeddedView(template, context);
        this.cdr.markForCheck();
    }
}
