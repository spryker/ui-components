import { Pipe, PipeTransform, inject } from '@angular/core';

import { AnyContext, ContextService } from './context.service';

@Pipe({ standalone: false, name: 'context' })
export class ContextPipe implements PipeTransform {
    private contextService = inject(ContextService);

    transform<T>(value?: T, ctx?: AnyContext): T {
        return value && ctx && typeof value === 'string' ? (this.contextService.interpolate(value, ctx) as any) : value;
    }
}
