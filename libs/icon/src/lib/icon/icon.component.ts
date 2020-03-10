import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { IconService } from './icon.component.service';

@Component({
  selector: 'spy-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class IconComponent implements OnInit, OnChanges {
  @Input() name?: string;

  isIconResolved?: Promise<string | undefined>;

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private elemRef: ElementRef<HTMLElement>,
    private iconsService: IconService,
  ) {}

  ngOnInit(): void {
    this.iconsService._init();
    this.updateHostClass();
    this.updateIcon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.name?.firstChange) {
      this.updateHostClass(changes.name.previousValue);
      this.updateIcon();
    }
  }

  private async updateIcon() {
    if (!this.name) {
      this.isIconResolved = undefined;
      return;
    }

    this.isIconResolved = this.iconsService.resolveIcon(this.name);

    // Re-render manually after icon resolved
    await this.isIconResolved;
    this.cdr.detectChanges();
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
