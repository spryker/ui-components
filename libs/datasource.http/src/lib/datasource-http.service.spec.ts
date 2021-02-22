import { TestBed } from '@angular/core/testing';

import { DatasourceHttpService } from './datasource-http.service';

describe('DatasourceHttpService', () => {
  let service: DatasourceHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasourceHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
