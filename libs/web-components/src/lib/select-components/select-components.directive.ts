import { ContentObserver } from '@angular/cdk/observers';
import { Directive, ElementRef, Input, OnChanges, OnDestroy, Output, SimpleChanges, Type } from '@angular/core';
import { EMPTY, forkJoin, Observable, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, map, mapTo, shareReplay, startWith, switchAll, switchMap } from 'rxjs/operators';

import { isNgWebComponent, isNgWebComponentOf, NgWebComponent } from '../ng-web-component';

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
export class SelectComponentsDirective<T = unknown> implements OnChanges, OnDestroy {
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

    private destroyed$ = new Subject<void>();
    private setObserver$ = new ReplaySubject<Observable<any>>(1);

    private observations$: Observable<Observable<any>> = this.setObserver$.pipe(
        switchAll(),
        startWith(null),
        debounceTime(0),
    );

    private elements$ = this.observations$.pipe(switchMap(() => this.findElements()));

    private components$ = this.elements$.pipe(switchMap((elements) => this.findComponentsIn(elements)));

    /**
     * Emits every time it performs search of components in DOM
     */
    @Output() spySelectComponentsFound: Observable<T[]> = this.components$.pipe(
        map((components) => this.findInstancesIn(components)),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    constructor(
        private elemRef: ElementRef<Element>,
        private observer: ContentObserver,
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if ('spySelectComponentsObserve' in changes) {
            const observer$ = this.spySelectComponentsObserve ? this.observer.observe(this.elemRef) : EMPTY;
            this.setObserver$.next(observer$);
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    private findElements(): Promise<Element[]> {
        const children = Array.from(this.elemRef.nativeElement.children);

        if (this.spySelectComponentsSkipWaiting) {
            return Promise.resolve(children);
        }

        const allElementsDefined = children.map((element) =>
            customElements
                .whenDefined(element.tagName.toLowerCase())
                // Catch errors when ran on non custom elements
                .catch(() => void 0 as void),
        );

        return Promise.all(allElementsDefined).then(() => children);
    }

    private findComponentsIn(elements: Element[]): Observable<NgWebComponent<unknown>[]> {
        const components: NgWebComponent<unknown>[] = elements.filter((element) => isNgWebComponent(element)) as any;

        return forkJoin(components.map((component) => component.whenInit().pipe(mapTo(component))));
    }

    private findInstancesIn(components: NgWebComponent<unknown>[]): T[] {
        if (!this.spySelectComponents) {
            return [];
        }

        const ngWebComponents = components.filter(isNgWebComponentOf(this.spySelectComponents));

        return ngWebComponents.map((c) => c.getSuper());
    }
}
