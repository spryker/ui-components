import { TestBed } from '@angular/core/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PluckDataTransformerService } from './pluck-data-transformer.service';

const mockObject = {
    test: {
        test2: {
            test3: 'value',
        },
    },
    test4: 'value',
};

describe('PluckDataTransformerService', () => {
    let service: PluckDataTransformerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DefaultContextSerializationModule],
            teardown: { destroyAfterEach: false },
        });
        service = TestBed.inject(PluckDataTransformerService);
    });

    it('transform method should traverse the data as specified in path config.path and return final value', () => {
        const mockConfig = {
            type: 'pluck',
            path: 'test.test2.test3',
        };
        const callback = jest.fn();
        const transformTrigger$ = new ReplaySubject(1);
        const transformObservable$ = transformTrigger$.pipe(
            switchMap((config: any) => service.transform(mockObject, config)),
        );

        transformTrigger$.next(mockConfig);
        transformObservable$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(mockObject.test.test2.test3);

        mockConfig.path = 'test4';
        transformTrigger$.next(mockConfig);

        expect(callback).toHaveBeenCalledWith(mockObject.test4);

        mockConfig.path = 'test.test2';
        transformTrigger$.next(mockConfig);

        expect(callback).toHaveBeenCalledWith(mockObject.test.test2);
    });

    it('transform method should traverse the data as specified in path config.path and return undefined if at some point the path became undefiend', () => {
        const mockConfig = {
            type: 'pluck',
            path: 'test.test4.test3',
        };
        const callback = jest.fn();
        const transformTrigger$ = new ReplaySubject(1);
        const transformObservable$ = transformTrigger$.pipe(
            switchMap((config: any) => service.transform(mockObject, config)),
        );

        transformTrigger$.next(mockConfig);
        transformObservable$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(undefined);

        mockConfig.path = 'test42';
        transformTrigger$.next(mockConfig);

        expect(callback).toHaveBeenCalledWith(undefined);

        mockConfig.path = 'test.test2.test32';
        transformTrigger$.next(mockConfig);

        expect(callback).toHaveBeenCalledWith(undefined);
    });
});
