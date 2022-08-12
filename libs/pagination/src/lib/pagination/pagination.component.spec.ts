import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
    @Component({
        // eslint-disable-next-line @angular-eslint/component-selector
        selector: 'test-component',
        template: `
            <spy-pagination
                [total]="total"
                [page]="page"
                [pageSize]="pageSize"
                [hideOnSinglePage]="hideOnSinglePage"
                (pageChange)="pageChangeSpy($event)"
                (pageSizeChange)="pageSizeChangeSpy($event)"
            ></spy-pagination>
        `,
    })
    class TestComponent {
        total: any;
        page: any;
        pageSize: any;
        hideOnSinglePage: any;
        pageSizeOptions: any;
        placeholder: any;
        pageChangeSpy = jest.fn<number, any[]>();
        pageSizeChangeSpy = jest.fn<number, any[]>();
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaginationComponent, TestComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    }));

    it('template must render nz-pagination from Ant Design and spy-select', () => {
        component.total = 1;
        fixture.detectChanges();

        const nzPagElem = fixture.debugElement.query(By.css('nz-pagination'));
        const selectElem = fixture.debugElement.query(By.css('spy-select'));

        expect(nzPagElem).toBeTruthy();
        expect(selectElem).toBeTruthy();
    });

    describe('Inputs must be bound to nz-pagination', () => {
        it('should bind total to nzTotal of nz-pagination', () => {
            const nzPagElem = fixture.debugElement.query(By.css('nz-pagination'));
            const mockedValue = 2;

            component.total = mockedValue;

            fixture.detectChanges();

            expect(nzPagElem.properties.nzTotal).toBe(mockedValue);
        });

        it('should bind page to nzPageIndex of nz-pagination', () => {
            const nzPagElem = fixture.debugElement.query(By.css('nz-pagination'));
            const mockedValue = 2;

            component.page = mockedValue;

            fixture.detectChanges();

            expect(nzPagElem.properties.nzPageIndex).toBe(mockedValue);
        });

        it('should bind pageSize to nzPageSize of nz-pagination', () => {
            const nzPagElem = fixture.debugElement.query(By.css('nz-pagination'));
            const mockedValue = [10, 20, 50];

            component.pageSize = mockedValue;

            fixture.detectChanges();

            expect(nzPagElem.properties.nzPageSize).toBe(mockedValue);
        });

        it('should bind hideOnSinglePage to nzHideOnSinglePage of nz-pagination', () => {
            const nzPagElem = fixture.debugElement.query(By.css('nz-pagination'));
            const mockedValue = true;

            component.hideOnSinglePage = mockedValue;

            fixture.detectChanges();

            expect(nzPagElem.properties.nzHideOnSinglePage).toBe(mockedValue);
        });
    });

    it('pageChange must be emitted every time nzPageIndexChange emits from nz-select', () => {
        const nzPagElem = fixture.debugElement.query(By.css('nz-pagination'));
        const page = 2;

        nzPagElem.triggerEventHandler('nzPageIndexChange', page);
        fixture.detectChanges();

        expect(component.pageChangeSpy).toHaveBeenCalled();
    });

    it('pageSizeChange must be emitted every time valueChange emits from spy-select', () => {
        component.total = 1;
        fixture.detectChanges();

        const nzSelectElem = fixture.debugElement.query(By.css('spy-select'));
        const page = 2;

        nzSelectElem.triggerEventHandler('valueChange', page);
        fixture.detectChanges();

        expect(component.pageSizeChangeSpy).toHaveBeenCalled();
    });

    it('spy-select should not be rendered if total value is 0', () => {
        component.total = 0;
        fixture.detectChanges();

        const nzSelectElem = fixture.debugElement.query(By.css('spy-select'));

        expect(nzSelectElem).toBeFalsy();
    });
});
