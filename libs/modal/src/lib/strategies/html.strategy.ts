import { ViewContainerRef } from '@angular/core';

import {
  ModalRenderingRef,
  ModalStrategy,
  ModalRef,
  InferModalData,
} from '../types';

export type HtmlFactory<T> = (modalData: any) => T;

export type InferHtmlFactory<T> = T extends HtmlFactory<infer V> ? V : T;

export interface HtmlModalExtras {
  getElements(): Node[];
}

export interface HtmlModalStrategyOptionsBase<T> {
  process?(nodes: Node[], modalRef: ModalRef<T, HtmlModalExtras>): void;
}

export interface HtmlModalStrategyOptionsElement<T>
  extends HtmlModalStrategyOptionsBase<T> {
  html: HTMLElement | Node | HtmlFactory<HTMLElement | Node>;
  cloneNode?: true;
}

export interface HtmlModalStrategyOptionsString<T>
  extends HtmlModalStrategyOptionsBase<T> {
  html: string | HtmlFactory<string>;
  renderVia?: 'innerHTML' | 'innerText';
}

export type HtmlModalStrategyOptions<T> =
  | HtmlModalStrategyOptionsElement<T>
  | HtmlModalStrategyOptionsString<T>;

type HtmlType = Exclude<HtmlModalStrategyOptions<any>['html'], Function>;

type HtmlModalRenderingFunction = (modalData: any) => Node[];

type HtmlNodesFactory<T> = (
  options: HtmlModalStrategyOptions<T>,
  html: HtmlType,
) => Node[];

export class HtmlModalRenderingRef<T>
  implements ModalRenderingRef<T, HtmlModalExtras>, HtmlModalExtras {
  constructor(
    private parentElement: Node,
    private elements: Node[],
    private renderFn: HtmlModalRenderingFunction,
  ) {}

  getElements(): Node[] {
    return this.elements;
  }

  updateData(data?: InferModalData<T>): void {
    this.removeElements();
    this.elements = this.renderFn(data);
  }

  getExtras(): HtmlModalExtras {
    return this;
  }

  dispose(): void {
    // Refs cleanup requires assignment to `undefined`
    // tslint:disable: no-non-null-assertion

    this.removeElements();
    this.elements = undefined!;
    this.renderFn = undefined!;

    // tslint:enable: no-non-null-assertion
  }

  private removeElements() {
    this.elements.forEach(elem => this.parentElement.removeChild(elem));
  }
}

export class HtmlModalStrategy<T> implements ModalStrategy<T, HtmlModalExtras> {
  private createNodes = this.selectRenderFn().bind(this, this.options);

  constructor(private options: HtmlModalStrategyOptions<T>) {}

  render(
    vcr: ViewContainerRef,
    modalRef: ModalRef<T>,
  ): HtmlModalRenderingRef<T> {
    const renderElement: HTMLElement = vcr.element.nativeElement;
    const parentElement = renderElement.parentNode;

    if (!parentElement) {
      throw new Error(`Unable to render Template without HTML parent!`);
    }

    const render: HtmlModalRenderingFunction = data => {
      const html = this.resolveHtml(this.options.html, data);
      const nodes = this.createNodes(html);

      this.options.process?.(nodes, modalRef);

      nodes.reduceRight(
        (prevNode, node) => parentElement.insertBefore(node, prevNode),
        renderElement,
      );

      return nodes;
    };

    const elements = render(modalRef.getData());

    return new HtmlModalRenderingRef(parentElement, elements, render);
  }

  private selectRenderFn(): HtmlNodesFactory<T> {
    return ('element' in this.options
      ? this.renderElement
      : this.renderString) as HtmlNodesFactory<T>;
  }

  private resolveHtml<H extends HtmlType>(
    html: H | HtmlFactory<H>,
    modalData: any,
  ): H {
    if (typeof html === 'function') {
      return html(modalData);
    }
    return html;
  }

  private renderElement(
    options: HtmlModalStrategyOptionsElement<T>,
    html: HTMLElement,
  ): Node[] {
    if (options.cloneNode) {
      html = html.cloneNode(true) as HTMLElement;
    }

    return [html];
  }

  private renderString(
    options: HtmlModalStrategyOptionsString<T>,
    html: string,
  ): Node[] {
    const element = document.createElement('div');
    element[options.renderVia ?? 'innerHTML'] = html;

    return Array.from(element.childNodes);
  }
}
