import { Inject, Optional, Pipe, PipeTransform } from '@angular/core';

import { InjectionTokenType } from '../types';
import { InvokeContext } from './invoke.token';

/**
 * Invoke a function with an arguments from templates
 * with optimizations offered by Angular Pipes.
 *
 * **Example:**
 * ```html
 *  <div>{{ myFunction | spyInvoke:arg1:arg2 }}</div>
 * ```
 *
 * This is a equivalent to next code except that `this` context will be lost
 * ```html
 *  <div>{{ myFunction(arg1, arg2) }}</div>
 * ```
 *
 * To invoke function with the context of current component
 * you may provide it on the component level providers:
 * ```ts
 *  @Component({ standalone: false,
 *    selector: 'my-component',
 *    template: `...`,
 *    providers: [provideInvokeContext(MyComponent)],
 *  })
 *  class MyComponent {}
 * ```
 *
 * In that case all calls via pipe will be done using component as the `this` context
 * and will be identical to when you invoke methods manually in templates.
 */
@Pipe({ standalone: false, name: 'spyInvoke' })
export class InvokePipe implements PipeTransform {
    constructor(
        @Inject(InvokeContext)
        @Optional()
        private context: InjectionTokenType<typeof InvokeContext>,
    ) {}

    transform<TArgs extends any[], TReturn>(fn: (...args: TArgs) => TReturn, ...args: TArgs): TReturn {
        return fn.apply(this.context, args);
    }
}
