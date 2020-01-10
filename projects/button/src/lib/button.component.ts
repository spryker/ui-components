import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

export interface ButtonComponentInputs {
  size: 'sm' | 'md' | 'lg';
  variant: 'primary' | 'secondary';
  disabled: boolean;
}

@Component({
  selector: 'spy-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ButtonComponent implements ButtonComponentInputs {
  @Input()
  size: ButtonComponentInputs['size'];

  @Input()
  variant: ButtonComponentInputs['variant'];

  @Input()
  set disabled(val: ButtonComponentInputs['disabled']) {
    this.isDisabled = val != null && val !== false;
  }
  get disabled() {
    return this.isDisabled;
  }

  @Output() customEvent = new EventEmitter<string>();

  isDisabled = false;

  constructor(private renderer: Renderer2, private elemRef: ElementRef) {}

  @HostBinding('class')
  get classes() {
    // Cleanup classes between re-renders because class binding is non-destructive
    this.renderer.removeAttribute(this.elemRef.nativeElement, 'class');

    return {
      disabled: this.isDisabled,
      [`size--${this.size}`]: this.size,
      [`variant--${this.variant}`]: this.variant,
    };
  }
}
