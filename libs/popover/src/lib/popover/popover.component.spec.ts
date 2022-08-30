import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { PopoverComponent, PopoverPosition } from '@spryker/popover';

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
        const host = await createComponent({}, true);
        const popoverElem = host.queryCss('span[nz-popover]');

        expect(popoverElem).toBeTruthy();
    });

    it('should render <spy-popover> with changed position', async () => {
        const host = await createComponent({ position: PopoverPosition.Top }, true);
        const popoverElem = host.queryCss('span[nz-popover]');

        expect(popoverElem?.properties.nzPopoverPlacement).toBe(PopoverPosition.Top);
    });
});
