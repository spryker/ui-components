import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { CollapsibleComponent } from './collapsible.component';

describe('CollapsibleComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(CollapsibleComponent, {
        ngModule: {
            imports: [NzCollapseModule, NoopAnimationsModule],
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

    it('template must render nz-collapse-panel from Ant Design inside nz-collapse component', async () => {
        const host = await createComponentWrapper(createComponent);
        const collapseElem = host.queryCss('nz-collapse');

        expect(collapseElem).toBeTruthy();

        const panelElem = host.queryCss('nz-collapse-panel');

        expect(panelElem).toBeTruthy();
    });

    it('should render icon component', async () => {
        const mockTitle = 'title-icon';
        const host = await createComponentWrapper(createComponent, { titleIcon: mockTitle });
        const collapsibleHeaderElem = host.queryCss('.ant-collapse-header');
        const headerIcon = collapsibleHeaderElem.query(By.css('spy-icon'));

        expect(headerIcon).toBeTruthy();
        expect(headerIcon.properties.name).toBe(mockTitle);
    });

    describe('Toggling functionality', () => {
        it('Should change active on opposite by toggle method', async () => {
            const host = await createComponentWrapper(createComponent);

            host.component.toggle();
            host.detectChanges();

            expect(host.component.active).toBeTruthy();

            host.component.toggle();
            host.detectChanges();

            expect(host.component.active).toBeFalsy();
        });

        it('Should emit event on collapsible header click', async () => {
            const host = await createComponentWrapper(createComponent);
            const collapsibleHeaderElem = host.queryCss('.ant-collapse-header');
            const callback = jest.fn();

            host.component.activeChange.subscribe(callback);
            // `triggerEventHandler` doesn't work here (maybe Ant Design issue) that is why we are using native click event.
            collapsibleHeaderElem.nativeElement.click();
            host.detectChanges();

            expect(callback).toHaveBeenCalledWith(true);

            collapsibleHeaderElem.nativeElement.click();
            host.detectChanges();

            expect(callback).toHaveBeenCalledWith(false);
        });

        it('Should emit event on collapsible header by `updateActive()` method call', async () => {
            const host = await createComponentWrapper(createComponent);
            const callback = jest.fn();

            host.component.activeChange.subscribe(callback);
            host.component.updateActive(true);
            host.detectChanges();

            expect(callback).toHaveBeenCalledWith(true);

            host.component.updateActive(false);
            host.detectChanges();

            expect(callback).toHaveBeenCalledWith(false);
        });
    });
});
