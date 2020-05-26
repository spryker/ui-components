// tslint:disable: no-non-null-assertion
import { TestBed } from '@angular/core/testing';
import { TableColumnChipComponent } from './table-column-chip.component';
import { ContextPipe } from '@spryker/utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { ChipsModule } from '@spryker/chips';

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
  const { testModule, createComponent } = getTestingForComponent(
    TableColumnChipComponent,
    {
      ngModule: {
        imports: [ChipsModule],
        declarations: [ContextPipe],
      },
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [testModule] });
  });

  it('Template must render spy-chips node', async () => {
    const host = await createComponent(
      { config: configMock[0], context },
      true,
    );
    const chipsElem = host.queryCss('spy-chips');

    expect(chipsElem).toBeTruthy();
  });

  it('Input color MUST be bound to className of spy-input', async () => {
    const host = await createComponent(
      { config: configMock[0], context },
      true,
    );
    const chipsElem = host.queryCss('spy-chips');

    expect(chipsElem!.properties.className).toContain(configMock[0].color);
  });

  it('Input text with dynamic text string MUST be content of spy-chips element', async () => {
    const host = await createComponent(
      { config: configMock[1], context },
      true,
    );
    const chipsElem = host.queryCss('spy-chips');

    expect(chipsElem?.nativeElement.textContent).toContain(context.value);
  });
});
