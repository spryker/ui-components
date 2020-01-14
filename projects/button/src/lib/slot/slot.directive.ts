import {
  AfterContentInit,
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  ContentChild,
  Directive,
  ElementRef,
  Inject,
  InjectionToken,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { RenderTplComponent } from './render-tpl.component';

/**
 * Parent tag name that will be used to insert original template in slot contents
 */
export const SLOT_PARENT_TAG = new InjectionToken<string>(
  'SLOT_PARENT_SELECTOR',
);

@Directive({
  selector: '[spySlot]',
})
export class SlotDirective implements OnInit, OnDestroy, AfterContentInit {
  /**
   * Parent tag name that will be used to insert original template in slot contents
   *
   * Global value can be set via {@link SLOT_PARENT_TAG} token
   */
  @Input() spySlotParentTag: string;

  @ContentChild(TemplateRef) template: TemplateRef<any> | undefined;

  private contentProjected = false;
  private compRef: ComponentRef<RenderTplComponent> | undefined;
  private disposables: (() => void)[] = [];

  private get slotElem() {
    return this.elemRef.nativeElement;
  }

  private get parentTag() {
    return this.spySlotParentTag || this.defaultParentTag;
  }

  constructor(
    @Inject(SLOT_PARENT_TAG) private defaultParentTag: string,
    private elemRef: ElementRef<HTMLSlotElement>,
    private renderer: Renderer2,
    private vcr: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
  ) {}

  ngOnInit(): void {
    if (!this.parentTag) {
      console.warn(`SlotDirective: Parent tag is not set!`);
    }

    this.disposables.push(
      this.renderer.listen(
        this.elemRef.nativeElement,
        'slotchange',
        this.onSlotChange.bind(this),
      ),
    );
  }

  ngAfterContentInit(): void {
    // Schedule initial render after potential 'slotchange' event
    // So we do not render default content unnecessarily
    Promise.resolve().then(() => this.reRenderContent());
  }

  ngOnDestroy(): void {
    this.disposables.forEach(dispose => dispose());
    this.maybeDestroyComponent();
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
      this.maybeDestroyComponent();
      return;
    }

    if (!this.compRef) {
      this.createComponentIn(element);
    }

    this.compRef.instance.template = this.template;
    this.compRef.changeDetectorRef.detectChanges();
  }

  private renderDefaultContent() {
    this.maybeDestroyComponent();
    this.vcr.clear();
    this.vcr.createEmbeddedView(this.template);
  }

  private createComponentIn(element: Element) {
    this.maybeDestroyComponent(); // Prevent accidental leaks

    const compFactory = this.cfr.resolveComponentFactory(RenderTplComponent);
    const compRef = (this.compRef = compFactory.create(this.injector, []));

    this.appRef.attachView(compRef.hostView);
    this.renderer.setProperty(element, 'innerHTML', ''); // Clear old content
    this.renderer.appendChild(element, compRef.location.nativeElement);
  }

  private maybeDestroyComponent() {
    if (this.compRef) {
      this.compRef.destroy();
      this.compRef = undefined;
    }
  }
}
