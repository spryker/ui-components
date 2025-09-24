import { Directive, Input, OnChanges } from '@angular/core';
import { HtmlRendererProvider } from '../html-renderer/html-renderer.provider';
import { Observable, ReplaySubject, EMPTY } from 'rxjs';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'spy-html-renderer[html]',
    exportAs: 'staticHtmlRendererProvider',
    providers: [
        {
            provide: HtmlRendererProvider,
            useExisting: StaticHtmlRendererDirective,
        },
    ],
})
export class StaticHtmlRendererDirective implements HtmlRendererProvider, OnChanges {
    @Input() html = '';

    private html$ = new ReplaySubject<string>(1);

    ngOnChanges(): void {
        this.html$.next(this.html);
    }

    isLoading(): Observable<void> {
        return EMPTY;
    }

    getHtml(): Observable<string> {
        return this.html$.asObservable();
    }
}
