import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IconUserModule } from '@spryker/icon/icons';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { UserMenuComponent } from './user-menu.component';

describe('UserMenuComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(UserMenuComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
    });

    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        }),
    );

    it('should render <spy-user-menu>', async () => {
        const host = await createComponentWrapper(createComponent);
        const userMenuElem = host.queryCss('spy-user-menu');

        expect(userMenuElem).toBeTruthy();
    });

    it('should render <spy-user-menu> with `icon` input', async () => {
        const host = await createComponentWrapper(createComponent, { icon: IconUserModule.icon });
        const userMenuIconElem = host.queryCss('spy-icon');

        expect(userMenuIconElem).toBeTruthy();
        expect(userMenuIconElem.properties.name).toBe(IconUserModule.icon);
    });

    it('should render <spy-popover>', async () => {
        const host = await createComponentWrapper(createComponent);
        const popoverElem = host.queryCss('spy-popover');

        expect(popoverElem).toBeTruthy();
    });

    it('should render <button> with `trigger` attribute', async () => {
        const host = await createComponentWrapper(createComponent);
        const buttonElem = host.queryCss('button');

        expect(buttonElem).toBeTruthy();
        expect(buttonElem.attributes.trigger).toBeDefined();
    });

    it('should add active class to <button> when popover is opened', async () => {
        const host = await createComponentWrapper(createComponent);
        const userMenuElem = host.queryCss('spy-popover');
        const buttonElem = host.queryCss('button');

        userMenuElem.triggerEventHandler('openChange', true);
        host.detectChanges();

        expect(buttonElem.classes['spy-user-menu__action--active']).toBeTruthy();
    });
});
