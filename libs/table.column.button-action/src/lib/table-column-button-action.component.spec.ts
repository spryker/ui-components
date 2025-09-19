import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonActionComponent, ButtonActionModule } from '@spryker/button.action';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
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
    let fixture: any;

    const q = (css: string) => fixture.debugElement.query(By.css(css));
    const qAll = (css: string) => fixture.debugElement.queryAll(By.css(css));
    const qDir = <T>(dir: any) => fixture.debugElement.query(By.directive(dir));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonActionModule, DefaultContextSerializationModule],
            declarations: [TableColumnButtonActionComponent, ContextPipe],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(TableColumnButtonActionComponent);
    });

    it('should render <spy-button-action> component', () => {
        fixture.componentRef.setInput('config', configMock[0]);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const btnDe = q('spy-button-action');
        expect(btnDe).toBeTruthy();
    });

    it('should bound `text` property to content of <spy-button-action>', () => {
        fixture.componentRef.setInput('config', configMock[0]);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const btnDe = q('spy-button-action');
        expect(btnDe.nativeElement.textContent).toContain(configMock[0].text);
    });

    it('should bound `text` property with dynamic text string to content of <spy-button-action>', () => {
        fixture.componentRef.setInput('config', configMock[1]);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const btnDe = q('spy-button-action');
        expect(btnDe.nativeElement.textContent).toContain(context.text);
    });

    describe('@Input()', () => {
        it('should bound `config.action` to `action` of <spy-button-action>', () => {
            fixture.componentRef.setInput('config', configMock[1]);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const btnCmp = qDir<ButtonActionComponent>(ButtonActionComponent).componentInstance as ButtonActionComponent;
            expect(btnCmp.action).toBe(configMock[1].action);
        });

        it('should bound `context` to `actionContext` of <spy-button-action> if `config.actionContext` does not exist', () => {
            fixture.componentRef.setInput('config', configMock[0]);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const btnCmp = qDir<ButtonActionComponent>(ButtonActionComponent).componentInstance as ButtonActionComponent;
            expect(btnCmp.actionContext).toBe(context);
        });

        it('should bound `config.actionContext` to `actionContext` of <spy-button-action>', () => {
            fixture.componentRef.setInput('config', configMock[1]);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const btnCmp = qDir<ButtonActionComponent>(ButtonActionComponent).componentInstance as ButtonActionComponent;
            expect(btnCmp.actionContext).toBe(configMock[1].actionContext);
        });

        it('should bound `config.variant` to `variant` of <spy-button-action>', () => {
            fixture.componentRef.setInput('config', configMock[1]);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const btnCmp = qDir<ButtonActionComponent>(ButtonActionComponent).componentInstance as ButtonActionComponent;
            expect(btnCmp.variant).toBe(configMock[1].variant);
        });

        it('should bound `config.shape` to `shape` of <spy-button-action>', () => {
            fixture.componentRef.setInput('config', configMock[1]);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const btnCmp = qDir<ButtonActionComponent>(ButtonActionComponent).componentInstance as ButtonActionComponent;
            expect(btnCmp.shape).toBe(configMock[1].shape);
        });

        it('should bound `config.size` to `size` of <spy-button-action>', () => {
            fixture.componentRef.setInput('config', configMock[1]);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const btnCmp = qDir<ButtonActionComponent>(ButtonActionComponent).componentInstance as ButtonActionComponent;
            expect(btnCmp.size).toBe(configMock[1].size);
        });

        it('should bound `config.attrs` to `attrs` of <spy-button-action>', () => {
            fixture.componentRef.setInput('config', configMock[1]);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const btnCmp = qDir<ButtonActionComponent>(ButtonActionComponent).componentInstance as ButtonActionComponent;
            expect(btnCmp.attrs).toBe(configMock[1].attrs);
        });
    });
});
