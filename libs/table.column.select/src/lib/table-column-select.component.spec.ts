// tslint:disable: no-non-null-assertion
import { TestBed } from '@angular/core/testing';
import { TableColumnSelectComponent } from './table-column-select.component';
import { ContextPipe, DefaultContextSerializationModule } from '@spryker/utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { SelectComponent, SelectModule } from '@spryker/select';
import { FormItemComponent, FormItemModule } from '@spryker/form-item';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TableEditableService } from '@spryker/table.feature.editable';

const configMock: any = [
  {
    placeholder: 'testPlaceholder',
    options: [{ title: 'testTitle', value: 'testValue' }],
    multiple: true,
    search: true,
    disableClear: true,
    showSelectAll: true,
    selectAllTitle: 'testSelectAllTitle',
    noOptionsText: 'testNoOptionsText',
    editableError: 'testError',
  },
];

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

  it('Template must render spy-select node as [control]', async () => {
    const host = await createComponent(
      { config: configMock[0], context },
      true,
    );
    const selectElem = host.queryCss('spy-select');

    expect(selectElem).toBeTruthy();

    expect(selectElem?.parent?.attributes['class']).toBe(
      'ant-form-item-control-input-content',
    );
  });

  describe('@Input()', () => {
    it('`placeholder` must be bound to `placeholder` select of the `spy-select` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const selectElem = host.queryComponent(SelectComponent);

      expect(selectElem?.placeholder).toBe(configMock[0].placeholder);
    });

    it('`options` must be bound to `options` select of the `spy-select` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const selectElem = host.queryComponent(SelectComponent);

      expect(selectElem?.options).toBe(configMock[0].options);
    });

    it('`multiple` must be bound to `multiple` select of the `spy-select` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const selectElem = host.queryComponent(SelectComponent);

      expect(selectElem?.multiple).toBeTruthy();
    });

    it('`search` must be bound to `search` select of the `spy-select` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const selectElem = host.queryComponent(SelectComponent);

      expect(selectElem?.search).toBeTruthy();
    });

    it('`disableClear` must be bound to `disableClear` select of the `spy-select` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const selectElem = host.queryComponent(SelectComponent);

      expect(selectElem?.disableClear).toBeTruthy();
    });

    it('`showSelectAll` must be bound to `showSelectAll` select of the `spy-select` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const selectElem = host.queryComponent(SelectComponent);

      expect(selectElem?.showSelectAll).toBeTruthy();
    });

    it('`selectAllTitle` must be bound to `selectAllTitle` select of the `spy-select` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const selectElem = host.queryComponent(SelectComponent);

      expect(selectElem?.selectAllTitle).toBe(configMock[0].selectAllTitle);
    });

    it('`noOptionsText` must be bound to `noOptionsText` select of the `spy-select` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const selectElem = host.queryComponent(SelectComponent);

      expect(selectElem?.noOptionsText).toBe(configMock[0].noOptionsText);
    });
  });

  describe('@Output()', () => {
    it('must be triggered on `valueChange` output of the `spy-select` element', async () => {
      const host = await createComponent(
        { config: configMock[0], context },
        true,
      );
      const mockValue = 'value';
      const selectElem = host.queryCss('spy-select');

      selectElem!.triggerEventHandler('valueChange', mockValue);

      host.detectChanges();

      expect(tableEditableService.updateValue).toHaveBeenCalledWith(
        mockValue,
        context.config,
      );
    });
  });
});
