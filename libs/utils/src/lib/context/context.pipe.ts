import { Pipe, PipeTransform } from '@angular/core';

import { AnyContext, ContextService } from './context.service';

@Pipe({ name: 'context' })
export class ContextPipe implements PipeTransform {
  constructor(private contextService: ContextService) {}

  transform(value?: string, ctx?: AnyContext) {
    return value && ctx ? this.contextService.interpolate(value, ctx) : value;
  }
}
