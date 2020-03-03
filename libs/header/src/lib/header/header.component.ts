import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'spy-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() @HostBinding('class') ctxClass = 'ctx-spy-bg-white';
}
