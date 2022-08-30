import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(PaginationComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('template must render nz-pagination from Ant Design and spy-select', async () => {
        const host = await createComponent({ total: 1 }, true);
        const nzPagElem = host.queryCss('nz-pagination');
        const selectElem = host.queryCss('spy-select');

        expect(nzPagElem).toBeTruthy();
        expect(selectElem).toBeTruthy();
    });

    describe('Inputs must be bound to nz-pagination', () => {
        it('should bind total to nzTotal of nz-pagination', async () => {
            const mockedValue = 2;
            const host = await createComponent({ total: mockedValue }, true);
            const nzPagElem = host.queryCss('nz-pagination');

            expect(nzPagElem.properties.nzTotal).toBe(mockedValue);
        });

        it('should bind page to nzPageIndex of nz-pagination', async () => {
            const mockedValue = 2;
            const host = await createComponent({ page: mockedValue }, true);
            const nzPagElem = host.queryCss('nz-pagination');

            expect(nzPagElem.properties.nzPageIndex).toBe(mockedValue);
        });

        it('should bind pageSize to nzPageSize of nz-pagination', async () => {
            const mockedValue = [10, 20, 50];
            const host = await createComponent({ pageSize: mockedValue } as any, true);
            const nzPagElem = host.queryCss('nz-pagination');

            expect(nzPagElem.properties.nzPageSize).toBe(mockedValue);
        });

        it('should bind hideOnSinglePage to nzHideOnSinglePage of nz-pagination', async () => {
            const mockedValue = true;
            const host = await createComponent({ hideOnSinglePage: true }, true);
            const nzPagElem = host.queryCss('nz-pagination');

            expect(nzPagElem.properties.nzHideOnSinglePage).toBe(mockedValue);
        });
    });

    it('pageChange must be emitted every time nzPageIndexChange emits from nz-select', async () => {
        const page = 2;
        const host = await createComponent({}, true);
        const nzPagElem = host.queryCss('nz-pagination');

        nzPagElem.triggerEventHandler('nzPageIndexChange', page);
        host.detectChanges();

        expect(host.hostComponent.pageChange).toHaveBeenCalled();
    });

    it('pageSizeChange must be emitted every time valueChange emits from spy-select', async () => {
        const page = 2;
        const host = await createComponent({ total: 1 }, true);
        const nzSelectElem = host.queryCss('spy-select');

        nzSelectElem.triggerEventHandler('valueChange', page);
        host.detectChanges();

        expect(host.hostComponent.pageSizeChange).toHaveBeenCalled();
    });

    it('spy-select should not be rendered if total value is 0', async () => {
        const host = await createComponent({ total: 0 }, true);
        const nzSelectElem = host.queryCss('spy-select');

        expect(nzSelectElem).toBeFalsy();
    });
});
