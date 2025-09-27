import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, inject } from '@angular/core';

@Directive({ standalone: false, selector: '[spyApplyAttrs]' })
export class ApplyAttrsDirective implements OnChanges {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    @Input() spyApplyAttrs: Record<string, string> = {};

    updateAttrs(): void {
        if (!this.spyApplyAttrs) {
            return;
        }

        const element = this.el.nativeElement;
        const attrArray: [string, string][] = Object.entries(this.spyApplyAttrs);

        attrArray.forEach(([key, value]) => {
            this.renderer.setAttribute(element, key, value);
        });
    }

    deleteAttrs(prevAttrs: Record<string, string>): void {
        const element = this.el.nativeElement;
        const prevAttrsArray = Object.entries(prevAttrs);

        prevAttrsArray.forEach(([key]) => {
            const shouldKeepAttr = this.spyApplyAttrs && key in this.spyApplyAttrs;

            if (shouldKeepAttr) {
                return;
            }

            this.renderer.removeAttribute(element, key);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.spyApplyAttrs && changes.spyApplyAttrs.previousValue) {
            this.deleteAttrs(changes.spyApplyAttrs.previousValue);
        }

        this.updateAttrs();
    }
}
