import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { DrawerComponent } from './drawer.component';
import { DrawerService } from '../drawer.service';

class MockDrawerRef {
    afterClosed$ = new ReplaySubject<void>();
    close = jest.fn();
    maximize = jest.fn();
    minimize = jest.fn();
    afterClosed = jest.fn().mockReturnValue(this.afterClosed$.asObservable());
}

class MockDrawerService {
    drawerRef = new MockDrawerRef();
    openTemplate = jest.fn().mockReturnValue(this.drawerRef);
}

describe('DrawerComponent', () => {
    let service: MockDrawerService;

    const { testModule, createComponent } = getTestingForComponent(DrawerComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
        projectContent: ` <ng-template let-drawerRef> Content </ng-template> `,
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            providers: [
                {
                    provide: DrawerService,
                    useExisting: MockDrawerService,
                },
                MockDrawerService,
            ],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(MockDrawerService);
    });

    it('should render `spy-drawer` component', async () => {
        const host = await createComponent({}, true);
        const drawerElem = host.queryCss('spy-drawer');

        expect(drawerElem).toBeTruthy();
    });

    it('should call `openTemplate` method from drawerService if `open` method has been triggered', async () => {
        const host = await createComponent({}, true);
        const drawerElem = host.queryCss('spy-drawer');

        drawerElem.componentInstance.open();

        expect(service.openTemplate).toHaveBeenCalledWith(
            drawerElem.componentInstance.templateRef,
            drawerElem.componentInstance,
        );
    });

    it('should call `maximize` method from `drawerRef` when `maximize` method has been triggered if drawer was opened', async () => {
        const host = await createComponent({}, true);
        const drawerElem = host.queryCss('spy-drawer');

        drawerElem.componentInstance.open();
        drawerElem.componentInstance.maximize();

        expect(service.drawerRef.maximize).toHaveBeenCalled();
    });

    it('should call `minimize` method from `drawerRef` when `minimize` method has been triggered if drawer was opened', async () => {
        const host = await createComponent({}, true);
        const drawerElem = host.queryCss('spy-drawer');

        drawerElem.componentInstance.open();
        drawerElem.componentInstance.minimize();

        expect(service.drawerRef.minimize).toHaveBeenCalled();
    });

    it('should change `isOpen` prop to `true` when `open` method has been triggered', async () => {
        const host = await createComponent({}, true);
        const drawerElem = host.queryCss('spy-drawer');

        drawerElem.componentInstance.open();

        expect(drawerElem.componentInstance.isOpen).toBe(true);
    });

    it('should emit @Output(isOpenChange) with `true` parameter when `open` method has been triggered', async () => {
        const host = await createComponent({}, true);
        const drawerElem = host.queryCss('spy-drawer');

        drawerElem.componentInstance.open();

        expect(host.hostComponent.isOpenChange).toHaveBeenCalledWith(true);
    });

    it('should change `isOpen` prop to `false` when `close` method has been triggered if drawer was opened', async () => {
        const host = await createComponent({}, true);
        const drawerElem = host.queryCss('spy-drawer');

        drawerElem.componentInstance.open();
        drawerElem.componentInstance.close();

        expect(drawerElem.componentInstance.isOpen).toBe(false);
    });

    it('should emit @Output(isOpenChange) with `false` parameter when `close` method has been triggered if drawer was opened', async () => {
        const host = await createComponent({}, true);
        const drawerElem = host.queryCss('spy-drawer');

        drawerElem.componentInstance.open();
        drawerElem.componentInstance.close();

        expect(host.hostComponent.isOpenChange).toHaveBeenCalledWith(false);
    });

    it('should emit @Output(closed) when `close` method has been triggered if drawer was opened', async () => {
        const host = await createComponent({}, true);
        const drawerElem = host.queryCss('spy-drawer');

        drawerElem.componentInstance.open();
        drawerElem.componentInstance.close();

        expect(host.hostComponent.closed).toHaveBeenCalled();
    });

    it('should call `close` method from `drawerRef` and assign `drawerRef` to `undefined` when `close` method has been triggered if drawer was opened', async () => {
        const host = await createComponent({}, true);
        const drawerElem = host.queryCss('spy-drawer');

        drawerElem.componentInstance.open();
        drawerElem.componentInstance.close();

        expect(service.drawerRef.close).toHaveBeenCalled();
        expect(drawerElem.componentInstance.drawerRef).toBeFalsy();
    });
});
