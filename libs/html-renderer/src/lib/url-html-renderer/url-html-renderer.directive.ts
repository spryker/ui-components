import {
  Directive,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { HtmlRendererProvider } from '../html-renderer/html-renderer.provider';
import { Observable, ReplaySubject, EMPTY } from 'rxjs';
import {
  switchMap,
  tap,
  catchError,
  mapTo,
  filter,
  shareReplay,
  publishReplay,
  refCount,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'spy-html-renderer[urlHtml]',
  exportAs: 'urlHtmlRendererProvider',
  providers: [
    {
      provide: HtmlRendererProvider,
      useExisting: UrlHtmlRendererDirective,
    },
  ],
})
export class UrlHtmlRendererDirective
  implements HtmlRendererProvider, OnChanges {
  @Input() urlHtml = '';
  @Output() urlHtmlLoading = new EventEmitter<boolean>();

  private html$ = new ReplaySubject<string>(1);
  private isLoading$ = new ReplaySubject<void>(1);

  constructor(private http: HttpClient) {}

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
      switchMap(urlHtml =>
        this.http.get(urlHtml, { responseType: 'text' }).pipe(
          catchError(() => {
            this.urlHtmlLoading.emit(false);
            return EMPTY;
          }),
        ),
      ),
      tap(() => this.urlHtmlLoading.emit(false)),
    );
  }
}
