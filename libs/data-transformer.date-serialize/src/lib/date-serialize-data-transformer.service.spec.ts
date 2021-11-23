import { TestBed } from '@angular/core/testing';

import { DateSerializeDataTransformerService } from './date-serialize-data-transformer.service';

describe('DateSerializeDataTransformerService', () => {
  let service: DateSerializeDataTransformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateSerializeDataTransformerService);
  });

  it('transform method should return date in the iso format', () => {
    const mockConfig = {
      type: 'type',
    } as any;
    const mockData = 1614195833321;
    const callback = jest.fn();
    const transformObservable$ = service.transform(mockData, mockConfig);
    const mockReturnValue = '2021-02-24T19:43:53.321Z';

    transformObservable$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(mockReturnValue);
  });
});
