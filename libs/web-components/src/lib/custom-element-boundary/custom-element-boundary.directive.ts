import { Directive } from '@angular/core';
import { ElementBoundaryDirective } from 'ngx-element-boundary';

/**
 * Directive that marks the content projection in template
 * and allows projected angular custom elements to inherit injector
 * in the same way as normal angular component would
 *
 * Simply apply it on the HTML element around `ng-content`:
 * ```html
 *  <span spyCustomElementBoundary>
 *    <ng-content></ng-content>
 *  </span>
 * ```
 *
 * _NOTE:_ Directive MUST be applied on real DOM elements!
 * If you will try it on opaque angular elements like `ng-container`
 * it will not work because they are translated to HTML comments
 * and do not wrap the content projected HTML
 */
@Directive({
  selector: '[spyCustomElementBoundary]',
})
export class CustomElementBoundaryDirective extends ElementBoundaryDirective {}
