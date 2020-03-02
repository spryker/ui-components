import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TableConfig, TableData } from './table';
import { Observable, Subject } from 'rxjs';
import { ToJson } from '@spryker/utils';

import { HttpClient } from '@angular/common/http';
import { TableDataFetcherService } from './table.data.fetcher.service';

@Component({
  selector: 'spy-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
  columns$ = new Observable();
  data$ = new Observable<TableData>();

  @Input() @ToJson() config: TableConfig = {
    dataUrl: 'https://angular-recipe-24caa.firebaseio.com/data.json',
    colsUrl: 'https://angular-recipe-24caa.firebaseio.com/col.json',
  };

  constructor(
    private http: HttpClient,
    private dataFetcher: TableDataFetcherService,
  ) {}

  ngOnInit(): void {
    if (this.config.colsUrl) {
      this.columns$ = this.http.get<[]>(this.config.colsUrl);
    }

    this.data$ = this.dataFetcher.resolve(this.config.dataUrl);
  }

  updateSorting(event: any) {
    console.log(event);
  }

  fetchRecipes() {}
}
