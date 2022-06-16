import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { triggerChangeEvent } from './trigger-change-event-function';

@Directive({
  selector: '[spyTriggerChangeEvent]',
})
export class TriggerChangeEventDirective {
  @Input() spyTriggerChangeEvent: ElementRef<HTMLElement> | string = 'input';

  @HostListener('click', ['$event'])
  onClick(): void {
    typeof this.spyTriggerChangeEvent === 'string'
      ? triggerChangeEvent(
          this.el.nativeElement.querySelector(`${this.spyTriggerChangeEvent}`),
        )
      : triggerChangeEvent(this.spyTriggerChangeEvent.nativeElement);
  }

  constructor(private el: ElementRef) {}
}
