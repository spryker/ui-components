import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { InternalIconService } from './internal-icon.service';

@Component({
  selector: 'spy-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class IconComponent implements OnInit, OnChanges, OnDestroy {
  @Input() name?: string;

  isIconResolved?: Promise<string | undefined>;

  private destroyed = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private elemRef: ElementRef<HTMLElement>,
    private iconService: InternalIconService,
  ) {}

  ngOnInit(): void {
    this.updateHostClass();
    this.updateIcon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name && !changes.name.firstChange) {
      this.updateHostClass(changes.name.previousValue);
      this.updateIcon();
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }

  private async updateIcon() {
    if (!this.name) {
      this.isIconResolved = undefined;
      return;
    }

    this.isIconResolved = this.iconService.resolveIcon(this.name);

    await this.isIconResolved;

    // Re-render manually after icon resolved
    // After await component might have been destroyed
    // So we have to check before performing CD
    if (!this.destroyed) {
      this.cdr.detectChanges();
    }
  }

  private updateHostClass(prevName?: string) {
    if (prevName) {
      this.renderer.removeClass(
        this.elemRef.nativeElement,
        this.getHostClassName(prevName),
      );
    }

    if (this.name) {
      this.renderer.addClass(
        this.elemRef.nativeElement,
        this.getHostClassName(this.name),
      );
    }
  }

  private getHostClassName(icon: string) {
    return `spy-icon-${icon}`;
  }
}
