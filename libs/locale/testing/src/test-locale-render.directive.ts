import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[spyLocaleRender]',
})
export class TestLocaleRenderDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private vcr: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.vcr.clear();
    this.vcr.createEmbeddedView(this.templateRef, { $implicit: 'mockLocale' });
  }
}
