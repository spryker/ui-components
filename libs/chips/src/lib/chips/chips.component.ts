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
})
export class ChipsComponent {
  @HostBinding('class') @Input() color = 'green';
  @HostBinding('style.maxWidth') @Input() maxWidth = '145px';
}
