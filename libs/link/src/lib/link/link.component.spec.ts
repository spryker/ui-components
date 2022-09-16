import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(LinkComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
        projectContent: `<div class="default-content"></div>`,
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should render <spy-icon> element if @Input(icon) is defined', async () => {
        const host = await createComponentWrapper(createComponent, { icon: 'icon' });
        const iconElem = host.queryCss('spy-icon');

        expect(iconElem).toBeTruthy();
    });

    it('should not render <spy-icon> element if @Input(icon) is not defined', async () => {
        const host = await createComponentWrapper(createComponent);
        const iconElem = host.queryCss('spy-icon');

        expect(iconElem).toBeFalsy();
    });

    it('should render default slot after <spy-icon> element', async () => {
        const host = await createComponentWrapper(createComponent, { icon: 'icon' });
        const slotContentElem = host.queryCss('spy-icon + .default-content');

        expect(slotContentElem).toBeTruthy();
    });

    it('should bind @Input(icon) to the `name` input of the <spy-icon> element', async () => {
        const mockIcon = 'icon';
        const host = await createComponentWrapper(createComponent, { icon: mockIcon });
        const iconElem = host.queryCss('spy-icon');

        expect(iconElem.properties.name).toBe(mockIcon);
    });
});
