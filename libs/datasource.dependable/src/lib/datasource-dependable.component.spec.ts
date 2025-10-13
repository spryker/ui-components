import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { DatasourceDependableComponent } from './datasource-dependable.component';
import { DatasourceDependableElementsService } from './datasource-dependable-elements.service';
import { DatasourceDependableElement } from './types';

const mockId = 'mockId';

class MockDatasourceDependableElements {
    setElement = jest.fn();
}

@Component({
    standalone: false,
    selector: 'spy-test-component',
    template: '',
    providers: [{ provide: DatasourceDependableElement, useExisting: TestComponent }],
})
class TestComponent implements DatasourceDependableElement {
    getValueChanges(): Observable<unknown> {
        return of(null);
    }
}

@Component({
    standalone: false,
    template: `
        <spy-datasource-dependable [id]="id">
            <spy-test-component></spy-test-component>
        </spy-datasource-dependable>
    `,
})
class TestHostComponent {
    id?: string;
}

describe('DatasourceDependableComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let service: MockDatasourceDependableElements;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DatasourceDependableComponent, TestComponent, TestHostComponent],
            providers: [
                MockDatasourceDependableElements,
                { provide: DatasourceDependableElementsService, useExisting: MockDatasourceDependableElements },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(MockDatasourceDependableElements);
        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should render <spy-datasource-dependable> component', () => {
        const dependable = fixture.debugElement.query(By.css('spy-datasource-dependable'));
        expect(dependable).toBeTruthy();
    });

    it('should render <spy-datasource-dependable> component with `id` input', () => {
        const fresh = TestBed.createComponent(TestHostComponent);
        fresh.componentInstance.id = mockId;
        fresh.detectChanges();

        const dependable = fresh.debugElement.query(By.css('spy-datasource-dependable'));
        expect((dependable.nativeElement as HTMLElement).getAttribute('id')).toBe(mockId);
    });

    it('should render projected content', () => {
        const child = fixture.debugElement.query(By.css('spy-test-component'));
        expect(child).toBeTruthy();
    });

    it('should call `DatasourceDependableElementsService.setElement()` with id and component instance', () => {
        const fresh = TestBed.createComponent(TestHostComponent);
        fresh.componentInstance.id = mockId;

        service.setElement.mockClear();
        fresh.detectChanges();

        const childCmp = fresh.debugElement.query(By.css('spy-test-component')).componentInstance as TestComponent;
        expect(service.setElement).toHaveBeenCalledWith({ [mockId]: childCmp });
    });
});
