import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';

@Component({
  selector: 'spy-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent {
  @Input() value?: string;
  @Input() title?: string;
  @Input() @ToBoolean() disabled = false;
  @ViewChild('contentTpl') template!: TemplateRef<void>;
}
