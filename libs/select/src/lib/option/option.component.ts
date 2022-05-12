import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
} from '@angular/core';

@Component({
  selector: 'spy-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent {
  @Input() value?: string;
  @Input() title?: string;
  @ViewChild('contentTpl') template!: TemplateRef<void>;
}
