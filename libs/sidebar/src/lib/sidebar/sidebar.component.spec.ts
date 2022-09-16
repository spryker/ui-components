import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createComponentWrapper } from '@spryker/internal-utils';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(SidebarComponent, {
        ngModule: {
            imports: [NzLayoutModule],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should create', async () => {
        const host = await createComponentWrapper(createComponent);

        expect(host.component).toBeTruthy();
    });

    it('should render trigger button', async () => {
        const host = await createComponentWrapper(createComponent);
        const triggerButton = host.queryCss('.ant-layout-sider-trigger');

        expect(triggerButton).toBeTruthy();
    });

    it('should render icon into the button', async () => {
        const host = await createComponentWrapper(createComponent);
        const triggerButton = host.queryCss('.ant-layout-sider-trigger');
        const iconComponent = triggerButton.query(By.css('spy-icon'));

        expect(iconComponent).toBeTruthy();
        expect(iconComponent.properties.name).toEqual('arrow-down');
    });

    it('should trigger sidebar', async () => {
        const host = await createComponentWrapper(createComponent);

        host.component.updateCollapse(true);
        host.detectChanges();

        expect(host.hostComponent.collapsedChange).toHaveBeenCalledWith(true);
        expect(host.component.collapsed).toBeTruthy();

        host.component.updateCollapse(false);
        host.detectChanges();

        expect(host.hostComponent.collapsedChange).toHaveBeenCalledWith(false);
        expect(host.component.collapsed).toBeFalsy();
    });
});
