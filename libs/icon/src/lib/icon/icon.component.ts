import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
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

  isSvgResolved?: Promise<string | undefined>;

  constructor(
    private cdr: ChangeDetectorRef,
    private iconsService: IconService,
  ) {}

  ngOnInit(): void {
    this.iconsService._init();
    this.updateSvg();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.name?.firstChange) {
      this.updateSvg();
    }
  }

  private async updateSvg() {
    if (!this.name) {
      this.isSvgResolved = undefined;
      return;
    }

    this.isSvgResolved = this.iconsService.resolveIcon(this.name);

    // Re-render manually after icon resolved
    await this.isSvgResolved;
    this.cdr.detectChanges();
  }
}
