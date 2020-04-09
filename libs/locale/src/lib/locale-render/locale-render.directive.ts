import {
  ChangeDetectorRef,
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, startWith } from 'rxjs/operators';

import { LocaleService } from '../locale.service';

export interface LocaleRenderTemplateCtx {
  $implicit: string; // LOCALE_ID
}

@Directive({
  selector: '[spyLocaleRender]',
})
export class LocaleRenderDirective implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<LocaleRenderTemplateCtx>,
    private vcr: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private localeService: LocaleService,
  ) {}

  ngOnInit() {
    this.localeService.localeLoaded$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(locale => this.renderView(locale));
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
