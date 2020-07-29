import { HttpClient } from '@angular/common/http';
import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { EMPTY, Observable, ReplaySubject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { HtmlRendererProvider } from '../html-renderer/html-renderer.provider';

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
