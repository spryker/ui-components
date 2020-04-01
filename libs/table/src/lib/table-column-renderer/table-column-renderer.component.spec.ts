// tslint:disable: no-non-null-assertion
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AfterViewInit,
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Component,
  Injectable,
  Input,
  NO_ERRORS_SCHEMA,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';

import { TableColumnRendererComponent } from './table-column-renderer.component';
import {
  TableColumn,
  TableColumnComponent,
  TableColumnContext,
  TableColumnTplContext,
  TableDataRow,
} from '../table/table';
import {
  ColTplDirective,
  ColumnTypeOption,
  TABLE_COLUMN_COMPONENT_TOKEN,
  TableColumnTypeComponent,
} from '@spryker/table';
import { By } from '@angular/platform-browser';
import { ContextModule, ContextService } from '@spryker/utils';
import { OrchestratorCoreModule } from '@orchestrator/core';
import {
  LayoutFlatHostComponent,
  LayoutFlatHostModule,
} from '@orchestrator/layout';

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
  // tslint:disable-next-line: component-selector
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

@Injectable({ providedIn: 'root' })
class TableColumnTestConfig {
  @ColumnTypeOption()
  text = this.contextService.wrap('value');

  constructor(private contextService: ContextService) {}
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'table-column-test',
  template: `
    {{ config.text | context: context }}
  `,
})
@TableColumnTypeComponent(TableColumnTestConfig)
class TableColumnTestComponent
  implements TableColumnComponent<TableColumnTestConfig> {
  @Input() config?: TableColumnTestConfig;
  @Input() context?: TableColumnContext;
}

describe('TableColumnRendererComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OrchestratorCoreModule, LayoutFlatHostModule, ContextModule],
      declarations: [
        TestHostComponent,
        TableColumnRendererComponent,
        ColTplDirective,
        TableColumnTestComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        ...(OrchestratorCoreModule.forRoot().providers || []),
        ...OrchestratorCoreModule.registerComponents({
          test: TableColumnTestComponent,
          'layout-flat': LayoutFlatHostComponent,
        }),
        ...(LayoutFlatHostModule.forRoot().providers || []),
        {
          provide: TABLE_COLUMN_COMPONENT_TOKEN,
          useValue: {
            test: TableColumnTestComponent,
          },
          multi: true,
        },
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [LayoutFlatHostComponent, TableColumnTestComponent],
          multi: true,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('must render `data[config.id]` when input config.type and template are undefined', () => {
    component.config = mockConfig;
    component.data = mockData;

    fixture.detectChanges();

    const rendererElem = fixture.debugElement.query(
      By.css('spy-table-column-renderer'),
    );

    expect(rendererElem!.nativeElement.textContent).toMatch(
      mockData[mockConfig.id] as string,
    );
  });

  it('must render `template` when input `template` is set', () => {
    component.config = mockConfig;
    component.data = mockData;

    fixture.detectChanges();

    const templateRef = component.templatesObj;

    component.template = templateRef[mockConfig.id];

    fixture.detectChanges();

    const rendererElem = fixture.debugElement.query(
      By.css('spy-table-column-renderer'),
    );

    expect(rendererElem!.nativeElement.textContent).toMatch('Name is: test');
  });

  it('must render `orc-orchestrator` when input `config` has key `type`', () => {
    component.config = {
      ...mockConfig,
      type: 'test',
      typeOptions: { text: '${value} orc-orchestrator' },
    };
    component.data = mockData;

    fixture.detectChanges();

    const rendererElem = fixture.debugElement.query(
      By.css('spy-table-column-renderer'),
    );

    expect(rendererElem!.nativeElement.textContent).toMatch(
      'test orc-orchestrator',
    );
  });
});
