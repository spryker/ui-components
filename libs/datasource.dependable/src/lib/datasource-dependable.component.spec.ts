import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { Observable, of } from 'rxjs';
import { DatasourceDependableComponent } from './datasource-dependable.component';
import { DatasourceDependableElementsService } from './datasource-dependable-elements.service';
import { DatasourceDependableElement } from './types';

const mockId = 'mockId';

class MockDatasourceDependableElements {
    setElement = jest.fn();
}

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

describe('DatasourceDependableComponent', () => {
    let service: MockDatasourceDependableElements;

    const { testModule, createComponent } = getTestingForComponent(DatasourceDependableComponent, {
        ngModule: {
            declarations: [TestComponent],
            exports: [TestComponent],
            schemas: [NO_ERRORS_SCHEMA],
        },
        projectContent: '<spy-test-component></spy-test-component>',
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            providers: [
                MockDatasourceDependableElements,
                {
                    provide: DatasourceDependableElementsService,
                    useExisting: MockDatasourceDependableElements,
                },
            ],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(MockDatasourceDependableElements);
    });

    it('should render <spy-datasource-dependable> component', async () => {
        const host = await createComponentWrapper(createComponent);
        const dependableComponent = host.queryCss('spy-datasource-dependable');

        expect(dependableComponent).toBeTruthy();
    });

    it('should render <spy-datasource-dependable> component with `id` input', async () => {
        const host = await createComponentWrapper(createComponent, { id: mockId });
        const dependableComponent = host.queryCss('spy-datasource-dependable');

        expect(dependableComponent.attributes.id).toBe(mockId);
    });

    it('should render projected content', async () => {
        const host = await createComponentWrapper(createComponent);
        const childComponent = host.queryCss('spy-test-component');

        expect(childComponent).toBeTruthy();
    });

    it('should call `DatasourceDependableElementsService.setElement()` method with id and component instance', async () => {
        const host = await createComponentWrapper(createComponent, { id: mockId });
        const childComponent = host.queryCss('spy-test-component').componentInstance;

        expect(service.setElement).toHaveBeenCalledWith({ mockId: childComponent });
    });
});
