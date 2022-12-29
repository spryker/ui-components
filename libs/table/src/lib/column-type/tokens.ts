import { InjectionToken, Provider } from '@angular/core';

import { TableColumnComponentDeclaration } from '../table/table';

/**
 * Multi-provider that holds all column type components of table
 */
export const TableColumnComponentsToken = new InjectionToken<TableColumnComponentDeclaration[]>(
    'TableColumnComponents',
);

export function provideTableColumnComponents(columnComponents: TableColumnComponentDeclaration): Provider {
    return {
        provide: TableColumnComponentsToken,
        useValue: columnComponents,
        multi: true,
    };
}
