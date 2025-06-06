import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(LogoComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
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

    it('should change image modifier', async () => {
        const logoImageModifier = 'full';
        const host = await createComponentWrapper(createComponent, { size: logoImageModifier });
        const logoElement = host.queryCss(`.spy-logo--${logoImageModifier}`);

        expect(logoElement).toBeTruthy();
    });
});
