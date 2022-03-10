import { TestBed } from '@angular/core/testing';
import {
  DataTransformerService,
  DataTransformer,
} from '@spryker/data-transformer';
import { of } from 'rxjs';

import { TextDataTransformerFilterService } from './text-data-transformer-filter.service';

class MockDataTransformer implements DataTransformer<unknown, unknown> {
  transform = jest.fn();
}

describe('TextDataTransformerFilterService', () => {
  let service: TextDataTransformerFilterService;
  let dataTransformer: MockDataTransformer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockDataTransformer,
        {
          provide: DataTransformerService,
          useExisting: MockDataTransformer,
        },
      ],
      teardown: { destroyAfterEach: false },
    });

    service = TestBed.inject(TextDataTransformerFilterService);
    dataTransformer = TestBed.inject(MockDataTransformer);
  });

  it('filter method returns filtered data by value that matches with the prop value.', () => {
    const mockByValue = 'value';
    const mockByValueProp = [mockByValue];
    const mockTransformedValue = 'col 1';
    const mockData = [
      {
        col1: 1,
        col2: 'col 2',
        col3: '2020-09-24T15:20:08+02:00',
        col4: '2020-09-24T15:20:08+02:00',
      },
      {
        col1: 2,
        col2: `${mockTransformedValue}v`,
        col3: '2020-09-22T15:20:08+02:00',
        col4: '2020-09-22T15:20:08+02:00',
      },
    ];
    const mockOptions = {
      type: 'text',
      propNames: ['col1', 'col2'],
    };
    const mockTransformerByPropName = {
      col1: 'mockTransformerValue',
      col2: 'mockTransformerValue',
    };
    const callback = jest.fn();

    dataTransformer.transform.mockReturnValue(of(mockTransformedValue));

    const serviceObservable$ = service.filter(
      mockData,
      mockOptions,
      mockByValueProp,
      mockTransformerByPropName,
    );

    serviceObservable$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith([mockData[1]]);
  });
});
