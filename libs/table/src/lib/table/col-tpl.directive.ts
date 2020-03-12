import { Directive, Input, TemplateRef } from '@angular/core';
import { TableColumnTplContext } from './table';

@Directive({
  selector: '[spyColTpl]',
})
export class ColTplDirective {
  @Input() spyColTpl = '';

  constructor(public template: TemplateRef<TableColumnTplContext>) {}
}
