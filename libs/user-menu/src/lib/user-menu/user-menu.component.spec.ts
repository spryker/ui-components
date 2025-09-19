import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconUserModule } from '@spryker/icon/icons';
import { UserMenuComponent } from './user-menu.component';

@Component({
    standalone: false,
    selector: 'host-cmp',
    template: ` <spy-user-menu [icon]="icon"></spy-user-menu> `,
})
class HostCmp {
    @Input() icon?: string;
}

describe('UserMenuComponent', () => {
    let fixture: any;
    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HostCmp, UserMenuComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(HostCmp);
        fixture.detectChanges();
    });

    it('should render <spy-user-menu>', async () => {
        expect(q('spy-user-menu')).toBeTruthy();
    });

    it('should render <spy-user-menu> with `icon` input', async () => {
        fixture.componentRef.setInput('icon', IconUserModule.icon);
        fixture.detectChanges();

        const iconEl = q('spy-icon');
        expect(iconEl).toBeTruthy();
        expect(iconEl.properties.name).toBe(IconUserModule.icon);
    });

    it('should render <spy-popover>', async () => {
        expect(q('spy-popover')).toBeTruthy();
    });

    it('should render <button> with `trigger` attribute', async () => {
        const btn = q('button');
        expect(btn).toBeTruthy();
        expect(btn.attributes.trigger).toBeDefined();
    });

    it('should add active class to <button> when popover is opened', async () => {
        const pop = q('spy-popover');
        const btn = q('button');

        pop.triggerEventHandler('openChange', true);
        fixture.detectChanges();

        expect(btn.classes['spy-user-menu__action--active']).toBeTruthy();
    });
});
