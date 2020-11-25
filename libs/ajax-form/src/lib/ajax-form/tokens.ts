import { InjectionToken } from '@angular/core';
import { DataSerializer } from '@spryker/date-serializer';

export const AjaxFormRequestToken = new InjectionToken<
  DataSerializer<FormData>
>('AjaxFormRequestToken');
