import { InjectionToken } from '@angular/core';
import { DataSerializer } from '@spryker/date-serializer';
import { TableDataRow } from '@spryker/table';

export const TableEditableEditRequestToken = new InjectionToken<
  DataSerializer<TableDataRow>
>('TableEditableEditRequestToken');
