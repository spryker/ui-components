import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  ElementRef,
  Renderer2,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { HtmlRendererProvider } from './html-renderer.provider';
import { Subscription } from 'rxjs';

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
export class HtmlRendererComponent implements OnInit, OnDestroy {
  @Output() htmlRendered = new EventEmitter<ElementRef>();

  htmlRenderer$ = this.htmlRendererProvider.getHtml();
  subscription = new Subscription();

  constructor(
    private htmlRendererProvider: HtmlRendererProvider,
    private renderer: Renderer2,
    private elemRef: ElementRef<HTMLElement>,
  ) {}

  ngOnInit(): void {
    this.subscription = this.htmlRenderer$.subscribe({
      next: html => {
        this.renderer.setProperty(
          this.elemRef.nativeElement,
          'innerHTML',
          html,
        );
        this.htmlRendered.emit(this.elemRef);
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
