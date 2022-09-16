import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { LabelComponent } from './label.component';

describe('LabelComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(LabelComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
        projectContent: 'Content',
    });

    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        }),
    );

    it('should render label', async () => {
        const host = await createComponentWrapper(createComponent);
        const labelElem = host.queryCss('label');

        expect(labelElem).toBeTruthy();
    });

    it('should bound input for to label', async () => {
        const providedContent = 'id';
        const host = await createComponentWrapper(createComponent, { for: providedContent });
        const labelElem = host.queryCss('label');

        expect(labelElem.properties.htmlFor).toEqual(providedContent);
    });

    it('should project content inside label', async () => {
        const host = await createComponentWrapper(createComponent);
        const labelElem = host.queryCss('label');

        expect(labelElem.nativeElement.textContent).toMatch('Content');
    });
});
