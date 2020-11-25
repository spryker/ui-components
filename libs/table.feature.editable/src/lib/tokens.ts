import { InjectionToken } from '@angular/core';
import { DataSerializer } from '@spryker/data-serializer';
import { TableDataRow } from '@spryker/table';

export const TableEditableEditRequestToken = new InjectionToken<
  DataSerializer<TableDataRow>
>('TableEditableEditRequest');
