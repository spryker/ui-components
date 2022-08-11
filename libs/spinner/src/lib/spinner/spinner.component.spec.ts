import { TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SpinnerSize } from '../types';

describe('SpinnerComponent', () => {
    const spinnerContent = 'Content for loading';

    const { testModule, createComponent } = getTestingForComponent(SpinnerComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
        projectContent: spinnerContent,
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

        const host = await createComponent(inputs, true);
        const spinner = host.queryCss('nz-spin');
        expect(spinner).toBeTruthy();

        expect(spinner?.properties['nzDelay']).toBe(inputs.delay);
        expect(spinner?.properties['nzSize']).toBe(inputs.size);
        expect(spinner?.properties['nzSpinning']).toBe(inputs.isSpinning);
        expect(spinner?.properties['nzSimple']).toBe(inputs.overlayContent);
    });

    it('should render spinner content', async () => {
        const host = await createComponent({}, true);
        const spinner = host.queryCss('nz-spin');
        expect(spinner).toBeTruthy();
        expect((spinner?.nativeElement as HTMLElement).textContent).toContain(spinnerContent);
    });
});
