// tslint:disable: no-non-null-assertion
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  InjectionToken,
  Optional,
  TemplateRef,
} from '@angular/core';
import {
  TableColumn,
  TableColumnContext,
  TableConfig,
  TableData,
  TableFeatureComponent,
  TableFeatureContext,
} from '@spryker/table';
import { ReplaySubject } from 'rxjs';

export class TableMockComponent {
  selectionChange = new EventEmitter<any>();
  actionTriggered = new EventEmitter<any>();
  config$ = new ReplaySubject<TableConfig>(1);
  columns$ = new ReplaySubject<TableColumn[]>(1);
  data$ = new ReplaySubject<TableData>(1);
  disableFeatureAt = jest.fn();
  updateRowClasses = jest.fn();
}

export interface TableFeatureMocks<T = TableMockComponent> {
  table: Partial<T>;
}

export const TestTableFeatureMocks = new InjectionToken<TableFeatureMocks>(
  'TestTableFeatureMocks',
);

export function initFeature<T>(
  feature: TableFeatureComponent,
  mocks: Partial<TableFeatureMocks<T>> = {},
): TableFeatureMocks<T> {
  const table = mocks.table || (new TableMockComponent() as any);

  feature.setTableComponent(table);

  return { table };
}

@Component({
  selector: 'test-table-feature',
  template: `
    <div class="template">
      <ng-container
        *ngTemplateOutlet="template; context: templateCtx"
      ></ng-container>
    </div>
    <div class="column-template">
      <ng-container
        *ngTemplateOutlet="colTemplate; context: templateColumnCtx"
      ></ng-container>
    </div>
  `,
})
export class TestTableFeatureComponent<T = TableMockComponent>
  implements AfterContentInit {
  @ContentChild(TableFeatureComponent) feature?: TableFeatureComponent;

  featureMocks?: TableFeatureMocks<T>;

  template?: TemplateRef<TableFeatureContext>;
  colTemplate?: TemplateRef<TableColumnContext>;

  templateCtx: TableFeatureContext = {
    location: 'mock-location',
  };

  templateColumnCtx: TableColumnContext = {
    config: {} as any,
    value: 'mock-data',
    row: {},
    i: 0,
  };

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(TestTableFeatureMocks)
    @Optional()
    private globalMocks: TableFeatureMocks<T> | null,
  ) {}

  ngAfterContentInit(): void {
    if (!this.feature) {
      return;
    }

    this.featureMocks = initFeature<T>(
      this.feature,
      this.globalMocks ?? undefined,
    );

    setTimeout(() => {
      this.template = this.feature!.template;
      // this.colTemplate = this.feature!.colTemplate;
      this.cdr.detectChanges();
    });
  }
}
