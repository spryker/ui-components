import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { UserMenuLinkComponent, UserMenuLinkType } from './user-menu-link.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';

class MockUserMenuComponent {
    isPopoverOpened = false;
}

describe('UserMenuLinkComponent', () => {
    let userMenuComponent: MockUserMenuComponent;

    const { testModule, createComponent } = getTestingForComponent(UserMenuLinkComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            providers: [
                {
                    provide: UserMenuComponent,
                    useExisting: MockUserMenuComponent,
                },
                MockUserMenuComponent,
            ],
            teardown: { destroyAfterEach: false },
        });

        userMenuComponent = TestBed.inject(MockUserMenuComponent);
    });

    it('should render <spy-user-menu-link>', async () => {
        const host = await createComponentWrapper(createComponent);
        const userMenuItemElem = host.queryCss('spy-user-menu-link');

        expect(userMenuItemElem).toBeTruthy();
    });

    it('should render <spy-user-menu-link> with `type` input', async () => {
        const host = await createComponentWrapper(createComponent, { type: UserMenuLinkType.Danger });
        const userMenuLinkElem = host.queryCss('spy-user-menu-link');

        expect(userMenuLinkElem.classes['spy-user-menu-link--danger']).toBe(true);
    });

    it('click event should set parent `isPopoverOpened` to false', async () => {
        const host = await createComponentWrapper(createComponent);
        const userMenuLinkElem = host.queryCss('spy-user-menu-link');

        userMenuLinkElem.triggerEventHandler('click', null);
        host.detectChanges();

        expect(userMenuComponent.isPopoverOpened).toBe(false);
    });
});
