import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { HeadlineComponent, Level } from './headline.component';

describe('HeadlineComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(HeadlineComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
        projectContent: `
            <div class="default-content"></div>
            <div actions class="actions-content"></div>
        `,
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should render default content in the `.spy-headline__col--heading` element', async () => {
        const host = await createComponentWrapper(createComponent);
        const headingContentElement = host.queryCss('.spy-headline__col--heading .default-content');

        expect(headingContentElement).toBeTruthy();
    });

    it('should render actions content in the last `.spy-headline__col` element', async () => {
        const host = await createComponentWrapper(createComponent);
        const actionsContentElement = host.queryCss('.spy-headline__col:last-child .actions-content');

        expect(actionsContentElement).toBeTruthy();
    });

    it('should render `.spy-headline__title` element with headline level', async () => {
        const host = await createComponentWrapper(createComponent, { level: Level.H3 });
        const titleElement = host.queryCss('.spy-headline__title');

        expect(titleElement.properties.className).toBe(`spy-headline__title spy-headline__title--${Level.H3}`);
    });
});
