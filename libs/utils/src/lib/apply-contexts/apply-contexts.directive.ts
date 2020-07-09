import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  SkipSelf,
} from '@angular/core';
import { combineLatest, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map, pairwise, share, startWith, takeUntil } from 'rxjs/operators';

import { ApplyContextsOptions } from './apply-contexts-options';

@Directive({
  selector: '[spyApplyContexts]',
})
export class ApplyContextsDirective implements OnInit, OnChanges, OnDestroy {
  @Input() spyApplyContexts?: string | string[];

  private destroyed$ = new Subject<void>();

  private setContexts$ = new ReplaySubject<string[]>(1);

  private selfContexts$ = this.setContexts$.pipe(startWith([]));
  private hostContexts$ = this.parent?.contexts$ ?? of([]);

  contexts$: Observable<string[]> = combineLatest([
    this.hostContexts$,
    this.selfContexts$,
  ]).pipe(
    map(([parentContexts, contexts]) => [...parentContexts, ...contexts]),
    share(),
  );

  constructor(
    private elemRef: ElementRef,
    private renderer: Renderer2,
    private options: ApplyContextsOptions,
    @Optional()
    @SkipSelf()
    private parent?: ApplyContextsDirective,
  ) {}

  ngOnInit(): void {
    this.selfContexts$
      .pipe(pairwise(), takeUntil(this.destroyed$))
      .subscribe(([prevContexts, contexts]) =>
        this.applyContexts(contexts, prevContexts),
      );

    this.hostContexts$
      .pipe(pairwise(), takeUntil(this.destroyed$))
      .subscribe(([prevContexts, contexts]) =>
        this.applyContexts(
          this.contextsForHost(contexts),
          this.contextsForHost(prevContexts),
        ),
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('spyApplyContexts' in changes) {
      this.setContexts$.next(this.normalizeContexts(this.spyApplyContexts));
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private applyContexts(contexts: string[], prevContexts?: string[]) {
    prevContexts?.forEach(ctx =>
      this.renderer.removeClass(this.elemRef.nativeElement, ctx),
    );

    contexts.forEach(ctx =>
      this.renderer.addClass(this.elemRef.nativeElement, ctx),
    );
  }

  private contextsForHost(contexts: string[]) {
    return contexts.map(ctx => `${this.options.contextHostPrefix}${ctx}`);
  }

  private normalizeContexts(ctxs: ApplyContextsDirective['spyApplyContexts']) {
    return (Array.isArray(ctxs) ? ctxs : ctxs ? [ctxs] : []).map(
      ctx => `${this.options.contextPrefix}${ctx}`,
    );
  }
}
