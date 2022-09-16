import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { TabComponent } from './tab.component';

describe('TabComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(TabComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
    });

    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        }),
    );

    describe('component.hasWarningChange', () => {
        it('should emit hasWarning change on hasWarningChange', async () => {
            const host = await createComponentWrapper(createComponent, { hasWarning: true });

            expect(host.hostComponent.hasWarningChange).toHaveBeenCalledWith(true);
        });
    });
});
