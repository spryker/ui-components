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
import { IconSettingsModule, IconResetModule } from '@spryker/icon/icons';
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
  resetIcon = IconResetModule.icon;
  tableFeatureLocation = TableFeatureLocation;

  movies = [
    {
      hideable: false,
      hidden: false,
      title: 'Episode I - The Phantom Menace',
    },
    {
      hideable: true,
      hidden: false,
      title: 'Episode II - Attack of the Clones',
    },
    {
      hideable: true,
      hidden: false,
      title: 'Episode III - Revenge of the Sith',
    },
    {
      hideable: true,
      hidden: false,
      title: 'Episode IV - A New Hope',
    },
    {
      hideable: true,
      hidden: false,
      title: 'Episode V - The Empire Strikes Back',
    },
    {
      hideable: true,
      hidden: false,
      title: 'Episode VI - Return of the Jedi',
    },
    {
      hideable: true,
      hidden: false,
      title: 'Episode VII - The Force Awakens',
    },
    {
      hideable: true,
      hidden: false,
      title: 'Episode VIII - The Last Jedi',
    },
    {
      hideable: true,
      hidden: false,
      title: 'Episode IX – The Rise of Skywalker',
    },
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
