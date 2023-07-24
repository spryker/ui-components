import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { DatasourceDependableElementsService } from './datasource-dependable-elements.service';
import { DatasourceDependableElement } from './types';

@Component({
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
        return of(null);
    }
}

describe('DatasourceDependableElementsService', () => {
    let service: DatasourceDependableElementsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(DatasourceDependableElementsService);
    });

    it('should return component instance by id from `resolve()` method', () => {
        const mockId = 'mockId';
        const callback = jest.fn();

        service.getElements({ mockId: new TestComponent() });

        const serviceObservable$ = service.resolve(mockId);

        serviceObservable$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(new TestComponent());
    });
});
