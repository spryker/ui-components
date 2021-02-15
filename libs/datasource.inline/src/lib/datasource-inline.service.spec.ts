import { TestBed } from '@angular/core/testing';

import { DatasourceInlineService } from './datasource-inline.service';

describe('DatasourceInlineService', () => {
  let service: DatasourceInlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasourceInlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
