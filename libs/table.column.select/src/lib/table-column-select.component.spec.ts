// tslint:disable: no-non-null-assertion
import { TestBed } from '@angular/core/testing';
import { TableColumnSelectComponent } from './table-column-select.component';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { SelectComponent, SelectModule } from '@spryker/select';
import { FormItemComponent, FormItemModule } from '@spryker/form-item';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TableEditableService } from '@spryker/table.feature.editable';

const configMock: any = {
  placeholder: 'testPlaceholder',
  options: [{ title: 'testTitle', value: 'testValue' }],
  multiple: true,
  search: true,
  disableClear: true,
  showSelectAll: true,
  selectAllTitle: 'testSelectAllTitle',
  noOptionsText: 'testNoOptionsText',
  editableError: 'testError',
};

const context: any = {
  value: 'testValue',
};

class MockTableEditableService {
  updateValue = jest.fn();
}

describe('TableColumnSelectComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    TableColumnSelectComponent,
    {
      ngModule: {
        imports: [
          SelectModule,
          FormItemModule,
          DefaultContextSerializationModule,
          NoopAnimationsModule,
        ],
        declarations: [ContextPipe],
      },
    },
  );
  let tableEditableService: MockTableEditableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [testModule],
      providers: [MockTableEditableService],
    }).overrideComponent(TableColumnSelectComponent, {
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

  it('Template must render spy-select node as [control]', async () => {
    const host = await createComponent({ config: configMock, context }, true);
    const selectElem = host.queryCss('spy-select[control]');

    expect(selectElem).toBeTruthy();

    expect(selectElem?.parent?.attributes['class']).toBe(
      'ant-form-item-control-input-content',
    );
  });

  describe('@Input()', () => {
    it('`placeholder` must be bound to `placeholder` select of the `spy-select` element', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const selectElem = host.queryComponent(SelectComponent);

      expect(selectElem?.placeholder).toBe(configMock.placeholder);
    });

    it('`options` must be bound to `options` select of the `spy-select` element', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const selectElem = host.queryComponent(SelectComponent);

      expect(selectElem?.options).toBe(configMock.options);
    });

    it('`multiple` must be bound to `multiple` select of the `spy-select` element', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const selectElem = host.queryComponent(SelectComponent);

      expect(selectElem?.multiple).toBe(configMock.multiple);
    });

    it('`search` must be bound to `search` select of the `spy-select` element', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const selectElem = host.queryComponent(SelectComponent);

      expect(selectElem?.search).toBe(configMock.search);
    });

    it('`disableClear` must be bound to `disableClear` select of the `spy-select` element', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const selectElem = host.queryComponent(SelectComponent);

      expect(selectElem?.disableClear).toBe(configMock.disableClear);
    });

    it('`showSelectAll` must be bound to `showSelectAll` select of the `spy-select` element', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const selectElem = host.queryComponent(SelectComponent);

      expect(selectElem?.showSelectAll).toBe(configMock.showSelectAll);
    });

    it('`selectAllTitle` must be bound to `selectAllTitle` select of the `spy-select` element', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const selectElem = host.queryComponent(SelectComponent);

      expect(selectElem?.selectAllTitle).toBe(configMock.selectAllTitle);
    });

    it('`noOptionsText` must be bound to `noOptionsText` select of the `spy-select` element', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const selectElem = host.queryComponent(SelectComponent);

      expect(selectElem?.noOptionsText).toBe(configMock.noOptionsText);
    });
  });

  describe('@Output()', () => {
    it('must be triggered on `valueChange` output of the `spy-select` element', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const mockValue = 'value';
      const selectElem = host.queryCss('spy-select');

      selectElem!.triggerEventHandler('valueChange', mockValue);

      host.detectChanges();

      expect(tableEditableService.updateValue).toHaveBeenCalledWith(
        mockValue,
        context.config,
      );
    });

    it('`valueChange` of the `spy-input` element should update `context.value`', async () => {
      const host = await createComponent({ config: configMock, context }, true);
      const mockValue = 'value';
      const selectElem = host.queryCss('spy-select');

      selectElem!.triggerEventHandler('valueChange', mockValue);

      expect(host.component.context?.value).toBe(mockValue);
    });
  });
});