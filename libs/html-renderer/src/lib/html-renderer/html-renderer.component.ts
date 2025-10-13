import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SpinnerSize } from '@spryker/spinner';
import { merge, map, shareReplay } from 'rxjs';

import { HtmlRendererProvider } from './html-renderer.provider';

@Component({
    standalone: false,
    selector: 'spy-html-renderer',
    templateUrl: './html-renderer.component.html',
    styleUrls: ['./html-renderer.component.less'],
    host: {
        class: 'spy-html-renderer',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class HtmlRendererComponent {
    protected htmlRendererProvider = inject(HtmlRendererProvider);
    protected domSanitizer = inject(DomSanitizer);

    @ViewChild('htmlRendererContent', { static: false })
    htmlRendererContent?: ElementRef<HTMLElement>;
    @Input() spinnerSize = SpinnerSize.Small;
    @Output() htmlRendered = new EventEmitter<ElementRef>();

    htmlRenderer$ = this.htmlRendererProvider.getHtml().pipe(
        map((html) => {
            setTimeout(() => this.htmlRendered.emit(this.htmlRendererContent), 0);

            return this.domSanitizer.bypassSecurityTrustHtml(html);
        }),
        shareReplay({ bufferSize: 1, refCount: true }),
    );
    isLoading$ = merge(
        this.htmlRenderer$.pipe(map(() => false)),
        this.htmlRendererProvider.isLoading().pipe(map(() => true)),
    );
}
