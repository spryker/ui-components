import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs';

import { DrawerService } from '../drawer.service';
import { DrawerComponent, DrawerComponentInputs } from './drawer.component';

@Component({
    selector: 'spy-test',
    template: `
        <spy-drawer
            [isOpen]="isOpen"
            [closeable]="closeable"
            [resizable]="resizable"
            [width]="width"
            [hasBackdrop]="hasBackdrop"
            (isOpenChange)="isOpenChange($event)"
            (closed)="closed()"
        >
            <ng-template let-drawerRef> Content </ng-template>
        </spy-drawer>
    `,
})
class TestComponent extends DrawerComponentInputs {
    isOpenChange = jest.fn<boolean, any[]>();
    closed = jest.fn();
}

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
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let service: MockDrawerService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, DrawerComponent],
            providers: [
                {
                    provide: DrawerService,
                    useExisting: MockDrawerService,
                },
                MockDrawerService,
            ],
            teardown: { destroyAfterEach: false },
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(MockDrawerService);
    });

    it('should render `spy-drawer` component', () => {
        fixture.detectChanges();
        const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

        expect(drawerElem).toBeTruthy();
    });

    it('should call `openTemplate` method from drawerService if `open` method has been triggered', () => {
        fixture.detectChanges();
        const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

        drawerElem.componentInstance.open();

        expect(service.openTemplate).toHaveBeenCalledWith(
            drawerElem.componentInstance.templateRef,
            drawerElem.componentInstance,
        );
    });

    it('should call `maximize` method from `drawerRef` when `maximize` method  has been triggered if drawer was opened', () => {
        fixture.detectChanges();
        const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

        drawerElem.componentInstance.open();
        drawerElem.componentInstance.maximize();

        expect(service.drawerRef.maximize).toHaveBeenCalled();
    });

    it('should call `minimize` method from `drawerRef` when `minimize` method  has been triggered if drawer was opened', () => {
        fixture.detectChanges();
        const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

        drawerElem.componentInstance.open();
        drawerElem.componentInstance.minimize();

        expect(service.drawerRef.minimize).toHaveBeenCalled();
    });

    it('should change `isOpen` prop to `true` when `open` method has been triggered', () => {
        fixture.detectChanges();
        const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

        drawerElem.componentInstance.open();

        expect(drawerElem.componentInstance.isOpen).toBe(true);
    });

    it('should emit @Output(isOpenChange) with `true` parameter when `open` method  has been triggered', () => {
        fixture.detectChanges();
        const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

        drawerElem.componentInstance.open();

        expect(component.isOpenChange).toHaveBeenCalledWith(true);
    });

    it('should change `isOpen` prop to `false` when `close` method  has been triggered if drawer was opened', () => {
        fixture.detectChanges();
        const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

        drawerElem.componentInstance.open();
        drawerElem.componentInstance.close();

        expect(drawerElem.componentInstance.isOpen).toBe(false);
    });

    it('should emit @Output(isOpenChange) with `false` parameter when `close` method  has been triggered if drawer was opened', () => {
        fixture.detectChanges();
        const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

        drawerElem.componentInstance.open();
        drawerElem.componentInstance.close();

        expect(component.isOpenChange).toHaveBeenCalledWith(false);
    });

    it('should emit @Output(closed) when `close` method  has been triggered if drawer was opened', () => {
        fixture.detectChanges();
        const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

        drawerElem.componentInstance.open();
        drawerElem.componentInstance.close();

        expect(component.closed).toHaveBeenCalled();
    });

    it('should call `close` method from `drawerRef` and assign `drawerRef` to `undefined` when `close` method  has been triggered if drawer was opened', () => {
        fixture.detectChanges();
        const drawerElem = fixture.debugElement.query(By.css('spy-drawer'));

        drawerElem.componentInstance.open();
        drawerElem.componentInstance.close();

        expect(service.drawerRef.close).toHaveBeenCalled();
        expect(drawerElem.componentInstance.drawerRef).toBeFalsy();
    });
});
