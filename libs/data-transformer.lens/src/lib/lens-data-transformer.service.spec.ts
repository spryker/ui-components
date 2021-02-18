import { TestBed } from '@angular/core/testing';
import { DataTransformerService } from '@spryker/data-transformer';
import { LensDataTransformerService } from './lens-data-transformer.service';
import { of } from 'rxjs';
import { DefaultContextSerializationModule } from '@spryker/utils';

const mockReturnedValue = 'mockReturnValue';

class MockDataTransformerService {
  transform = jest.fn().mockReturnValue(of(mockReturnedValue));
}

describe('ArrayMapDataTransformerService', () => {
  let service: LensDataTransformerService;
  let dataTransformerService: MockDataTransformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DefaultContextSerializationModule],
      providers: [
        MockDataTransformerService,
        {
          provide: DataTransformerService,
          useExisting: MockDataTransformerService,
        },
      ],
    });
    service = TestBed.inject(LensDataTransformerService);
    dataTransformerService = TestBed.inject(MockDataTransformerService);
  });

  it('transform method should return object with transformed value by path prop', () => {
    const mockInitialValue = 'mockInitialValue';
    const mockConfig = {
      type: 'type',
      path: 'test.test2.test3',
      transformer: {
        type: 'type',
      },
    };
    const mockData = {
      test: {
        test2: {
          test3: mockInitialValue,
        },
      },
      test4: 'value',
    };
    const callback = jest.fn();
    const serviceObservable$ = service.transform(mockData, mockConfig);

    serviceObservable$.subscribe(callback);

    expect(dataTransformerService.transform).toBeCalledWith(
      mockInitialValue,
      mockConfig.transformer,
    );

    mockData.test.test2.test3 = mockReturnedValue;

    expect(callback).toHaveBeenCalledWith(mockData);
  });
});
