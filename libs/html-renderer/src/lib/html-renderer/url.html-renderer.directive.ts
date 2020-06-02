import {
  Directive,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { HtmlRendererProvider } from './html-renderer.provider';
import { Observable, ReplaySubject, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[urlHtml]',
  exportAs: 'urlHtml',
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

  constructor(private http: HttpClient) {}

  ngOnChanges(): void {
    this.html$.next(this.urlHtml);
  }

  getHtml(): Observable<string> {
    return this.html$.pipe(
      tap(() => this.urlHtmlLoading.emit(true)),
      switchMap(urlHtml =>
        this.http.get(this.urlHtml, { responseType: 'text' }),
      ),
      tap(() => this.urlHtmlLoading.emit(false)),
    );
  }
}
