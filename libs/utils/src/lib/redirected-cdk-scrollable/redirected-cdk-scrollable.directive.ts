import { CdkScrollable } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  SimpleChanges,
} from '@angular/core';
import { fromEvent, Observable, ReplaySubject, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

/**
 * Tracks scroll events in the children element by selector using {@link CdkScrollable} directive
 */
@Directive({
  selector: '[spyRedirectedCdkScrollable]',
})
export class RedirectedCdkScrollableDirective extends CdkScrollable
  implements AfterViewInit {
  @Input() spyRedirectedCdkScrollable?: string;

  private queryElement$ = new ReplaySubject<ElementRef<HTMLElement>>();
  private destroyed$ = new Subject<void>();

  private elementScrolled$ = this.queryElement$.pipe(
    switchMap(queryElement =>
      this.ngZone.runOutsideAngular(() =>
        fromEvent(queryElement.nativeElement, 'scroll'),
      ),
    ),
    takeUntil(this.destroyed$),
  );

  ngAfterViewInit(): void {
    this.updateElementRef();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      'spyRedirectedCdkScrollable' in changes &&
      !changes.spyRedirectedCdkScrollable.firstChange
    ) {
      this.updateElementRef();
    }
  }

  updateElementRef(): void {
    if (!this.spyRedirectedCdkScrollable) {
      return;
    }

    const customElementRef = this.elementRef.nativeElement.querySelector(
      this.spyRedirectedCdkScrollable,
    );

    if (!customElementRef) {
      throw new Error(
        `RedirectedCdkScrollableDirective: Element does not exist with selector ${this.spyRedirectedCdkScrollable}`,
      );
    }

    this.elementRef = new ElementRef(customElementRef as HTMLElement);
    this.queryElement$.next(this.elementRef);
  }

  elementScrolled(): Observable<Event> {
    return this.elementScrolled$;
  }
}
