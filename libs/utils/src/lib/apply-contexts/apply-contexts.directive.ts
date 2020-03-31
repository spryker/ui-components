import {
  Directive,
  OnChanges,
  OnDestroy,
  Input,
  ElementRef,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

export const CONTEXTS_PREFIX = 'ctx-';
export const HOST_CONTEXTS_PREFIX = 'host-';
export const FULL_CONTEXTS_PREFIX = `${HOST_CONTEXTS_PREFIX}${CONTEXTS_PREFIX}`;

export interface ContextsObserverData {
  contexts: string[];
  node: HTMLElement;
  directive: ApplyContextsDirective;
}

export type ContextsObserver = (data: ContextsObserverData) => void;

export type ContextsObserveEvent = CustomEvent<ContextsObserver>;

export const APPLY_CONTEXTS_OBSERVE_EVENT = 'apply-contexts-observe';

export type ContextsUnobserveEvent = CustomEvent<ContextsObserver>;

export const APPLY_CONTEXTS_UNOBSERVE_EVENT = 'apply-contexts-unobserve';

@Directive({ selector: '[spyApplyContexts]' })
export class ApplyContextsDirective implements OnChanges, OnDestroy {
  @Input() spyApplyContexts?: string | string[];

  private contextData?: ContextsObserverData;
  private observers = new Set<ContextsObserver>();
  private disposables: (() => void)[] = [];

  constructor(
    private elemRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {
    this.disposables.push(
      this.renderer.listen(
        this.elemRef.nativeElement,
        APPLY_CONTEXTS_OBSERVE_EVENT,
        (event: ContextsObserveEvent) => {
          this.observers.add(event.detail);
          this.maybeNotifyObserver(event.detail);
        },
      ),
    );

    this.disposables.push(
      this.renderer.listen(
        this.elemRef.nativeElement,
        APPLY_CONTEXTS_UNOBSERVE_EVENT,
        (event: ContextsUnobserveEvent) =>
          void this.observers.delete(event.detail),
      ),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.spyApplyContexts) {
      this.applyContexts(changes.spyApplyContexts.previousValue);
    }
  }

  ngOnDestroy(): void {
    this.disposables.forEach(dispose => dispose());
    this.disposables = [];
    this.observers.clear();
  }

  private applyContexts(
    prevContext?: ApplyContextsDirective['spyApplyContexts'],
  ) {
    if (prevContext) {
      this.normalizeContexts(prevContext).forEach(ctx =>
        this.renderer.removeClass(this.elemRef.nativeElement, ctx),
      );
    }

    const ctxs = this.normalizeContexts(this.spyApplyContexts);

    ctxs.forEach(ctx =>
      this.renderer.addClass(this.elemRef.nativeElement, ctx),
    );

    this.contextData = {
      contexts: ctxs,
      node: this.elemRef.nativeElement,
      directive: this,
    };

    this.observers.forEach(observer => this.maybeNotifyObserver(observer));
  }

  private normalizeContexts(ctxs: ApplyContextsDirective['spyApplyContexts']) {
    return (Array.isArray(ctxs) ? ctxs : ctxs ? [ctxs] : []).map(
      ctx => `${CONTEXTS_PREFIX}${ctx}`,
    );
  }

  private maybeNotifyObserver(observer: ContextsObserver) {
    if (this.contextData) {
      observer(this.contextData);
    }
  }
}
