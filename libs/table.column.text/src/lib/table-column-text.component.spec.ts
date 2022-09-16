import { TestBed } from '@angular/core/testing';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { TableColumnTextComponent } from './table-column-text.component';

const configMock: any = [
    {
        text: 'mockedText',
    },
    {
        text: '${value}',
    },
];
const context: any = {
    value: 'mockedText',
};

describe('TableColumnTextComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(TableColumnTextComponent, {
        ngModule: {
            imports: [DefaultContextSerializationModule],
            declarations: [ContextPipe],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('Template must render value text from config', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock[0], context });
        const columnElem = host.queryCss('spy-table-column-text');

        expect(columnElem.nativeElement.textContent).toContain(configMock[0].text);
    });

    it('Template must render value text with dynamic text string from context', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock[1], context });
        const columnElem = host.queryCss('spy-table-column-text');

        expect(columnElem.nativeElement.textContent).toContain(context.value);
    });
});
