import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs';
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

@Component({
    standalone: false,
    template: `
    <spy-drawer
      (isOpenChange)="isOpenChange($event)"
      (closed)="closed()"
    >
      <ng-template let-drawerRef>
        Content
      </ng-template>
    </spy-drawer>
  `,
})
class TestHostComponent {
    isOpenChange = jest.fn();
    closed = jest.fn();
}

describe('DrawerComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let service: MockDrawerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DrawerComponent, TestHostComponent],
            providers: [
                MockDrawerService,
                { provide: DrawerService, useExisting: MockDrawerService },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(MockDrawerService);
        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should render <spy-drawer> component', () => {
        const drawerDe = fixture.debugElement.query(By.css('spy-drawer'));
        expect(drawerDe).toBeTruthy();
    });

    it('should call openTemplate() on service when open() is triggered', () => {
        const drawerDe = fixture.debugElement.query(By.directive(DrawerComponent));
        const cmp = drawerDe.componentInstance as DrawerComponent;

        cmp.open();

        expect(service.openTemplate).toHaveBeenCalledWith(cmp.templateRef, cmp);
    });

    it('should call drawerRef.maximize() after open() then maximize()', () => {
        const cmp = fixture.debugElement.query(By.directive(DrawerComponent)).componentInstance as DrawerComponent;

        cmp.open();
        cmp.maximize();

        expect(service.drawerRef.maximize).toHaveBeenCalled();
    });

    it('should call drawerRef.minimize() after open() then minimize()', () => {
        const cmp = fixture.debugElement.query(By.directive(DrawerComponent)).componentInstance as DrawerComponent;

        cmp.open();
        cmp.minimize();

        expect(service.drawerRef.minimize).toHaveBeenCalled();
    });

    it('should set isOpen=true after open()', () => {
        const cmp = fixture.debugElement.query(By.directive(DrawerComponent)).componentInstance as DrawerComponent;

        cmp.open();

        expect(cmp.isOpen).toBe(true);
    });

    it('should emit isOpenChange(true) after open()', () => {
        const cmp = fixture.debugElement.query(By.directive(DrawerComponent)).componentInstance as DrawerComponent;

        cmp.open();

        expect(fixture.componentInstance.isOpenChange).toHaveBeenCalledWith(true);
    });

    it('should set isOpen=false after close() when opened', () => {
        const cmp = fixture.debugElement.query(By.directive(DrawerComponent)).componentInstance as DrawerComponent;

        cmp.open();
        cmp.close();

        expect(cmp.isOpen).toBe(false);
    });

    it('should emit isOpenChange(false) after close() when opened', () => {
        const cmp = fixture.debugElement.query(By.directive(DrawerComponent)).componentInstance as DrawerComponent;

        cmp.open();
        cmp.close();

        expect(fixture.componentInstance.isOpenChange).toHaveBeenCalledWith(false);
    });

    it('should emit closed after close() when opened', () => {
        const cmp = fixture.debugElement.query(By.directive(DrawerComponent)).componentInstance as DrawerComponent;

        cmp.open();
        cmp.close();

        expect(fixture.componentInstance.closed).toHaveBeenCalled();
    });

    it('should call drawerRef.close() and clear drawerRef on close() when opened', () => {
        const cmp = fixture.debugElement.query(By.directive(DrawerComponent)).componentInstance as DrawerComponent;

        cmp.open();
        cmp.close();

        expect(service.drawerRef.close).toHaveBeenCalled();
        expect((cmp as any).drawerRef).toBeFalsy();
    });
});
