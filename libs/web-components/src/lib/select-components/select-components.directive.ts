import { ContentObserver } from '@angular/cdk/observers';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  Type,
} from '@angular/core';
import { EMPTY, Observable, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, startWith, switchAll, takeUntil } from 'rxjs/operators';

import { isNgWebComponentOf, NgWebComponent } from '../ng-web-component';

/**
 * Directive allows to select WebComponents that are {@link NgWebComponent}
 * of specific type {@link SelectComponentsDirective.spySelectComponents}.
 *
 * When it perform DOM search - it triggers
 * {@link SelectComponentsDirective.spySelectComponentsFound} event.
 *
 * **Example:**
 * ```html
 *  <span
 *    [spySelectComponents]="someComponentType"
 *    (spySelectComponentsFound)="processComponents($event)">
 *    <ng-content></ng-content>
 *  </span>
 * ```
 */
@Directive({
  selector: '[spySelectComponents]',
})
export class SelectComponentsDirective<T = unknown>
  implements OnInit, OnChanges, OnDestroy {
  /**
   * Angular component type that {@link NgWebComponent} should be instance of
   */
  @Input() spySelectComponents?: Type<T>;
  /**
   * When true - will observe DOM changes and recompute components from DOM
   */
  @Input() spySelectComponentsObserve = false;
  /**
   * When true - will not wait until all children in DOM are defined as custom elements
   */
  @Input() spySelectComponentsSkipWaiting = false;

  /**
   * Emits every time it performs search of components in DOM
   */
  @Output() spySelectComponentsFound = new EventEmitter<NgWebComponent<T>[]>();

  private destroyed$ = new Subject<void>();
  private setObserver$ = new ReplaySubject<Observable<any>>();

  private observations$ = this.setObserver$.pipe(switchAll());

  constructor(
    private elemRef: ElementRef<Element>,
    private observer: ContentObserver,
  ) {}

  ngOnInit(): void {
    this.observations$
      .pipe(startWith(null), debounceTime(0), takeUntil(this.destroyed$))
      .subscribe(() => this.findComponents());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('spySelectComponentsObserve' in changes) {
      const observer$ = this.spySelectComponentsObserve
        ? this.observer.observe(this.elemRef)
        : EMPTY;
      this.setObserver$.next(observer$);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private async findComponents() {
    if (!this.spySelectComponents) {
      return;
    }

    const children = Array.from<unknown>(this.elemRef.nativeElement.children);

    if (!this.spySelectComponentsSkipWaiting) {
      const allDefined = (children as Element[]).map(c =>
        customElements.whenDefined(c.tagName.toLowerCase()),
      );

      await Promise.all(allDefined);
    }

    const components = children.filter(
      isNgWebComponentOf(this.spySelectComponents),
    );

    this.spySelectComponentsFound.emit(components);
  }
}
