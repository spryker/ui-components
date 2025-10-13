import { HttpClient } from '@angular/common/http';
import { Directive, EventEmitter, Injector, Input, OnChanges, Output, inject } from '@angular/core';
import { EMPTY, Observable, ReplaySubject, catchError, map, switchMap, tap } from 'rxjs';
import { AjaxActionService } from '@spryker/ajax-action';
import { HtmlRendererProvider } from '../html-renderer/html-renderer.provider';
import { UrlHtmlRendererResponse } from '../html-renderer/types';

@Directive({
    standalone: false,
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'spy-html-renderer[urlHtml]',
    exportAs: 'urlHtmlRendererProvider',
    providers: [
        {
            provide: HtmlRendererProvider,
            useExisting: UrlHtmlRendererDirective,
        },
    ],
})
export class UrlHtmlRendererDirective implements HtmlRendererProvider, OnChanges {
    protected injector = inject(Injector);
    protected http = inject(HttpClient);
    protected ajaxActionService = inject(AjaxActionService);

    @Input() urlHtml = '';
    @Input() urlMethod = 'GET';
    @Output() urlHtmlLoading = new EventEmitter<boolean>();

    private html$ = new ReplaySubject<string>(1);
    private isLoading$ = new ReplaySubject<void>(1);

    ngOnChanges(): void {
        this.html$.next(this.urlHtml);
    }

    isLoading(): Observable<void> {
        return this.isLoading$;
    }

    getHtml(): Observable<string> {
        return this.html$.pipe(
            tap(() => {
                this.urlHtmlLoading.emit(true);
                this.isLoading$.next();
            }),
            switchMap((urlHtml) =>
                this.http.request<UrlHtmlRendererResponse>(this.urlMethod || 'GET', urlHtml).pipe(
                    catchError(() => {
                        this.urlHtmlLoading.emit(false);
                        return EMPTY;
                    }),
                ),
            ),
            map((response) => {
                this.ajaxActionService.handle(response, this.injector);
                this.urlHtmlLoading.emit(false);

                return response.html ?? '';
            }),
        );
    }
}
