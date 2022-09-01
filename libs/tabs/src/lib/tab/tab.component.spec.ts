import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { TabComponent } from './tab.component';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

describe('TabComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(TabComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
        projectContent: 'Content',
    });

    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        }),
    );

    describe('component.hasWarningChange', () => {
        it('should emit hasWarningChange on hasWarningChange', async () => {
            const host = await createComponent({ hasWarning: false }, true);

            host.setInputs({ hasWarning: true }, true);

            expect(host.hostComponent.hasWarningChange).toHaveBeenCalledWith(true);
        });
    });
});
