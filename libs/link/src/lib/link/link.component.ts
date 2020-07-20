import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
} from '@angular/core';

@Component({
  selector: 'spy-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-link',
  },
})
export class LinkComponent {
  @Input() icon?: string;

  click(): void {}
}
