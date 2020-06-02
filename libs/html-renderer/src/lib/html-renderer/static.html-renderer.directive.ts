import { Directive, Input, OnChanges } from '@angular/core';
import { HtmlRendererProvider } from './html-renderer.provider';
import { Observable, ReplaySubject } from 'rxjs';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[html]',
  exportAs: 'html',
  providers: [
    {
      provide: HtmlRendererProvider,
      useExisting: StaticHtmlRendererDirective,
    },
  ],
})
export class StaticHtmlRendererDirective
  implements HtmlRendererProvider, OnChanges {
  @Input() html = '';

  private html$ = new ReplaySubject<string>(1);

  ngOnChanges(): void {
    this.html$.next(this.html);
  }

  getHtml(): Observable<string> {
    return this.html$.asObservable();
  }
}
