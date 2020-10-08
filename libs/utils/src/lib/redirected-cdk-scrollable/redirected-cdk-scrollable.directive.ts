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

@Directive({
  selector: '[spy-redirected-cdk-scrollable], [redirectedCdkScrollable]',
})
export class RedirectedCdkScrollableDirective extends CdkScrollable
  implements AfterViewInit {
  @Input() redirectedCdkScrollable = 'body';

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
      'redirectedCdkScrollable' in changes &&
      !changes.redirectedCdkScrollable.firstChange
    ) {
      this.updateElementRef();
    }
  }

  updateElementRef(): void {
    const customElementRef = this.elementRef.nativeElement.querySelector(
      this.redirectedCdkScrollable,
    );

    if (!customElementRef) {
      throw new Error(
        `redirected element does not exist with selector ${this.redirectedCdkScrollable}`,
      );
    }

    this.elementRef = new ElementRef(customElementRef as HTMLElement);
    this.queryElement$.next(this.elementRef);
  }

  elementScrolled(): Observable<Event> {
    return this.elementScrolled$;
  }
}
