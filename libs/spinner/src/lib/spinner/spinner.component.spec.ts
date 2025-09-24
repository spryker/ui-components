import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { SpinnerComponent } from './spinner.component';
import { SpinnerSize } from '../types';

describe('SpinnerComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(SpinnerComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
        projectContent: 'Content',
    });

    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        }),
    );

    it('should render spinner with special inputs properties', async () => {
        const inputs: SpinnerComponent = {
            delay: 100,
            size: SpinnerSize.Large,
            isSpinning: true,
            overlayContent: true,
        };
        const host = await createComponentWrapper(createComponent, inputs);
        const spinner = host.queryCss('nz-spin');

        expect(spinner).toBeTruthy();
        expect(spinner.properties.nzDelay).toBe(inputs.delay);
        expect(spinner.properties.nzSize).toBe(inputs.size);
        expect(spinner.properties.nzSpinning).toBe(inputs.isSpinning);
        expect(spinner.properties.nzSimple).toBe(inputs.overlayContent);
    });

    it('should render spinner content', async () => {
        const host = await createComponentWrapper(createComponent);
        const spinner = host.queryCss('nz-spin');

        expect(spinner).toBeTruthy();
        expect(spinner.nativeElement.textContent).toContain('Content');
    });
});
