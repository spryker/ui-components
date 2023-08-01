import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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

@Component({
    selector: 'spy-second-test-component',
    template: '',
    providers: [
        {
            provide: DatasourceDependableElement,
            useExisting: TestSecondComponent,
        },
    ],
})
class TestSecondComponent implements DatasourceDependableElement {
    getValueChanges(): Observable<unknown> {
        return of(null);
    }
}

describe('DatasourceDependableElementsService', () => {
    let service: DatasourceDependableElementsService;
    let testComponent: TestComponent;
    let testSecondComponent: TestSecondComponent;
    let testFixture: ComponentFixture<TestComponent>;
    let testSecondFixture: ComponentFixture<TestSecondComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, TestSecondComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(DatasourceDependableElementsService);
        testFixture = TestBed.createComponent(TestComponent);
        testSecondFixture = TestBed.createComponent(TestSecondComponent);
        testComponent = testFixture.componentInstance;
        testSecondComponent = testSecondFixture.componentInstance;
    });

    it('should return component instance by id from `resolve()` method', () => {
        const mockId = 'mockId';
        const mockSecondId = 'mockSecondId';
        const callback = jest.fn();
        const secondCallback = jest.fn();

        const serviceObservable$ = service.resolve(mockId);

        serviceObservable$.subscribe(callback);
        service.setElement({ mockId: testComponent });

        expect(callback).toHaveBeenCalledWith(testComponent);

        const serviceSecondObservable$ = service.resolve(mockSecondId);

        serviceSecondObservable$.subscribe(secondCallback);
        service.setElement({ mockSecondId: testSecondComponent });

        expect(secondCallback).toHaveBeenCalledWith(testSecondComponent);
    });
});
