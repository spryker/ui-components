import { Directive, Input, TemplateRef, inject } from '@angular/core';
import { TableColumnTplContext } from './table';

@Directive({ standalone: false, selector: '[spyColTpl]' })
export class ColTplDirective {
    template = inject<TemplateRef<TableColumnTplContext>>(TemplateRef);

    @Input() spyColTpl = '';
}
