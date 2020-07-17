import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  TableFeatureComponent,
  TableFeatureConfig,
  TableColumn,
  TableFeatureLocation,
} from '@spryker/table';
import { IconSettingsModule } from '@spryker/icon/icons';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

declare module '@spryker/table' {
  interface TableColumn {
    id: string;
    hideable?: boolean; // by default `true`
  }

  interface TableConfig {
    columnConfigurator?: TableSettingsConfig;
  }
}

interface TableSettingsConfig extends TableFeatureConfig {
  tableId?: string;
}

@Component({
  selector: 'spy-table-settings-feature',
  templateUrl: './table-settings-feature.component.html',
  styleUrls: ['./table-settings-feature.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TableFeatureComponent,
      useExisting: TableSettingsFeatureComponent,
    },
  ],
})
export class TableSettingsFeatureComponent extends TableFeatureComponent<
  TableSettingsConfig
> {
  name = 'columnConfigurator';
  settingsIcon = IconSettingsModule.icon;
  tableFeatureLocation = TableFeatureLocation;

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
