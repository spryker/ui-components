import { InjectionToken } from '@angular/core';
import { DataSerializer } from '@spryker/data-serializer';

export const AjaxFormRequestToken = new InjectionToken<DataSerializer<FormData>>('AjaxFormRequest');
