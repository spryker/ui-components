import { TemplateRef } from '@angular/core';
import { TableFeatureComponent, TableFeatureContext } from '@spryker/table';

export class MockTableFeatureComponent extends TableFeatureComponent {
  location = 'mocked-location';
  styles?: Record<string, string> = this.config.styles;
  tplDirectives?: TemplateRef<TableFeatureContext> = this.config.template;
  setTableComponent = jest.fn();
  setColumnsResolverService = jest.fn();
  setDataFetcherService = jest.fn();
  setDataConfiguratorService = jest.fn();
  getTplDirectives = jest.fn().mockReturnValue(this.tplDirectives);

  constructor(
    private config: {
      styles?: Record<string, string>;
      template?: TemplateRef<TableFeatureContext>;
    } = {},
  ) {
    super();
  }
}
