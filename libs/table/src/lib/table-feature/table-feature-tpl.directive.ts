import { Directive, Input, TemplateRef, OnChanges } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { TypedSimpleChanges } from '@spryker/utils';

export interface TableFeatureTplContext {
  [key: string]: any;
}

export class TableFeatureTplDirectiveInputs {
  @Input() spyTableFeatureTpl?: string | string[];
  @Input() spyTableFeatureTplStyles?: Record<string, any>;
}

@Directive({
  selector: '[spyTableFeatureTpl]',
})
export class TableFeatureTplDirective
  extends TableFeatureTplDirectiveInputs
  implements OnChanges
{
  locations$ = new ReplaySubject<string[]>(1);
  styles$ = new ReplaySubject<Record<string, any>>(1);

  constructor(public template: TemplateRef<TableFeatureTplContext>) {
    super();
  }

  ngOnChanges(
    changes: TypedSimpleChanges<TableFeatureTplDirectiveInputs>,
  ): void {
    if (changes.spyTableFeatureTpl) {
      this.locations$.next(
        !this.spyTableFeatureTpl
          ? []
          : Array.isArray(this.spyTableFeatureTpl)
          ? this.spyTableFeatureTpl
          : [this.spyTableFeatureTpl],
      );
    }

    if (changes.spyTableFeatureTplStyles && this.spyTableFeatureTplStyles) {
      this.styles$.next(this.spyTableFeatureTplStyles);
    }
  }
}
