import { Injector, TemplateRef } from '@angular/core';
import { TableFeatureComponent } from '@spryker/table';

export class MockTableFeatureComponent extends TableFeatureComponent {
  location = 'mocked-location';
  styles?: Record<string, string> = this.innerConfig.styles;
  // tplDirectives?: QueryList<TableFeatureTplDirective> = this.config.template;
  setTableComponent = jest.fn();
  setColumnsResolverService = jest.fn();
  setDataFetcherService = jest.fn();
  setDataConfiguratorService = jest.fn();
  getTplDirectives = jest.fn().mockReturnValue(this.tplDirectives);

  constructor(
    public innerConfig: {
      styles?: Record<string, string>;
      // template?: TemplateRef<TableFeatureContext>;
    } = {},
    injector: Injector,
  ) {
    super(injector);
  }
}
