import { TestBed } from '@angular/core/testing';

import { TableActionsService } from './table-actions.service';

describe('TableActionsService', () => {
  let service: TableActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
