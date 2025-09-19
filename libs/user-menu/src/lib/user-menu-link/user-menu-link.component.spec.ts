import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserMenuLinkComponent, UserMenuLinkType } from './user-menu-link.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';

class MockUserMenuComponent {
    isPopoverOpened = false;
}

@Component({
    standalone: false,
    selector: 'host-cmp',
    template: `<spy-user-menu-link [type]="type">Link</spy-user-menu-link>`,
})
class HostCmp {
    @Input() type = UserMenuLinkType.Default;
}

describe('UserMenuLinkComponent', () => {
    let fixture: any;
    let parent: MockUserMenuComponent;
    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HostCmp, UserMenuLinkComponent],
            providers: [MockUserMenuComponent, { provide: UserMenuComponent, useExisting: MockUserMenuComponent }],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        parent = TestBed.inject(MockUserMenuComponent);
        fixture = TestBed.createComponent(HostCmp);
        fixture.detectChanges();
    });

    it('should render <spy-user-menu-link>', async () => {
        expect(q('spy-user-menu-link')).toBeTruthy();
    });

    it('should render <spy-user-menu-link> with `type` input', async () => {
        fixture.componentRef.setInput('type', UserMenuLinkType.Danger);
        fixture.detectChanges();

        const el = q('spy-user-menu-link');
        expect(el.classes['spy-user-menu-link--danger']).toBe(true);
    });

    it('click event should set parent `isPopoverOpened` to false', async () => {
        const el = q('spy-user-menu-link');
        el.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(parent.isPopoverOpened).toBe(false);
    });
});
