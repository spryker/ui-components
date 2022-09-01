import { InjectionToken, Type, Provider } from '@angular/core';

export const InvokeContext = new InjectionToken<any>('InvokeContext');

export function provideInvokeContext(type: Type<any>): Provider {
    return { provide: InvokeContext, useExisting: type };
}
