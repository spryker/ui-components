import { TestBed } from '@angular/core/testing';

import { DatasourceInlineService } from './datasource-inline.service';
import { DatasourceInlineConfig } from './types';

describe('DatasourceInlineService', () => {
    let service: DatasourceInlineService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            teardown: { destroyAfterEach: false },
        });
        service = TestBed.inject(DatasourceInlineService);
    });

    it('resolve method should return value from config.data as observable', () => {
        const mockReturnedValue = 'mockReturnedValue';
        const mockConfig: DatasourceInlineConfig = {
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

    it('resolve method should return value from config.data as observable', () => {
        const mockReturnedValue = { test: 'test', depends: 'dependable', };
        const mockContext = { test2: 'depends' };
        const mockConfig: DatasourceInlineConfig = {
            type: 'inline-dependable',
            data: mockReturnedValue,
            dependsOnContext: {
                contextKey: 'test2',
            }
        };
        const mockInjector = {} as any;
        const callback = jest.fn();
        const serviceObservable$ = service.resolve(mockInjector, mockConfig, mockContext);

        serviceObservable$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(mockReturnedValue.depends);
    });

    it('resolve method should return value default value if context is not fittable', () => {
        const mockReturnedValue = { test: 'test' };
        const mockContext = { test2: 'depends' };
        const mockConfig: DatasourceInlineConfig = {
            type: 'inline-dependable',
            data: mockReturnedValue,
            dependsOnContext: {
                contextKey: 'test2',
                default: 'defaultValue',
            }
        };
        const mockInjector = {} as any;
        const callback = jest.fn();
        const serviceObservable$ = service.resolve(mockInjector, mockConfig, mockContext);

        serviceObservable$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(mockConfig.dependsOnContext.default);
    });
});
