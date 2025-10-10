import { ChangeDetectorRef, Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { LocaleService } from '../locale.service';

export interface LocaleRenderTemplateCtx {
    $implicit: string; // LOCALE_ID
}

@Directive({ standalone: false, selector: '[spyLocaleRender]' })
export class LocaleRenderDirective implements OnInit, OnDestroy {
    private templateRef = inject<TemplateRef<LocaleRenderTemplateCtx>>(TemplateRef);
    protected vcr = inject(ViewContainerRef);
    protected cdr = inject(ChangeDetectorRef);
    protected localeService = inject(LocaleService);

    private destroyed$ = new Subject<void>();

    ngOnInit() {
        this.localeService.localeLoaded$
            .pipe(takeUntil(this.destroyed$))
            .subscribe((locale) => this.renderView(locale));
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }

    private renderView(locale: string) {
        this.vcr.clear();
        this.vcr.createEmbeddedView(this.templateRef, { $implicit: locale });
        this.cdr.detectChanges();
    }
}
