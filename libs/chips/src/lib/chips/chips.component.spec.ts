import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { ChipsComponent } from './chips.component';

describe('ChipsComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(ChipsComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
    });

    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        }),
    );

    it('Input color should be bound to host element', async () => {
        const mockedColor = 'red';
        const host = await createComponentWrapper(createComponent, { color: mockedColor });
        const chipsElem = host.queryCss('spy-chips');

        expect(chipsElem.properties.className).toContain(mockedColor);
    });

    it('Input maxWidth should be bound to host element', async () => {
        const mockedWidth = '200px';
        const host = await createComponentWrapper(createComponent, { maxWidth: mockedWidth });
        const chipsElem = host.queryCss('spy-chips');

        expect(chipsElem.styles.maxWidth).toBe(mockedWidth);
    });
});
