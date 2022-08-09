import { Injectable } from '@angular/core';

import { TableConfig } from '../table';

@Injectable({ providedIn: 'root' })
export class TableDefaultConfig implements Partial<TableConfig> {}
