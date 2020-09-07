import { Directive, Provider, OnInit } from '@angular/core';

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
export class InterceptionComposerDirective implements OnInit {
  constructor(
    private interceptionComposer: InterceptionComposerImplementation,
  ) {}

  ngOnInit(): void {
    this.interceptionComposer.ngOnInit();
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
