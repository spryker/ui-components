import { TestBed } from '@angular/core/testing';
import { toIsoDateFormat } from '@spryker/utils';

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
    };
    const mockData = new Date().getTime();
    const callback = jest.fn();
    const transformObservable$ = service.transform(mockData, mockConfig);
    const mockReturnValue = toIsoDateFormat(new Date(mockData));

    transformObservable$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(mockReturnValue);
  });
});
