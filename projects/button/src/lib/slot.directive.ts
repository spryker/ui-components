import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  ContentChild,
  Directive,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  InjectionToken,
  Inject,
} from '@angular/core';

import { RenderTplComponent } from './render-tpl.component';

export const SLOT_PARENT_TAG = new InjectionToken<string>(
  'SLOT_PARENT_SELECTOR',
  { factory: () => 'spy-parent' },
);

@Directive({
  selector: 'slot[spySlot]',
})
export class SlotDirective implements OnInit, OnDestroy {
  @ContentChild(TemplateRef) tpl: TemplateRef<any> | undefined;

  private contentProjected = false;
  private compRef: ComponentRef<RenderTplComponent> | undefined;
  private disposables: (() => void)[] = [];

  private get slotElem(): HTMLSlotElement {
    return this.elemRef.nativeElement;
  }

  constructor(
    @Inject(SLOT_PARENT_TAG) private parentTag: string,
    private elemRef: ElementRef,
    private renderer: Renderer2,
    private vcr: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
  ) {}

  ngOnInit(): void {
    this.disposables.push(
      this.renderer.listen(
        this.elemRef.nativeElement,
        'slotchange',
        this.onSlotChange.bind(this),
      ),
    );

    Promise.resolve().then(() => this.reRenderContent());
  }

  ngOnDestroy(): void {
    this.disposables.forEach(dispose => dispose());
  }

  private onSlotChange() {
    const nodes = this.slotElem.assignedNodes();

    const nodesExist = nodes.length > 0;
    const needRendering = nodesExist !== this.contentProjected;
    this.contentProjected = nodesExist;

    if (needRendering) {
      this.reRenderContent();
    }
  }

  private reRenderContent() {
    if (this.compRef) {
      this.compRef.destroy();
      this.compRef = undefined;
    }

    if (this.contentProjected) {
      this.renderDefaultContentIn(this.findParentInSlot());
    } else {
      this.renderDefaultContent();
    }
  }

  private findParentInSlot(): Element | undefined {
    const projectedElems = this.slotElem.assignedElements();

    for (const elem of projectedElems) {
      // Direct match path
      if (elem.tagName.toLowerCase() === this.parentTag) {
        return elem;
      }

      // Children check path
      const parentElem = elem.querySelector(this.parentTag);

      if (parentElem) {
        return parentElem;
      }
    }
  }

  private renderDefaultContentIn(element?: Element) {
    if (!element) {
      return;
    }

    const compFactory = this.cfr.resolveComponentFactory(RenderTplComponent);
    const compRef = (this.compRef = compFactory.create(this.injector, []));

    this.appRef.attachView(compRef.hostView);

    this.renderer.appendChild(element, compRef.location.nativeElement);

    compRef.instance.template = this.tpl;
    compRef.changeDetectorRef.detectChanges();
  }

  private renderDefaultContent() {
    this.vcr.clear();
    this.vcr.createEmbeddedView(this.tpl);
  }
}
