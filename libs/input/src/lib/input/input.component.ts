import {
  Component,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'spy-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() prefix: string | TemplateRef<void> = '';
  @Input() suffix: string | TemplateRef<void> = '';
  @Input() name = '';
  @Input() value: any = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() readOnly = false;
  @Input() disabled = false;
  @Input() attrs: Record<string, string> = {};
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
}
