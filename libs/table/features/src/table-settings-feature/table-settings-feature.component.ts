import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
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
    {
      disabled: true,
      title: 'Episode I - The Phantom Menace',
    },
    {
      disabled: false,
      title: 'Episode II - Attack of the Clones',
    },
    {
      disabled: false,
      title: 'Episode III - Revenge of the Sith',
    },
    {
      disabled: false,
      title: 'Episode IV - A New Hope',
    },
    {
      disabled: false,
      title: 'Episode V - The Empire Strikes Back',
    },
    {
      disabled: false,
      title: 'Episode VI - Return of the Jedi',
    },
    {
      disabled: false,
      title: 'Episode VII - The Force Awakens',
    },
    {
      disabled: false,
      title: 'Episode VIII - The Last Jedi',
    },
    {
      disabled: false,
      title: 'Episode IX – The Rise of Skywalker',
    },
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
