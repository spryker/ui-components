import { Injectable } from '@angular/core';
import { PrefixComponentSelectorStrategyOptions } from 'ngx-element-boundary';

@Injectable({ providedIn: 'root' })
export class CustomElementOptions
  implements PrefixComponentSelectorStrategyOptions {
  /**
   * Add prefix to all Angular Custom Elements
   *
   * By default adds `web-` prefix
   */
  prefix = 'web-';
}
