import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  OnChanges,
} from '@angular/core';
import { IconService } from './icon.component.service';

@Component({
  selector: 'spy-icon',
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class IconComponent implements OnInit, OnChanges {
  isIconResolved: Promise<string> | null = null;
  @Input() name = '';

  constructor(private iconsService: IconService) {}

  ngOnInit(): void {
    this.iconsService._init();

    this.isIconResolved = this.iconsService.resolveIcon(this.name);
  }

  ngOnChanges(): void {
    this.isIconResolved = this.iconsService.resolveIcon(this.name);
  }
}
