import { Directive, Input, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface TableFeatureTplContext {
    [key: string]: any;
}

@Directive({ standalone: false, selector: '[spyTableFeatureTpl]' })
export class TableFeatureTplDirective implements OnChanges {
    @Input() spyTableFeatureTpl?: string | string[];
    @Input() spyTableFeatureTplStyles?: Record<string, any>;
    locations$ = new ReplaySubject<string[]>(1);
    styles$ = new ReplaySubject<Record<string, any>>(1);

    constructor(public template: TemplateRef<TableFeatureTplContext>) {}

    ngOnChanges(changes: SimpleChanges): void {
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
