import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { merge, Subscription } from 'rxjs';
import { mapTo, shareReplay } from 'rxjs/operators';

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
export class HtmlRendererComponent implements OnDestroy, AfterViewInit {
  @ViewChild('htmlRendererContent', { static: false })
  htmlRendererContent?: ElementRef<HTMLElement>;
  @Output() htmlRendered = new EventEmitter<ElementRef>();

  htmlRenderer$ = this.htmlRendererProvider
    .getHtml()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  subscription = new Subscription();
  isLoading$ = merge(
    this.htmlRenderer$.pipe(mapTo(false)),
    this.htmlRendererProvider.isLoading().pipe(mapTo(true)),
  );

  constructor(
    private htmlRendererProvider: HtmlRendererProvider,
    private renderer: Renderer2,
    private domSanitizer: DomSanitizer,
  ) {}

  ngAfterViewInit(): void {
    this.subscription = this.htmlRenderer$.subscribe({
      next: (html) => {
        const bypassedHtml = this.domSanitizer.bypassSecurityTrustHtml(html);

        this.renderer.setProperty(
          this.htmlRendererContent?.nativeElement,
          'innerHTML',
          bypassedHtml,
        );
        this.htmlRendered.emit(this.htmlRendererContent);
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
