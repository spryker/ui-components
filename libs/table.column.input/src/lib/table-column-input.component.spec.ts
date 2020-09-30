// tslint:disable: no-non-null-assertion
import { TestBed } from '@angular/core/testing';
import { TableColumnInputComponent } from './table-column-input.component';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { InputComponent, InputModule } from '@spryker/input';
import { FormItemComponent, FormItemModule } from '@spryker/form-item';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TableEditableService } from '@spryker/table.feature.editable';
import { ElementRef } from '@angular/core';

const configMock: any = [
  {
    placeholder: 'testPlaceholder',
    value: 'testValue',
    type: 'testType',
    prefix: 'testPrefix',
    suffix: 'testSuffix',
    outerPrefix: 'testOuterPrefix',
    outerSuffix: 'testOuterSuffix',
    editableError: 'testError',
  },
];

const context: any = {
  value: 'testValue',
};

class MockTableEditableService {
  updateValue = jest.fn();
}

describe('TableColumnInputComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    TableColumnInputComponent,
    {
      ngModule: {
        imports: [
          InputModule,
          FormItemModule,
          DefaultContextSerializationModule,
          NoopAnimationsModule,
        ],
        declarations: [ContextPipe],
      },
    },
  );
  let tableEditableService: TableEditableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [testModule],
      providers: [
        MockTableEditableService,
        {
          provide: TableEditableService,
          useExisting: MockTableEditableService,
        },
      ],
    });

    tableEditableService = TestBed.inject(MockTableEditableService) as any;
  });

  it('Template must render spy-form-item node', async () => {
    const host = await createComponent(
      { config: configMock[0], context },
      true,
    );
    const formItemElem = host.queryCss('spy-form-item');

    expect(formItemElem).toBeTruthy();
  });

  it('Input error MUST be bound to config.editableError', async () => {
    const host = await createComponent(
      { config: configMock[0], context },
      true,
    );
    const formItemElem = host.queryComponent(FormItemComponent);

    expect(formItemElem?.error).toBe(configMock[0].editableError);
  });

  it('Template must render spy-input node as [control]', async () => {
    const host = await createComponent(
      { config: configMock[0], context },
      true,
    );
    const inputElem = host.queryCss('spy-input');

    expect(inputElem).toBeTruthy();

    expect(inputElem?.parent?.attributes['class']).toBe(
      'ant-form-item-control-input-content',
    );
  });

  describe('@Input()', () => {
    it('`prefix` must be bound to `prefix` input of the `spy-input` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const inputElem = host.queryComponent(InputComponent);

      expect(inputElem?.prefix).toBe(configMock[0].prefix);
    });

    it('`suffix` must be bound to `suffix` input of the `spy-input` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const inputElem = host.queryComponent(InputComponent);

      expect(inputElem?.suffix).toBe(configMock[0].suffix);
    });

    it('`outerPrefix` must be bound to `outerPrefix` input of the `spy-input` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const inputElem = host.queryComponent(InputComponent);

      expect(inputElem?.outerPrefix).toBe(configMock[0].outerPrefix);
    });

    it('`outerSuffix` must be bound to `outerSuffix` input of the `spy-input` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const inputElem = host.queryComponent(InputComponent);

      expect(inputElem?.outerSuffix).toBe(configMock[0].outerSuffix);
    });

    it('`value` must be bound to `value` input of the `spy-input` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const inputElem = host.queryComponent(InputComponent);

      expect(inputElem?.value).toBe(configMock[0].value);
    });

    it('`type` must be bound to `type` input of the `spy-input` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const inputElem = host.queryComponent(InputComponent);

      expect(inputElem?.type).toBe(configMock[0].type);
    });

    it('`placeholder` must be bound to `placeholder` input of the `spy-input` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const inputElem = host.queryComponent(InputComponent);

      expect(inputElem?.placeholder).toBe(configMock[0].placeholder);
    });
  });

  describe('@Output()', () => {
    it('must be triggered on `valueChange` output of the `spy-input` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const inputElem = host.queryCss('spy-input');

      inputElem!.triggerEventHandler('valueChange', new Event('input'));

      host.detectChanges();

      expect(tableEditableService.updateValue).toHaveBeenCalled();
    });
  });
});
