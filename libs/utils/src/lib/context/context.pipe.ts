import { Pipe, PipeTransform } from '@angular/core';

import { AnyContext, ContextService } from './context.service';

@Pipe({ name: 'context' })
export class ContextPipe implements PipeTransform {
  constructor(private contextService: ContextService) {}

  transform(value?: unknown, ctx?: AnyContext) {
    return value && ctx && typeof value === 'string'
      ? this.contextService.interpolate(value, ctx)
      : value;
  }
}
