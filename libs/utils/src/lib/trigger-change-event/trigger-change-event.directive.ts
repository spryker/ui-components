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
  @Input() spyTriggerChangeEvent: HTMLElement | string = 'input';

  private changeEventSelectorName = this.spyTriggerChangeEvent as string;

  @HostListener('click', ['$event'])
  onClick(): void {
    typeof this.spyTriggerChangeEvent === 'string'
      ? triggerChangeEvent(
          this.el.nativeElement.querySelector(this.changeEventSelectorName),
        )
      : triggerChangeEvent(this.spyTriggerChangeEvent);
  }

  constructor(private el: ElementRef) {}
}
