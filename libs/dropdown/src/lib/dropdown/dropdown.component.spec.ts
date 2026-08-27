import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzDropdownModule, NzDropdownDirective } from 'ng-zorro-antd/dropdown';
import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
    let fixture: ComponentFixture<DropdownComponent>;

    const q = (sel: string) => fixture.debugElement.query(By.css(sel));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DropdownComponent],
            imports: [NzDropdownModule],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();

        fixture = TestBed.createComponent(DropdownComponent);
        fixture.detectChanges();
    });

    it('renders span[nz-dropdown] and nz-dropdown-menu', () => {
        const spanElem = q('span[nz-dropdown]');
        const menuElem = q('nz-dropdown-menu');
        expect(spanElem).toBeTruthy();
        expect(menuElem).toBeTruthy();
    });

    describe('Inputs bound to span', () => {
        it('placement -> nzPlacement', () => {
            fixture.componentRef.setInput('placement', 'bottomLeft');
            fixture.detectChanges();
            const dir = q('span[nz-dropdown]').injector.get(NzDropdownDirective);
            expect(dir.nzPlacement).toBe('bottomLeft');
        });

        it('disabled -> nzDisabled', () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();
            const dir = q('span[nz-dropdown]').injector.get(NzDropdownDirective);
            expect(dir.nzDisabled).toBe(true);
        });

        it('visible -> nzVisible', () => {
            fixture.componentRef.setInput('visible', true);
            fixture.detectChanges();
            const dir = q('span[nz-dropdown]').injector.get(NzDropdownDirective);
            expect(dir.nzVisible).toBe(true);
        });

        it('trigger -> nzTrigger', () => {
            fixture.componentRef.setInput('trigger', 'hover');
            fixture.detectChanges();
            const dir = q('span[nz-dropdown]').injector.get(NzDropdownDirective);
            expect(dir.nzTrigger).toBe('hover');
        });
    });

    describe('Keyboard operation of the trigger', () => {
        // `nz-dropdown` opens on a native click or on mouseenter, and a keyboard produces neither
        // on a `<span>` host — so without these handlers the trigger is mouse-only.
        it('opens on Enter and closes again', () => {
            const trigger = q('span[nz-dropdown]');

            trigger.triggerEventHandler('keydown.enter', new KeyboardEvent('keydown', { key: 'Enter' }));
            fixture.detectChanges();
            expect(fixture.componentInstance.visible).toBe(true);

            trigger.triggerEventHandler('keydown.enter', new KeyboardEvent('keydown', { key: 'Enter' }));
            fixture.detectChanges();
            expect(fixture.componentInstance.visible).toBe(false);
        });

        it('opens on Space, and suppresses the page scroll Space would otherwise cause', () => {
            const event = new KeyboardEvent('keydown', { key: ' ', cancelable: true });

            q('span[nz-dropdown]').triggerEventHandler('keydown.space', event);
            fixture.detectChanges();

            expect(fixture.componentInstance.visible).toBe(true);
            expect(event.defaultPrevented).toBe(true);
        });

        it('does nothing on Enter while disabled', () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();

            q('span[nz-dropdown]').triggerEventHandler('keydown.enter', new KeyboardEvent('keydown', { key: 'Enter' }));
            fixture.detectChanges();

            expect(fixture.componentInstance.visible).toBe(false);
        });

        it('is in the tab order, and out of it while disabled', () => {
            const triggerEl: HTMLElement = q('span[nz-dropdown]').nativeElement;
            expect(triggerEl.getAttribute('tabindex')).toBe('0');
            expect(triggerEl.getAttribute('role')).toBe('button');

            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();

            expect(triggerEl.getAttribute('tabindex')).toBe('-1');
            expect(triggerEl.getAttribute('aria-disabled')).toBe('true');
        });
    });

    it('emits visibleChange when nzVisibleChange fires', () => {
        const emitSpy = jest.spyOn(fixture.componentInstance.visibleChange, 'emit');
        q('span[nz-dropdown]').triggerEventHandler('nzVisibleChange', false);
        fixture.detectChanges();
        expect(emitSpy).toHaveBeenCalledWith(false);
    });

    describe('Keyboard operation of a menu item', () => {
        // The menu is a CDK overlay on `document.body`, outside the fixture, and `nz-dropdown`
        // debounces its open/close by 150ms (`auditTime`), hence the queries and the waits below.
        const settle = async () => {
            await new Promise((resolve) => setTimeout(resolve, 250));
            fixture.detectChanges();
        };

        const openWithOneItem = async () => {
            fixture.componentRef.setInput('items', [{ action: 'mockAction', title: 'Item' }]);
            fixture.componentRef.setInput('visible', true);
            fixture.detectChanges();
            await settle();

            return document.querySelector('li[nz-menu-item]') as HTMLElement;
        };

        const pressEnter = (element: HTMLElement) =>
            element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

        it('emits actionTriggered on Enter', async () => {
            const itemEl = await openWithOneItem();
            const emitSpy = jest.spyOn(fixture.componentInstance.actionTriggered, 'emit');

            pressEnter(itemEl);
            fixture.detectChanges();

            expect(emitSpy).toHaveBeenCalledWith('mockAction');
        });

        it('closes the dropdown on Enter, exactly as a pointer activation does', async () => {
            // This is why `activateItem` dispatches the item's own click instead of emitting
            // `actionTriggered` directly: closing is `nz-menu-item`'s host click listener feeding
            // `descendantMenuItemClick$`, so an implementation that skipped the click would leave
            // the menu open for keyboard users only.
            const itemEl = await openWithOneItem();

            pressEnter(itemEl);
            fixture.detectChanges();
            await settle();

            expect(fixture.componentInstance.visible).toBe(false);
        });
    });
});
