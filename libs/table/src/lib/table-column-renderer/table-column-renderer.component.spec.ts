// tslint:disable: no-non-null-assertion
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import {
  AfterViewInit,
  Component,
  Input,
  NO_ERRORS_SCHEMA,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';

import { TableColumnRendererComponent } from './table-column-renderer.component';
import {
  TableColumn,
  TableColumnTplContext,
  TableDataRow,
} from '../table/table';
import { ColTplDirective } from '@spryker/table';

const mockConfig: TableColumn = {
  id: 'name',
  title: 'test',
  sortable: true,
  width: '40%',
};

const mockData: TableDataRow = {
  name: 'test',
};

@Component({
  selector: 'test-host-wrapper',
  template: `
    <spy-table-column-renderer
      [config]="config"
      [data]="data"
      [template]="template"
    ></spy-table-column-renderer>
    <ng-template [spyColTpl]="config.id" let-name
      >Name is: {{ name }}</ng-template
    >
  `,
})
class TestHostComponent implements AfterViewInit {
  @ViewChildren(ColTplDirective) slotTemplates?: QueryList<ColTplDirective>;
  @Input() config: any;
  @Input() data: any;
  @Input() template: any;

  templatesObj: Record<string, TemplateRef<TableColumnTplContext>> = {};

  ngAfterViewInit() {
    this.templatesObj = this.slotTemplates!.reduce(
      (templates, slot) => ({
        ...templates,
        [slot.spyColTpl]: slot.template,
      }),
      {},
    );
  }
}

describe('TableColumnRendererComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    TestHostComponent,
    {
      ngModule: {
        declarations: [TableColumnRendererComponent, ColTplDirective],
        exports: [TableColumnRendererComponent, ColTplDirective],
        schemas: [NO_ERRORS_SCHEMA],
      },
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [testModule] });
  });

  it('must render `data[config.id]` when input config.type and template are undefined', async () => {
    const host = await createComponent(
      { config: mockConfig, data: mockData },
      true,
    );
    const rendererElem = host.queryCss('spy-table-column-renderer');

    expect(rendererElem!.nativeElement.textContent).toMatch(
      mockData[mockConfig.id] as string,
    );
  });

  it('must render `template` when input `template` is set', async () => {
    const host = await createComponent(
      { config: mockConfig, data: mockData },
      true,
    );
    const templateRef = host.component.templatesObj;

    host.setInputs({ template: templateRef[mockConfig.id] }, true);

    const rendererElem = host.queryCss('spy-table-column-renderer');

    expect(rendererElem!.nativeElement.textContent).toMatch('Name is: test');
  });
});
