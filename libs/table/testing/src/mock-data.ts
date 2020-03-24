import { TestRequest } from '@angular/common/http/testing';
import { TableData, TableDataRow } from '@spryker/table';

export interface TableDataMockGeneratorOptions {
  page: number;
  size: number;
  total: number;
}

export type TableDataMockGenerator<T extends TableDataRow = TableDataRow> = (
  i: number,
  options: TableDataMockGeneratorOptions,
) => T;

export function generateMockTableDataFor<T extends TableDataRow>(
  request: TestRequest,
  dataGenerator?: TableDataMockGenerator<T>,
): TableData<T> {
  const page = +(request.request.params.get('page') || 1);
  const size = +(request.request.params.get('size') || 10);
  const total = size + 100;
  const data = generateMockTableData({ page, size, total }, dataGenerator);

  return {
    data,
    page,
    size,
    total,
  };
}

function generateMockTableData<T extends TableDataRow>(
  options: TableDataMockGeneratorOptions,
  dataGenerator: TableDataMockGenerator<T> = () => ({} as T),
): T[] {
  return new Array(options.size)
    .fill(null)
    .map((_, i) => dataGenerator(i, options));
}
