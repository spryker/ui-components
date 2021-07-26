import { Injectable } from '@angular/core';

import { TableConfig } from '../table/table';

@Injectable({ providedIn: 'root' })
export class TableDefaultConfig implements Partial<TableConfig> {}
