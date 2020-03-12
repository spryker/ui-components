import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

import { TableColumnsResolverService } from '../table/columns-resolver.service';
import { TableDataConfiguratorService } from '../table/data-configurator.service';
import { TableDataFetcherService } from '../table/data-fetcher.service';
import { TableFeatureContext } from '../table/table';
import { TableFeatureComponent } from '../table/table-feature.component';
import { TableComponent } from '../table/table.component';
import { TableFeaturesRendererComponent } from './table-features-renderer.component';

class MockTableFeatureComponent implements TableFeatureComponent {
  location = 'mocked-location';
  styles?: Record<string, string> = this.config.styles;
  template?: TemplateRef<TableFeatureContext> = this.config.template;
  table?: TableComponent;
  columnsResolverService?: TableColumnsResolverService;
  dataFetcherService?: TableDataFetcherService;
  dataConfiguratorService?: TableDataConfiguratorService;
  setTableComponent = jest.fn();
  setColumnsResolverService = jest.fn();
  setDataFetcherService = jest.fn();
  setDataConfiguratorService = jest.fn();
  getTemplate = jest.fn().mockReturnValue(this.template);

  constructor(
    private config: {
      styles?: Record<string, string>;
      template?: TemplateRef<TableFeatureContext>;
    } = {},
  ) {}
}

@Component({
  selector: 'render-features',
  template: `
    <spy-table-features-renderer
      [features]="features"
      [maxFeatures]="limit"
    ></spy-table-features-renderer>
  `,
})
class RenderFeaturesComponent {
  @Input() limit?: number;

  @ContentChildren(TemplateRef) set templates(
    templates: QueryList<TemplateRef<TableFeatureContext>>,
  ) {
    this.features = templates.map(
      template => new MockTableFeatureComponent({ template }),
    );
  }

  features: MockTableFeatureComponent[] = [];
}

@Component({
  selector: 'test',
  template: `
    <render-features [limit]="limit"></render-features>
  `,
})
class TestComponent {
  @Input() limit?: number;
}

xdescribe('TableFeaturesRendererComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    TableFeaturesRendererComponent,
    {
      ngModule: {
        declarations: [TestComponent, RenderFeaturesComponent],
        exports: [TestComponent, RenderFeaturesComponent],
      },
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [testModule],
      providers: [
        { provide: TableComponent, useValue: 'MockTableComponent' },
        {
          provide: TableColumnsResolverService,
          useValue: 'MockTableColumnsResolverService',
        },
        {
          provide: TableDataFetcherService,
          useValue: 'MockTableDataFetcherService',
        },
        {
          provide: TableDataConfiguratorService,
          useValue: 'MockTableDataConfiguratorService',
        },
      ],
    });
  });

  it('should compile', async () => {
    await createComponent();
  });

  describe('every feature from @Input(features)', () => {
    it('should render `div` with styles from `feature.styles`', async () => {
      const features = [
        new MockTableFeatureComponent(),
        new MockTableFeatureComponent({ styles: { color: 'red' } }),
        new MockTableFeatureComponent(),
        new MockTableFeatureComponent({ styles: { display: 'block' } }),
      ];

      const host = await createComponent({ features }, true);

      const divElems = host.fixture.debugElement.queryAll(By.css('div'));

      expect(divElems.length).toBe(4);
      expect(divElems[0].styles).toEqual({});
      expect(divElems[1].styles).toEqual({ color: 'red' });
      expect(divElems[2].styles).toEqual({});
      expect(divElems[3].styles).toEqual({ display: 'block' });
    });

    it('should limit rendering of `div`s by @Input(maxFeatures)', async () => {
      const features = [
        new MockTableFeatureComponent(),
        new MockTableFeatureComponent({ styles: { color: 'red' } }),
        new MockTableFeatureComponent(),
        new MockTableFeatureComponent({ styles: { display: 'block' } }),
      ];

      const host = await createComponent({ features, maxFeatures: 2 }, true);

      const divElems = host.fixture.debugElement.queryAll(By.css('div'));

      expect(divElems.length).toBe(2);
    });

    it('should render template in `div`', async () => {
      TestBed.overrideTemplate(
        TestComponent,
        `
          <render-features>
            <ng-template>feat1</ng-template>
            <ng-template let-loc="location">feat2 at {{ loc }}</ng-template>
            <ng-template>feat3</ng-template>
          </render-features>
        `,
      );

      const fixture = TestBed.createComponent(TestComponent);

      fixture.detectChanges();

      const divElems = fixture.debugElement.queryAll(By.css('div'));

      expect(divElems.length).toBe(3);
      expect(divElems[0].nativeElement.textContent).toMatch('feat1');
      expect(divElems[1].nativeElement.textContent).toMatch(
        'feat2 at mocked-location',
      );
      expect(divElems[2].nativeElement.textContent).toMatch('feat3');
    });

    it('should call `feature.setTableComponent` with `TableComponent`', async () => {
      const feature = new MockTableFeatureComponent();

      await createComponent({ features: [feature] }, true);

      expect(feature.setTableComponent).toHaveBeenCalledWith(
        'MockTableComponent',
      );
    });

    it('should call `feature.setColumnsResolverService` with `TableColumnsResolverService`', async () => {
      const feature = new MockTableFeatureComponent();

      await createComponent({ features: [feature] }, true);

      expect(feature.setColumnsResolverService).toHaveBeenCalledWith(
        'MockTableColumnsResolverService',
      );
    });

    it('should call `feature.setDataFetcherService` with `TableDataFetcherService`', async () => {
      const feature = new MockTableFeatureComponent();

      await createComponent({ features: [feature] }, true);

      expect(feature.setDataFetcherService).toHaveBeenCalledWith(
        'MockTableDataFetcherService',
      );
    });

    it('should call `feature.setDataConfiguratorService` with `TableDataConfiguratorService`', async () => {
      const feature = new MockTableFeatureComponent();

      await createComponent({ features: [feature] }, true);

      expect(feature.setDataConfiguratorService).toHaveBeenCalledWith(
        'MockTableDataConfiguratorService',
      );
    });
  });
});
