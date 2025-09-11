import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DatasourceService } from '@spryker/datasource';
import { Observable, of } from 'rxjs';
import { DatasourceDependableService } from './datasource-dependable.service';
import { DatasourceDependableElementsService } from './datasource-dependable-elements.service';
import { DatasourceDependableElement } from './types';

let mockValue = 'mockValue';
const mockId = 'mockId';
const mockConfig = {
    type: 'dependable-element',
    id: mockId,
    datasource: {
        type: 'test',
    },
};
const callback = jest.fn();
const mockContext = { value: mockValue };
const mockResult = 'result';

class MockDatasourceDependableElements {
    resolve = jest.fn();
}

class MockDatasourceService {
    resolve = jest.fn();
}

class MockInjector {
    get = jest.fn();
}

@Component({
    standalone: false,
    selector: 'spy-test-component',
    template: '',
    providers: [
        {
            provide: DatasourceDependableElement,
            useExisting: TestComponent,
        },
    ],
})
class TestComponent implements DatasourceDependableElement {
    getValueChanges(): Observable<unknown> {
        return of(mockValue);
    }
}

describe('DatasourceDependableService', () => {
    let service: DatasourceDependableService;
    let datasourceDependableElements: MockDatasourceDependableElements;
    let datasourceService: MockDatasourceService;
    let injector: MockInjector;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MockDatasourceDependableElements,
                MockDatasourceService,
                MockInjector,
                {
                    provide: DatasourceDependableElementsService,
                    useExisting: MockDatasourceDependableElements,
                },
                {
                    provide: DatasourceService,
                    useExisting: MockDatasourceService,
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(DatasourceDependableService);
        datasourceDependableElements = TestBed.inject(MockDatasourceDependableElements);
        datasourceService = TestBed.inject(MockDatasourceService);
        injector = TestBed.inject(MockInjector);
    });

    it('should return results of trigger subscription from the proper datasources', () => {
        datasourceDependableElements.resolve.mockReturnValue(of(new TestComponent()));
        new TestComponent().getValueChanges();
        datasourceService.resolve.mockReturnValue(of(mockResult));

        const serviceObservable$ = service.resolve(injector, mockConfig);

        serviceObservable$.subscribe(callback);

        expect(datasourceDependableElements.resolve).toHaveBeenCalledWith(mockConfig.id);
        expect(datasourceService.resolve).toHaveBeenCalledWith(injector, mockConfig.datasource, mockContext);
        expect(callback).toHaveBeenCalledWith(mockResult);
    });

    it('should not call `DatasourceService.resolve()` if `getValueChanges()` does not return a value', () => {
        mockValue = null;
        datasourceDependableElements.resolve.mockReturnValue(of(new TestComponent()));
        new TestComponent().getValueChanges();

        const serviceObservable$ = service.resolve(injector, mockConfig);

        serviceObservable$.subscribe(callback);

        expect(datasourceService.resolve).not.toHaveBeenCalled();
        expect(callback).toHaveBeenCalledWith(null);
    });
});
