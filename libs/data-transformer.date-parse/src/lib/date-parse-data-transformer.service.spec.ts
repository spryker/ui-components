import { TestBed } from '@angular/core/testing';

import { DateParseDataTransformerService } from './date-parse-data-transformer.service';

describe('DateParseDataTransformerService', () => {
  let service: DateParseDataTransformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateParseDataTransformerService);
  });

  it('transform method should returns the date number of milliseconds', () => {
    const mockConfig = {
      type: 'type',
    };
    const mockData = '2021-02-15T10:57:07.086Z';
    const callback = jest.fn();
    const transformObservable$ = service.transform(mockData, mockConfig);
    const mockReturnValue = new Date(mockData).getTime();

    transformObservable$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(mockReturnValue);
  });
});
