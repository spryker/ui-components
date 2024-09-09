import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { PopoverComponent, PopoverPosition } from './popover.component';

describe('PopoverComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(PopoverComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
    });

    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        }),
    );

    it('should render <spy-popover>', async () => {
        const host = await createComponentWrapper(createComponent);
        const popoverElem = host.queryCss('span[nz-popover]');

        expect(popoverElem).toBeTruthy();
    });

    it('should render <spy-popover> with changed position', async () => {
        const host = await createComponentWrapper(createComponent, { position: PopoverPosition.Top });
        const popoverElem = host.queryCss('span[nz-popover]');

        expect(popoverElem.properties.nzPopoverPlacement).toBe(PopoverPosition.Top);
    });
});
