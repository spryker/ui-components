import { InjectionToken } from '@angular/core';
import { DataSerializer } from '@spryker/data-serializer';

export const AjaxFormRequest = new InjectionToken<DataSerializer<FormData>>(
  'AjaxFormRequest',
);
