import { Directive, Input, TemplateRef } from '@angular/core';
import { TableColumnTplContext } from './table';

@Directive({
  selector: '[colTpl]',
})
export class ColTplDirective {
  @Input() colTpl = '';

  constructor(public template: TemplateRef<TableColumnTplContext>) {}
}
