import {
  Component,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Props } from '../button/button.component';
import { ToJson } from '@spryker/utils';

@Component({
  selector: 'spy-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonLinkComponent implements OnChanges, OnInit {
  @Input() url?: string;
  @Input() shape: Props['shape'] = 'default';
  @Input() size: Props['size'] = 'md';
  @Input() variant: Props['variant'] = 'primary';
  @Input() @ToJson() attrs: Record<string, string> = {};

  classList?: string;

  ngOnInit(): void {
    this.setClassList();
  }

  ngOnChanges(): void {
    this.setClassList();
  }

  private setClassList(): void {
    this.classList = `${this.shape} ${this.size} ${this.variant}`;
  }
}
