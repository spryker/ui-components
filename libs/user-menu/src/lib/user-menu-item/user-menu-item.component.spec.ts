import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserMenuItemComponent } from './user-menu-item.component';

@Component({
    standalone: false,
    selector: 'host-cmp',
    template: `<spy-user-menu-item>Content</spy-user-menu-item>`,
})
class HostCmp {}

describe('UserMenuItemComponent', () => {
    let fixture: any;
    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HostCmp, UserMenuItemComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(HostCmp);
        fixture.detectChanges();
    });

    it('should render <spy-user-menu-item> with default slot', async () => {
        const el = q('spy-user-menu-item');
        expect(el).toBeTruthy();
        expect(el.nativeElement.textContent).toMatch('Content');
    });
});
