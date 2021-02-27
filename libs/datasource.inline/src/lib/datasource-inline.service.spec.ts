import { TestBed } from '@angular/core/testing';

import { DatasourceInlineService } from './datasource-inline.service';

describe('DatasourceInlineService', () => {
  let service: DatasourceInlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasourceInlineService);
  });

  it('resolve method should return value from config.data as observable', () => {
    const mockReturnedValue = 'mockReturnedValue';
    const mockConfig = {
      type: 'inline',
      data: mockReturnedValue,
      transform: {
        type: 'test',
      },
    };
    const mockInjector = {} as any;
    const callback = jest.fn();
    const serviceObservable$ = service.resolve(mockInjector, mockConfig);

    serviceObservable$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(mockReturnedValue);
  });
});