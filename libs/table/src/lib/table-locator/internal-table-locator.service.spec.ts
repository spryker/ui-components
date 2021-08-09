import { TestBed } from '@angular/core/testing';

import { InternalTableLocatorService } from './internal-table-locator.service';
import { TableComponent } from '../table';

const mockTableConfig = {
  tableId: 'id-1',
  config: {
    dataSource: {
      type: 'mock-data',
    },
    columns: [
      { id: 'col1', title: 'Column #1', width: '20%' },
      { id: 'col2', title: 'Column #2', width: '20%' },
    ],
  },
};

describe('InternalTableLocatorService', () => {
  let service: InternalTableLocatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalTableLocatorService);
  });

  it('`findById(id)` method should return table config based on `id` argument', () => {
    const internalTableLocatorService$ = service.register(
      mockTableConfig as TableComponent,
    );

    internalTableLocatorService$.subscribe();

    expect(service.tableIdsMap.get('id-1')).toBe(mockTableConfig);
    expect(service.findById('id-1')).toBe(mockTableConfig);
  });
});
