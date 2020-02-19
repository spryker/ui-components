import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
} from '@angular/core';
import { IconService } from './icon.component.service';

@Component({
  selector: 'spy-icon',
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class IconComponent implements OnInit {
  isIconResolved: Promise<string> | null = null;
  @Input() name = '';

  constructor(private iconsService: IconService) {}

  ngOnInit(): void {
    this.iconsService._init();

    this.isIconResolved = new Promise(resolve =>
      resolve(this.iconsService.resolveIcon(this.name)),
    );
  }
}
