import { InjectionToken } from '@angular/core';
import { DataSerializer } from '@spryker/data-serializer';

export const DatasourceHttpRequestToken = new InjectionToken<
  DataSerializer<unknown>
>('DatasourceHttpRequest');
