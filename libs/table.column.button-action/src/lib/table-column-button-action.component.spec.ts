import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { ButtonActionModule, ButtonActionComponent } from '@spryker/button.action';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { createComponentWrapper } from '@spryker/internal-utils';
import { TableColumnButtonActionComponent } from './table-column-button-action.component';

const configMock = [
    {
        text: 'mockedText',
        action: {
            type: 'mockedActionType',
            url: '${url}',
        },
    },
    {
        text: '${text}',
        action: {
            type: 'redirect',
            url: '${url}',
        },
        actionContext: {
            url: 'overrideUrl',
        },
        variant: 'primary',
        shape: 'round',
        size: 'small',
        attrs: { name: 'custom-name' },
    },
];

const context = {
    text: 'mockedContextText',
    url: 'mockedContextUrl',
};

describe('TableColumnButtonActionComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(TableColumnButtonActionComponent, {
        ngModule: {
            imports: [ButtonActionModule, DefaultContextSerializationModule],
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

    it('should render <spy-button-action> component', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock[0], context });
        const buttonActionElem = host.queryCss('spy-button-action');

        expect(buttonActionElem).toBeTruthy();
    });

    it('should bound `text` property to content of <spy-button-action>', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock[0], context });
        const buttonActionElem = host.queryCss('spy-button-action');

        expect(buttonActionElem.nativeElement.textContent).toContain(configMock[0].text);
    });

    it('should bound `text` property with dynamic text string to content of <spy-button-action>', async () => {
        const host = await createComponentWrapper(createComponent, { config: configMock[1], context });
        const buttonActionElem = host.queryCss('spy-button-action');

        expect(buttonActionElem.nativeElement.textContent).toContain(context.text);
    });

    describe('@Input()', () => {
        it('should bound `config.action` to `action` of <spy-button-action>', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock[1], context });
            const buttonActionElem = host.queryComponent(ButtonActionComponent);

            expect(buttonActionElem.action).toBe(configMock[1].action);
        });

        it('should bound `context` to `actionContext` of <spy-button-action> if `config.actionContext` does not exist', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock[0], context });
            const buttonActionElem = host.queryComponent(ButtonActionComponent);

            expect(buttonActionElem.actionContext).toBe(context);
        });

        it('should bound `config.actionContext` to `actionContext` of <spy-button-action>', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock[1], context });
            const buttonActionElem = host.queryComponent(ButtonActionComponent);

            expect(buttonActionElem.actionContext).toBe(configMock[1].actionContext);
        });

        it('should bound `config.variant` to `variant` of <spy-button-action>', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock[1], context });
            const buttonActionElem = host.queryComponent(ButtonActionComponent);

            expect(buttonActionElem.variant).toBe(configMock[1].variant);
        });

        it('should bound `config.shape` to `shape` of <spy-button-action>', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock[1], context });
            const buttonActionElem = host.queryComponent(ButtonActionComponent);

            expect(buttonActionElem.shape).toBe(configMock[1].shape);
        });

        it('should bound `config.size` to `size` of <spy-button-action>', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock[1], context });
            const buttonActionElem = host.queryComponent(ButtonActionComponent);

            expect(buttonActionElem.size).toBe(configMock[1].size);
        });

        it('should bound `config.attrs` to `attrs` of <spy-button-action>', async () => {
            const host = await createComponentWrapper(createComponent, { config: configMock[1], context });
            const buttonActionElem = host.queryComponent(ButtonActionComponent);

            expect(buttonActionElem.attrs).toBe(configMock[1].attrs);
        });
    });
});
