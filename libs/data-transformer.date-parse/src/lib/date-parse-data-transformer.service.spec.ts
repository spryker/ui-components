import { TestBed } from '@angular/core/testing';

import { DateParseDataTransformerService } from './date-parse-data-transformer.service';
import { DateService } from '@spryker/utils/date';

class MockDateService {
  parse = jest.fn();
}

describe('DateParseDataTransformerService', () => {
  let service: DateParseDataTransformerService;
  let dateService: MockDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockDateService,
        {
          provide: DateService,
          useExisting: MockDateService,
        },
      ],
    });
    service = TestBed.inject(DateParseDataTransformerService);
    dateService = TestBed.inject(MockDateService);
  });

  it('transform method should returns the date number of milliseconds', () => {
    const mockConfig = {
      type: 'type',
    } as any;
    const mockData = '2021-02-15T10:57:07.086Z';
    const callback = jest.fn();

    dateService.parse.mockImplementation((value) => new Date(value));

    const transformObservable$ = service.transform(mockData, mockConfig);
    const mockReturnValue = new Date(mockData).getTime();

    transformObservable$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(mockReturnValue);
  });
});
