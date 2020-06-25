import {
  Component,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { ToBoolean, ToJson } from '@spryker/utils';

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
  @Input() outerPrefix: string | TemplateRef<void> = '';
  @Input() outerSuffix: string | TemplateRef<void> = '';
  @Input() name = '';
  @Input() value: any = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() @ToBoolean() readOnly = false;
  @Input() @ToBoolean() disabled = false;
  @Input() @ToBoolean() required = false;
  @Input() @ToJson() attrs: Record<string, string> = {};
  @Input() spyId = '';
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  isHovered = false;
  isFocused = false;
  baseClassName = 'ant-input-container';
  currentClassName: string = this.baseClassName;

  setHoverState = (event: Event) => {
    this.isHovered = event.type === 'mouseover';
    this.setComponentClassName();
  };

  setFocusState = (event: Event) => {
    this.isFocused = event.type === 'focus';
    this.setComponentClassName();
  };

  setComponentClassName = () => {
    this.currentClassName = `${this.baseClassName} `;
    this.currentClassName += this.isHovered
      ? `${this.baseClassName}--hover `
      : '';
    this.currentClassName += this.isFocused
      ? `${this.baseClassName}--focus `
      : '';
  };
}
