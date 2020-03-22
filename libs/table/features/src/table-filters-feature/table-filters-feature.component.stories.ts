import { HttpClientModule } from '@angular/common/http';
import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
} from '@angular/core';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TableModule } from '../../../src/lib/table.module';
import { TableFiltersFeatureModule } from './table-filters-feature.module';
import { TableFilterSelectComponent, TableFilterSelectModule } from '../../../filters/src/table-filter-select/';

export default {
  title: 'TableFiltersFeature',
};

export const withSelectFeatures = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientModule,
      TableModule,
      BrowserAnimationsModule,
      TableFiltersFeatureModule,
      TableFiltersFeatureModule.withFilterComponents({
        select: TableFilterSelectComponent as any,
        select2: TableFilterSelectComponent as any,
      } as any),
      TableFilterSelectModule,
    ],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [
          TableFilterSelectComponent,
        ],
        multi: true,
      },
    ],
  },
  template: `
    <spy-table [config]="config" (actionTriggered)="logActions($event)">
      <spy-table-filters-feature spy-table-feature location="top"></spy-table-filters-feature>
    </spy-table>
  `,
  props: {
    config: object(
      'Config',
      {
        dataUrl: 'https://angular-recipe-24caa.firebaseio.com/data.json',
        columns: [
          { id: 'name', sortable: true, title: 'name' },
          { id: 'sku', sortable: true, title: 'sku' },
          { id: 'id3', sortable: true, title: 'id3' },
        ],
        filters: {
          items: [
            {
              id: 'offers',
              title: 'Has Offers',
              type: 'select',
              typeOptions: {
                multiselect: false,
                values: [
                  { value: 1, title: 'Yes' },
                  { value: 0, title: 'No' },
                ],
              },
            },
            {
              id: 'status',
              title: 'Product Status',
              type: 'select2',
              typeOptions: {
                multiselect: false,
                values: [
                  { value: 1, title: 'Active' },
                  { value: 0, title: 'Inactive' },
                ],
              },
            },
          ],
        },
      },
      'Group',
    ),
    logActions: console.log,
  },
});
