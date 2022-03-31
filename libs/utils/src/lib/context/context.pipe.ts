import { Pipe, PipeTransform } from '@angular/core';

import { AnyContext, ContextService } from './context.service';

@Pipe({ name: 'context' })
export class ContextPipe implements PipeTransform {
  constructor(private contextService: ContextService) {}

  transform<T>(value?: T, ctx?: AnyContext): T {
    return value && ctx && typeof value === 'string'
      ? (this.contextService.interpolate(value, ctx) as any)
      : value;
  }
}
