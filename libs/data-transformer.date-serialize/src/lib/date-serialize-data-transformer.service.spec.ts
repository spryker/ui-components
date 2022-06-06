import { TestBed } from '@angular/core/testing';

import { DateSerializeDataTransformerService } from './date-serialize-data-transformer.service';
import { DateSerializeDataTransformerConfig } from './types';

describe('DateSerializeDataTransformerService', () => {
    let service: DateSerializeDataTransformerService;

    beforeEach(() => {
        TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
        service = TestBed.inject(DateSerializeDataTransformerService);
    });

    it('transform method should return date in the iso format', () => {
        const mockConfig: DateSerializeDataTransformerConfig = {
            type: 'type',
        };
        const mockData = 1614195833321;
        const callback = jest.fn();
        const transformObservable$ = service.transform(mockData, mockConfig);
        const mockReturnValue = '2021-02-24T19:43:53.321Z';

        transformObservable$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(mockReturnValue);
    });
});
