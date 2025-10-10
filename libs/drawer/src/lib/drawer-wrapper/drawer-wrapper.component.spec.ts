import { CommonModule } from '@angular/common';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DrawerWrapperComponent } from './drawer-wrapper.component';

@Component({
    standalone: false,
    template: `
        <spy-drawer-wrapper
            class="host-marker"
            [closeable]="closeable"
            [resizable]="resizable"
            [width]="width"
            (closed)="onClosed()"
        >
            Content
        </spy-drawer-wrapper>
    `,
})
class TestHostComponent {
    @Input() closeable = false;
    @Input() resizable = false;
    @Input() width: string | undefined;

    onClosed = jest.fn();
}

describe('DrawerWrapperComponent (no orchestrator)', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    const query = (selector: string) => fixture.debugElement.query(By.css(selector));
    const queryAll = (selector: string) => fixture.debugElement.queryAll(By.css(selector));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DrawerWrapperComponent, TestHostComponent],
            imports: [CommonModule],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('renders actions and content containers', () => {
        const contentElem = query('.spy-drawer-wrapper__content');
        const actionsElem = query('.spy-drawer-wrapper__actions');

        expect(contentElem).toBeTruthy();
        expect(actionsElem).toBeTruthy();
    });

    it('projects content into `.spy-drawer-wrapper__content`', () => {
        const contentElem = query('.spy-drawer-wrapper__content');
        expect(contentElem.nativeElement.textContent).toContain('Content');
    });

    it('shows close button when `closeable=true`', () => {
        fixture.componentInstance.closeable = true;
        fixture.detectChanges();

        const btn = query('.spy-drawer-wrapper__action--close');
        expect(btn).toBeTruthy();
    });

    it('hides close button when `closeable=false`', () => {
        fixture.componentInstance.closeable = false;
        fixture.detectChanges();

        const btn = query('.spy-drawer-wrapper__action--close');
        expect(btn).toBeFalsy();
    });

    it('shows resize button when `resizable=true`', () => {
        fixture.componentInstance.resizable = true;
        fixture.detectChanges();

        const btn = query('.spy-drawer-wrapper__action--resize');
        expect(btn).toBeTruthy();
    });

    it('hides resize button when `resizable=false`', () => {
        fixture.componentInstance.resizable = false;
        fixture.detectChanges();

        const btn = query('.spy-drawer-wrapper__action--resize');
        expect(btn).toBeFalsy();
    });

    it('binds `[width]` to host element style', () => {
        const width = '20%';
        fixture.componentInstance.width = width;
        fixture.detectChanges();

        const hostEl: HTMLElement = query('.spy-drawer-wrapper').nativeElement;
        expect(hostEl.style.width).toBe(width);
    });

    it('toggles maximize on resize button click and adjusts width', () => {
        const initial = '20%';
        fixture.componentInstance.width = initial;
        fixture.componentInstance.resizable = true;
        fixture.detectChanges();

        const hostDe = query('.spy-drawer-wrapper');
        const hostEl: HTMLElement = hostDe.nativeElement;
        const resizeBtn = query('.spy-drawer-wrapper__action--resize');

        expect(hostEl.style.width).toBe(initial);

        resizeBtn.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(hostEl.classList).toContain('spy-drawer-wrapper--maximized');
        expect(hostEl.style.width).toBe('100%');

        resizeBtn.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(hostEl.classList).not.toContain('spy-drawer-wrapper--maximized');
        expect(hostEl.style.width).toBe(initial);
    });

    it('emits `closed` when close button clicked', () => {
        fixture.componentInstance.closeable = true;
        fixture.detectChanges();

        const closeBtn = query('.spy-drawer-wrapper__action--close');
        closeBtn.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(fixture.componentInstance.onClosed).toHaveBeenCalled();
    });
});
