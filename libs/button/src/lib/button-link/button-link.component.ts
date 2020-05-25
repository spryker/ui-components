import {
  Component,
  OnChanges,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Props } from '@spryker/button';
import { ToJson } from '@spryker/utils';

@Component({
  selector: 'spy-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonLinkComponent implements OnChanges {
  @Input() url?: string;
  @Input() shape: Props['shape'] = 'default';
  @Input() size: Props['size'] = 'md';
  @Input() variant: Props['variant'] = 'primary';
  @Input() @ToJson() attrs: Record<string, string> = {};

  classList?: string;

  ngOnChanges(): void {
    this.classList = `${this.shape} ${this.size} ${this.variant}`;
  }
}
