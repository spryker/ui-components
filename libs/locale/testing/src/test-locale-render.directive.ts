import { Directive, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';

@Directive({ standalone: false, selector: '[spyLocaleRender]' })
export class TestLocaleRenderDirective implements OnInit {
    protected templateRef = inject<TemplateRef<any>>(TemplateRef);
    protected vcr = inject(ViewContainerRef);

    ngOnInit() {
        this.vcr.clear();
        this.vcr.createEmbeddedView(this.templateRef, {
            $implicit: 'mockLocale',
        });
    }
}
