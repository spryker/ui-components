/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { FormItemComponent, FormItemModule } from '@spryker/form-item';
import { InputComponent, InputModule } from '@spryker/input';
import { TableEditableService } from '@spryker/table.feature.editable';
import {
  ContextPipe,
  DefaultContextSerializationModule,
  InvokeModule,
} from '@spryker/utils';

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
  config: {
    id: 'id',
  },
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
          InvokeModule,
        ],
        declarations: [ContextPipe],
      },
    },
  );
  let tableEditableService: MockTableEditableService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [testModule],
      providers: [MockTableEditableService],
      teardown: { destroyAfterEach: false },
    }).overrideComponent(TableColumnInputComponent, {
      set: {
        providers: [
          {
            provide: TableEditableService,
            useExisting: MockTableEditableService,
          },
        ],
      },
    });

    tableEditableService = TestBed.inject(MockTableEditableService);
  });

  it('Template must render spy-form-item node', async () => {
    const host = await createComponent({ config: configMock, context }, true);
    const formItemElem = host.queryCss('spy-form-item');

    expect(formItemElem).toBeTruthy();
  });

  it('Input error MUST be bound to config.editableError', async () => {
    const host = await createComponent({ config: configMock, context }, true);
    const formItemElem = host.queryComponent(FormItemComponent);

    expect(formItemElem?.error).toBe(configMock.editableError);
  });

  it('Template must render spy-input node as [control]', async () => {
    const host = await createComponent({ config: configMock, context }, true);
    const inputElem = host.queryCss('spy-input[control]');

    expect(inputElem).toBeTruthy();

    expect(inputElem?.parent?.attributes['class']).toContain(
      'ant-form-item-control-input-content',
    );
  });

  describe('@Input()', () => {
    it('`prefix` must be bound to `prefix` input of the `spy-input` element', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const inputElem = host.queryComponent(InputComponent);

      expect(inputElem?.prefix).toBe(configMock.prefix);
    });

    it('`suffix` must be bound to `suffix` input of the `spy-input` element', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const inputElem = host.queryComponent(InputComponent);

      expect(inputElem?.suffix).toBe(configMock.suffix);
    });

    it('`outerPrefix` must be bound to `outerPrefix` input of the `spy-input` element', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const inputElem = host.queryComponent(InputComponent);

      expect(inputElem?.outerPrefix).toBe(configMock.outerPrefix);
    });

    it('`outerSuffix` must be bound to `outerSuffix` input of the `spy-input` element', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const inputElem = host.queryComponent(InputComponent);

      expect(inputElem?.outerSuffix).toBe(configMock.outerSuffix);
    });

    it('`value` must be bound to `value` input of the `spy-input` element', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const inputElem = host.queryComponent(InputComponent);

      expect(inputElem?.value).toBe(configMock.value);
    });

    it('`type` must be bound to `type` input of the `spy-input` element', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const inputElem = host.queryComponent(InputComponent);

      expect(inputElem?.type).toBe(configMock.type);
    });

    it('`placeholder` must be bound to `placeholder` input of the `spy-input` element', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const inputElem = host.queryComponent(InputComponent);

      expect(inputElem?.placeholder).toBe(configMock.placeholder);
    });
  });

  describe('@Output()', () => {
    it('`valueChange` of the `spy-input` element should trigger `TableEditableService.updateValue()`', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const mockValue = 'value';
      const inputElem = host.queryCss('spy-input');

      inputElem!.triggerEventHandler('valueChange', mockValue);

      expect(tableEditableService.updateValue).toHaveBeenCalledWith(
        mockValue,
        context.config,
      );
    });

    it('`valueChange` of the `spy-input` element should update `context.value`', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const mockValue = 'value';
      const inputElem = host.queryCss('spy-input');

      inputElem!.triggerEventHandler('valueChange', mockValue);

      expect(host.component.context?.value).toBe(mockValue);
    });
  });
});
