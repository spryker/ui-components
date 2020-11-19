import {
  Directive,
  AfterContentInit,
  EventEmitter,
  Output,
} from '@angular/core';

@Directive({ selector: '[spyAfterContentInit]' })
export class AfterContentInitDirective implements AfterContentInit {
  @Output()
  spyAfterContentInit = new EventEmitter<void>();

  ngAfterContentInit(): void {
    setTimeout(() => this.spyAfterContentInit.next());
  }
}
