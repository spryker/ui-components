import { Injector } from '@angular/core';
import { TableFeatureComponent } from '@spryker/table';

export class MockTableFeatureComponent extends TableFeatureComponent {
    location = 'mocked-location';
    styles?: Record<string, string> = this.innerConfig.styles;
    setTableComponent = jest.fn();
    setColumnsResolverService = jest.fn();
    setDataFetcherService = jest.fn();
    setDataConfiguratorService = jest.fn();
    getTplDirectives = jest.fn().mockReturnValue(this.tplDirectives);

    constructor(
        public innerConfig: {
            styles?: Record<string, string>;
        } = {},
        injector: Injector,
    ) {
        super(injector);
    }
}
