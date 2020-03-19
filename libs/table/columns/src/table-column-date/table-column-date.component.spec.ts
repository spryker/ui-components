// tslint:disable: no-non-null-assertion
import { TestBed } from '@angular/core/testing';
import { TableColumnDateComponent } from './table-column-date.component';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { ContextPipe } from '@spryker/utils';

const configMock: any = [
  {
    date: new Date('2020-01-01T17:25:00'),
    format: 'mediumDate',
  },
  {
    date: new Date('2020-01-01T17:25:00'),
    format: 'mm:ss',
  },
  {
    date: '${value}',
    format: 'mm:ss',
  },
];

const context: any = {
  value: new Date('2020-01-01T17:25:00'),
};

describe('TableColumnDateComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    TableColumnDateComponent,
    {
      ngModule: {
        declarations: [ContextPipe],
      },
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [testModule] });
  });

  it('Template must render value from config.date converted by DatePipe with custom format value', async () => {
    const expectedValue = '25:00';
    const host = await createComponent(
      { config: configMock[1], context },
      true,
    );
    const tableElem = host.queryCss('spy-table-column-date');

    expect(tableElem!.nativeElement.textContent).toContain(expectedValue);
  });

  it('Template must render value from config.date converted by DatePipe with format value', async () => {
    const expectedValue = 'Jan 1, 2020';
    const host = await createComponent(
      { config: configMock[0], context },
      true,
    );
    const tableElem = host.queryCss('spy-table-column-date');

    expect(tableElem!.nativeElement.textContent).toContain(expectedValue);
  });

  it('Template must render value from config.date with dynamic text string from context', async () => {
    const expectedValue = '25:00';
    const host = await createComponent(
      { config: configMock[2], context },
      true,
    );
    const tableElem = host.queryCss('spy-table-column-date');

    expect(tableElem!.nativeElement.textContent).toContain(expectedValue);
  });
});
