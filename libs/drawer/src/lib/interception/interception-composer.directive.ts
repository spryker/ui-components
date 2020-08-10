import { Directive, Provider } from '@angular/core';

import { InterceptionComposableToken } from './interception-composable.token';
import {
  InterceptionComposerImplementation,
  InterceptionComposerService,
} from './interception-composer.service';

export const InterceptionComposerProviders: Provider[] = [
  InterceptionComposerImplementation,
  {
    provide: InterceptionComposerService,
    useExisting: InterceptionComposerImplementation,
  },
];

@Directive({
  selector: '[spyInterceptionComposer]',
  providers: [...InterceptionComposerProviders],
})
export class InterceptionComposerDirective {
  constructor(
    private interceptionComposer: InterceptionComposerImplementation,
  ) {
    this.interceptionComposer.init();
  }
}

export function provideInterceptionComposerToken(token: unknown): Provider[] {
  return [
    ...InterceptionComposerProviders,
    {
      provide: InterceptionComposableToken,
      useExisting: token,
    },
  ];
}
