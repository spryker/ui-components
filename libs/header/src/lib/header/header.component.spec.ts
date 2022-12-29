import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(HeaderComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
        projectContent: `<div class="test-content">Header Content</div>`,
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

    it('should render content', async () => {
        const host = await createComponentWrapper(createComponent);
        const headerContentElement = host.queryCss('.test-content');

        expect(headerContentElement).toBeTruthy();
    });
});
