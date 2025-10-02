import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormItemComponent, FormItemModule } from '@spryker/form-item';
import { InputComponent, InputModule } from '@spryker/input';
import { TableEditableService } from '@spryker/table.feature.editable';
import { ContextPipe, DefaultContextSerializationModule, InvokeModule } from '@spryker/utils';
import { TableColumnInputComponent } from './table-column-input.component';

const configMock: any = {
    placeholder: 'testPlaceholder',
    value: 'testValue',
    type: 'testType',
    prefix: 'testPrefix',
    suffix: 'testSuffix',
    outerPrefix: 'testOuterPrefix',
    outerSuffix: 'testOuterSuffix',
    editableError: 'testError',
};

const context: any = {
    value: 'testValue',
    config: { id: 'id' },
};

class MockTableEditableService {
    updateValue = jest.fn();
}

describe('TableColumnInputComponent', () => {
    let fixture: any;
    let tableEditableService: MockTableEditableService;

    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                InputModule,
                FormItemModule,
                DefaultContextSerializationModule,
                NoopAnimationsModule,
                InvokeModule,
            ],
            declarations: [TableColumnInputComponent, ContextPipe],
            providers: [MockTableEditableService],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        })
            .overrideComponent(TableColumnInputComponent, {
                set: {
                    providers: [{ provide: TableEditableService, useExisting: MockTableEditableService }],
                },
            })
            .compileComponents();

        tableEditableService = TestBed.inject(MockTableEditableService);
        fixture = TestBed.createComponent(TableColumnInputComponent);
        fixture.detectChanges();
    });

    it('Template must render <spy-form-item> element', async () => {
        fixture.componentRef.setInput('config', configMock);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const formItemElem = q('spy-form-item');
        expect(formItemElem).toBeTruthy();
    });

    it('Input `error` must be bound to `config.editableError`', async () => {
        fixture.componentRef.setInput('config', configMock);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const formItemCmp = fixture.debugElement.query(By.directive(FormItemComponent))
            .componentInstance as FormItemComponent;
        expect(formItemCmp.error).toBe(configMock.editableError);
    });

    it('Template must render <spy-input> element as [control]', async () => {
        fixture.componentRef.setInput('config', configMock);
        fixture.componentRef.setInput('context', context);
        fixture.detectChanges();

        const inputElem = q('spy-input[control]');
        expect(inputElem).toBeTruthy();
        expect(inputElem.parent.attributes['class']).toContain('ant-form-item-control-input-content');
    });

    describe('@Input()', () => {
        it('`prefix` must be bound to `prefix` input of the <spy-input> element', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputCmp = fixture.debugElement.query(By.directive(InputComponent))
                .componentInstance as InputComponent;
            expect(inputCmp.prefix).toBe(configMock.prefix);
        });

        it('`suffix` must be bound to `suffix` input of the <spy-input> element', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputCmp = fixture.debugElement.query(By.directive(InputComponent))
                .componentInstance as InputComponent;
            expect(inputCmp.suffix).toBe(configMock.suffix);
        });

        it('`outerPrefix` must be bound to `outerPrefix` input of the <spy-input> element', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputCmp = fixture.debugElement.query(By.directive(InputComponent))
                .componentInstance as InputComponent;
            expect(inputCmp.outerPrefix).toBe(configMock.outerPrefix);
        });

        it('`outerSuffix` must be bound to `outerSuffix` input of the <spy-input> element', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputCmp = fixture.debugElement.query(By.directive(InputComponent))
                .componentInstance as InputComponent;
            expect(inputCmp.outerSuffix).toBe(configMock.outerSuffix);
        });

        it('`value` must be bound to `value` input of the <spy-input> element', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputCmp = fixture.debugElement.query(By.directive(InputComponent))
                .componentInstance as InputComponent;
            expect(inputCmp.value).toBe(configMock.value);
        });

        it('`type` must be bound to `type` input of the <spy-input> element', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputCmp = fixture.debugElement.query(By.directive(InputComponent))
                .componentInstance as InputComponent;
            expect(inputCmp.type).toBe(configMock.type);
        });

        it('`placeholder` must be bound to `placeholder` input of the <spy-input> element', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputCmp = fixture.debugElement.query(By.directive(InputComponent))
                .componentInstance as InputComponent;
            expect(inputCmp.placeholder).toBe(configMock.placeholder);
        });
    });

    describe('@Output()', () => {
        it('`valueChange` of the <spy-input> element should trigger `TableEditableService.updateValue()`', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputDe = q('spy-input');
            inputDe.triggerEventHandler('valueChange', 'value');
            fixture.detectChanges();

            expect(tableEditableService.updateValue).toHaveBeenCalledWith('value', context.config);
        });

        it('`valueChange` of the <spy-input> element should update `context.value`', async () => {
            fixture.componentRef.setInput('config', configMock);
            fixture.componentRef.setInput('context', context);
            fixture.detectChanges();

            const inputDe = q('spy-input');
            inputDe.triggerEventHandler('valueChange', 'value');
            fixture.detectChanges();

            expect(fixture.componentInstance.context.value).toBe('value');
        });
    });
});
