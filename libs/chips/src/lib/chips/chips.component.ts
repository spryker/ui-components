import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'spy-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ant-chips' },
})
export class ChipsComponent {
  @Input() color = 'green';
  @HostBinding('style.maxWidth') @Input() maxWidth = '145px';

  @HostBinding('class')
  get hostClasses(): string {
    return `ant-chips ${this.color}`;
  }
}
