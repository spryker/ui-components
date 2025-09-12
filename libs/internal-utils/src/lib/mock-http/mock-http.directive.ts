import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { ApplicationRef, Directive, DoCheck, Injector, Input, OnDestroy, inject } from '@angular/core';
import { EMPTY, forkJoin, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, delay, filter, map, mergeAll, mergeMap, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { ensureObservable, getRandomBetween } from '../util';
import { isMatchedRequest, MatchedHttpRequest, MockHttpOptions, MockHttpResponse } from './mock-http';

export function setMockHttp(responses: MockHttpResponse[]) {
    return responses;
}

@Directive({
    standalone: false,
    // This is for internal use only
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[mockHttp]',
})
export class MockHttpDirective implements DoCheck, OnDestroy {
    private appRef = inject(ApplicationRef);
    private injector = inject(Injector);
    private httpController = inject(HttpTestingController);

    private static options: Required<MockHttpOptions> = {
        delay: 'random',
        maxDelay: 2500,
        errorRate: 0,
    };

    @Input() mockHttp: MockHttpResponse[] = [];
    @Input() mockHttpOptions?: MockHttpOptions;

    private destroyed$ = new Subject<void>();
    private addRequests$ = new Subject<TestRequest[]>();

    private requests$ = this.addRequests$.pipe(
        map((requests) => this.matchRequests(requests)),
        filter((requests) => requests.length > 0),
        mergeAll(),
        tap((request) => console.log('Processing request', request)),
        mergeMap((request) =>
            this.resolveValueFrom(request).pipe(
                tap((value) => this.flush(request, value)),
                tap({
                    next: (value) => console.log('Request flushed with value', request, value),
                    error: (value) => console.log('Request flushed with error', request, value),
                }),
                catchError((value) => {
                    this.error(request, value);
                    return EMPTY;
                }),
            ),
        ),
    );

    constructor() {
        this.requests$.pipe(takeUntil(this.destroyed$)).subscribe(() => this.appRef.tick());
    }

    ngDoCheck() {
        this.addRequests$.next(this.httpController.match(() => true));
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    private flush({ request }: MatchedHttpRequest, value: any) {
        if (!request.cancelled) {
            request.flush(value);
        }
    }

    private error({ request }: MatchedHttpRequest, value: any) {
        if (!request.cancelled) {
            request.error(value);
        }
    }

    private matchRequests(requests: TestRequest[]): MatchedHttpRequest[] {
        return requests
            .map((request) => ({
                request,
                response: this.mockHttp.find((mockHttp) =>
                    typeof mockHttp.url === 'string'
                        ? request.request.url.includes(mockHttp.url)
                        : mockHttp.url.test(request.request.url),
                ),
            }))
            .filter(isMatchedRequest);
    }

    private resolveValueFrom(req: MatchedHttpRequest): Observable<any> {
        const delayMs = this.getDelayFrom(req);
        const isError = this.getIsErrorFrom(req);
        const value$ = isError
            ? this.getErrorFrom(req).pipe(switchMap((err) => throwError(() => err)))
            : this.getDataFrom(req);

        return forkJoin([value$.pipe(take(1)), of(null).pipe(delay(delayMs))]).pipe(map(([data]) => data));
    }

    private getIsErrorFrom({ response }: MatchedHttpRequest): boolean {
        const errorRate = response.errorRate ?? this.mockHttpOptions?.errorRate ?? MockHttpDirective.options.errorRate;

        return errorRate > 0 && Math.random() > errorRate;
    }

    private getDataFrom<D>({ request, response }: MatchedHttpRequest<D>): Observable<D> {
        return 'data' in response
            ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              ensureObservable(response.data!)
            : response.dataFn
              ? ensureObservable(response.dataFn(request, this.injector))
              : EMPTY;
    }

    private getErrorFrom<E>({ request, response }: MatchedHttpRequest<any, E>): Observable<E> {
        return 'error' in response
            ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              ensureObservable(response.error!)
            : response.errorFn
              ? ensureObservable(response.errorFn(request, this.injector))
              : EMPTY;
    }

    private getDelayFrom({ response }: MatchedHttpRequest): number {
        const delayValue = response.delay ?? this.mockHttpOptions?.delay ?? MockHttpDirective.options.delay;

        const maxDelay = response.maxDelay ?? this.mockHttpOptions?.maxDelay ?? MockHttpDirective.options.maxDelay;

        return delayValue === 'random' ? getRandomBetween(0, maxDelay) : delayValue;
    }
}
