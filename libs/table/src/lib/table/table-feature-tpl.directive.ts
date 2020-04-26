import { Directive, Input, TemplateRef } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface TableFeatureTplContext {
  [key: string]: any;
}

@Directive({
  selector: '[spyTableFeatureTpl]',
})
export class TableFeatureTplDirective {
  @Input() set spyTableFeatureTpl(val: string | string[]) {
    this.locations$.next(Array.isArray(val) ? val : [val]);
  }

  @Input() set spyTableFeatureTplStyles(val: string) {
    this.styles$.next(val);
  }

  locations$ = new ReplaySubject<string[]>(1);
  styles$ = new ReplaySubject<string>(1);

  constructor(public template: TemplateRef<TableFeatureTplContext>) {}
}
