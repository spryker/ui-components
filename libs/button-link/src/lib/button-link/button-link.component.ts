import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Props } from '@spryker/button';

@Component({
  selector: 'spy-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonLinkComponent implements OnInit {
  @Input() url?: string;
  @Input() shape: Props['shape'] = 'default';
  @Input() size: Props['size'] = 'md';
  @Input() variant: Props['variant'] = 'primary';

  classList?: string;

  ngOnInit(): void {
    this.classList = this.getClassList();
  }

  getClassList(): string {
    return `${this.shape} ${this.size} ${this.variant}`;
  }
}
