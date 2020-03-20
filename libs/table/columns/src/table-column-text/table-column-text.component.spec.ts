// tslint:disable: no-non-null-assertion
import { TestBed } from '@angular/core/testing';
import { TableColumnTextComponent } from './table-column-text.component';
import { ContextPipe } from '@spryker/utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

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
  const { testModule, createComponent } = getTestingForComponent(
    TableColumnTextComponent,
    {
      ngModule: {
        declarations: [ContextPipe],
      },
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [testModule] });
  });

  it('Template must render value text from config', async () => {
    const host = await createComponent(
      { config: configMock[0], context },
      true,
    );
    const columnElem = host.queryCss('spy-table-column-text');

    expect(columnElem!.nativeElement.textContent).toContain(configMock[0].text);
  });

  it('Template must render value text with dynamic text string from context', async () => {
    const host = await createComponent(
      { config: configMock[1], context },
      true,
    );
    const columnElem = host.queryCss('spy-table-column-text');

    expect(columnElem!.nativeElement.textContent).toContain(context.value);
  });
});
