import { TestRequest } from '@angular/common/http/testing';
import { TableData, TableDataRow } from '@spryker/table';

export interface TableDataMockGeneratorOptions {
    page: number;
    pageSize: number;
    total: number;
}

export type TableDataMockGenerator<T extends TableDataRow = TableDataRow> = (
    i: number,
    options: TableDataMockGeneratorOptions,
) => T;

export function generateMockTableDataFor<T extends TableDataRow>(
    request: TestRequest,
    dataGenerator: TableDataMockGenerator<T>,
): TableData<T> {
    const page = request.request.params.get('page');
    const pageSize = request.request.params.get('pageSize');

    return generateMockTableDataForOptions(
        {
            page: page != null ? +page : undefined,
            pageSize: pageSize != null ? +pageSize : undefined,
        },
        dataGenerator,
    );
}

export function generateMockTableDataForOptions<T extends TableDataRow>(
    { page = 1, pageSize = 10, total = pageSize + 100 }: Partial<TableDataMockGeneratorOptions>,
    dataGenerator: TableDataMockGenerator<T>,
): TableData<T> {
    const data = generateMockTableData({ page, pageSize, total }, dataGenerator);

    return {
        data,
        page,
        pageSize,
        total,
    };
}

function generateMockTableData<T extends TableDataRow>(
    options: TableDataMockGeneratorOptions,
    dataGenerator: TableDataMockGenerator<T> = () => ({}) as T,
): T[] {
    const offset = (options.page - 1) * options.pageSize;

    return new Array(options.pageSize).fill(null).map((_, i) => dataGenerator(i + offset, options));
}
