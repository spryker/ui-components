import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
    let fixture: any;
    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PaginationComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(PaginationComponent);
        fixture.detectChanges();
    });

    it('template must render nz-pagination from Ant Design and spy-select', () => {
        fixture.componentRef.setInput('total', 1);
        fixture.detectChanges();

        const nzPagElem = q('nz-pagination');
        const selectElem = q('spy-select');

        expect(nzPagElem).toBeTruthy();
        expect(selectElem).toBeTruthy();
    });

    describe('Inputs must be bound to nz-pagination', () => {
        it('should bind total to nzTotal of nz-pagination', () => {
            const mockedValue = 2;
            fixture.componentRef.setInput('total', mockedValue);
            fixture.detectChanges();

            const nzPagElem = q('nz-pagination');
            expect(nzPagElem.nativeNode.nzTotal).toBe(mockedValue);
        });

        it('should bind page to nzPageIndex of nz-pagination', () => {
            const mockedValue = 2;
            fixture.componentRef.setInput('page', mockedValue);
            fixture.detectChanges();

            const nzPagElem = q('nz-pagination');
            expect(nzPagElem.nativeNode.nzPageIndex).toBe(mockedValue);
        });

        it('should bind pageSize to nzPageSize of nz-pagination', () => {
            const mockedValue = [10, 20, 50];
            fixture.componentRef.setInput('pageSize', mockedValue as any);
            fixture.detectChanges();

            const nzPagElem = q('nz-pagination');
            expect(nzPagElem.nativeNode.nzPageSize).toEqual(mockedValue);
        });

        it('should bind hideOnSinglePage to nzHideOnSinglePage of nz-pagination', () => {
            fixture.componentRef.setInput('hideOnSinglePage', true);
            fixture.detectChanges();

            const nzPagElem = q('nz-pagination');
            expect(nzPagElem.nativeNode.nzHideOnSinglePage).toBe(true);
        });
    });

    it('pageChange must be emitted every time nzPageIndexChange emits from nz-select', () => {
        const nzPagDe = q('nz-pagination');
        const emitSpy = jest.spyOn(fixture.componentInstance.pageChange, 'emit');

        nzPagDe.triggerEventHandler('nzPageIndexChange', 2);
        fixture.detectChanges();

        expect(emitSpy).toHaveBeenCalled();
    });

    it('pageSizeChange must be emitted every time valueChange emits from spy-select', () => {
        fixture.componentRef.setInput('total', 1);
        fixture.detectChanges();

        const selectDe = q('spy-select');
        const emitSpy = jest.spyOn(fixture.componentInstance.pageSizeChange, 'emit');

        selectDe.triggerEventHandler('valueChange', 2);
        fixture.detectChanges();
        expect(emitSpy).toHaveBeenCalledWith(2);

        const mockedMultipleValue = ['5', '20'];
        selectDe.triggerEventHandler('valueChange', mockedMultipleValue);
        fixture.detectChanges();
        expect(emitSpy).toHaveBeenCalledWith(mockedMultipleValue[0]);
    });

    it('placeholder should be bounded to spy-select', () => {
        const mockedPlaceholder = 'test placeholder';
        fixture.componentRef.setInput('total', 1);
        fixture.componentRef.setInput('placeholder', mockedPlaceholder);
        fixture.detectChanges();

        const selectDe = q('spy-select');
        expect(selectDe.nativeNode.placeholder).toBe(mockedPlaceholder);
    });

    it('spy-select should not be rendered if total value is 0', () => {
        fixture.componentRef.setInput('total', 0);
        fixture.detectChanges();

        const nzSelectElem = q('spy-select');
        expect(nzSelectElem).toBeFalsy();
    });
});
