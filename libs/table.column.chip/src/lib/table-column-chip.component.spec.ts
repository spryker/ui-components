import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { ChipsModule } from '@spryker/chips';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { TableColumnChipComponent } from './table-column-chip.component';

const configMock: any = [
    {
        text: 'mockedText',
        color: 'green',
    },
    {
        text: '${value}',
    },
];
const context: any = {
    value: 'mockedValue',
};

describe('TableColumnChipComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(TableColumnChipComponent, {
        ngModule: {
            imports: [ChipsModule, DefaultContextSerializationModule],
            declarations: [ContextPipe],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('Template must render <spy-chips> component', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock[0], context });
        const chipsElem = host.queryCss('spy-chips');

        expect(chipsElem).toBeTruthy();
    });

    it('Input color must be bound to `className` of <spy-input>', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock[0], context });
        const chipsElem = host.queryCss('spy-chips');

        expect(chipsElem.properties.className).toContain(configMock[0].color);
    });

    it('Input text with dynamic text string must be content of <spy-chips> component', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock[1], context });
        const chipsElem = host.queryCss('spy-chips');

        expect(chipsElem.nativeElement.textContent).toContain(context.value);
    });
});
