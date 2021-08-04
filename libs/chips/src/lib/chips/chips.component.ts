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
  @Input() color = 'green';
  @HostBinding('style.maxWidth') @Input() maxWidth = '145px';

  @HostBinding('class')
  get hostClasses(): string {
    const hostClassName = 'spy-chips';

    if (!this.color) {
      return hostClassName;
    }

    const replacedColor = this.color.replace(/grey/gi, 'gray');

    return `${hostClassName} ${hostClassName}--${replacedColor}`;
  }
}
