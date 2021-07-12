import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { merge } from 'rxjs';
import { map, mapTo, shareReplay } from 'rxjs/operators';

import { HtmlRendererProvider } from './html-renderer.provider';

@Component({
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
  @ViewChild('htmlRendererContent', { static: false })
  htmlRendererContent?: ElementRef<HTMLElement>;
  @Output() htmlRendered = new EventEmitter<ElementRef>();

  htmlRenderer$ = this.htmlRendererProvider.getHtml().pipe(
    map((html) => {
      this.htmlRendered.emit(this.htmlRendererContent);

      return this.domSanitizer.bypassSecurityTrustHtml(html);
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  isLoading$ = merge(
    this.htmlRenderer$.pipe(mapTo(false)),
    this.htmlRendererProvider.isLoading().pipe(mapTo(true)),
  );

  constructor(
    private htmlRendererProvider: HtmlRendererProvider,
    private domSanitizer: DomSanitizer,
  ) {}
}
