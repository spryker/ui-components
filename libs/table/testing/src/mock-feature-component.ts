import { JsonPipe } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ModuleWithFeature, TableFeatureComponent, TableFeatureLocation, TableFeatureModule } from '@spryker/table';

@Component({
    standalone: false,
    selector: 'spy-mock-feature',
    template: `
        <div *spyTableFeatureTpl="tableFeatureLocation.top" class="top-feature">Top Feature</div>
        <div *spyTableFeatureTpl="tableFeatureLocation.beforeTable" class="before-table-feature">
            Before Table Feature
        </div>
        <div *spyTableFeatureTpl="tableFeatureLocation.afterTable" class="after-table-feature">After Table Feature</div>
        <div *spyTableFeatureTpl="tableFeatureLocation.bottom" class="bottom-feature">Bottom Feature</div>
        <div *spyTableFeatureTpl="tableFeatureLocation.hidden" class="hidden-feature">Hidden Feature</div>
        <div *spyTableFeatureTpl="tableFeatureLocation.beforeColsHeader" class="before-cols-header-feature">
            Before Cols Header Feature
        </div>
        <div *spyTableFeatureTpl="tableFeatureLocation.afterColsHeader" class="after-cols-header-feature">
            After Cols Header Feature
        </div>
        <div *spyTableFeatureTpl="tableFeatureLocation.header; let config = config">
            <div class="header-feature">{{ config.title }}</div>
        </div>
        <div *spyTableFeatureTpl="tableFeatureLocation.headerExt" class="header-ext-header-feature">
            Header Ext Feature
        </div>
        <tr *spyTableFeatureTpl="tableFeatureLocation.beforeRows" class="before-rows-feature">
            <td>Before Rows Feature</td>
        </tr>
        <div *spyTableFeatureTpl="tableFeatureLocation.beforeCols" class="before-cols-feature">Before Cols Feature</div>
        <div *spyTableFeatureTpl="tableFeatureLocation.cell; let value = value">
            <div class="cell-feature">{{ value }}</div>
        </div>
        <div *spyTableFeatureTpl="tableFeatureLocation.afterCols" class="after-cols-feature">After Cols Feature</div>
        <tr *spyTableFeatureTpl="tableFeatureLocation.afterRows" class="after-rows-feature">
            <td>After Rows Feature</td>
        </tr>
    `,
})
export class MockFeatureComponent extends TableFeatureComponent {
    name = 'mockFeature';
    tableFeatureLocation = TableFeatureLocation;
}

@NgModule({
    imports: [TableFeatureModule, JsonPipe],
    exports: [MockFeatureComponent],
    declarations: [MockFeatureComponent],
})
export class MockFeatureModule implements ModuleWithFeature {
    featureComponent = MockFeatureComponent;

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
    }
}
