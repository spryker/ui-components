import { Directive, Input, TemplateRef } from '@angular/core';
import { TableColumnTplContext } from './table';

@Directive({ standalone: false, selector: '[spyColTpl]' })
export class ColTplDirective {
    @Input() spyColTpl = '';

    constructor(public template: TemplateRef<TableColumnTplContext>) {}
}
