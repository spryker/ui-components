import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  AfterViewInit,
  Input,
  OnDestroy,
} from '@angular/core';
import { TableFeatureComponent } from '@spryker/table';
import {
  debounceTime,
  distinctUntilChanged,
  scan,
  pluck,
} from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

declare module '@spryker/table' {
  interface TableConfig extends TableSearchConfig {
    search?: TableSearchConfig;
  }
}

export interface TableSearchConfig {
  placeholder?: string;
}

@Component({
  selector: 'spy-table-search-feature',
  templateUrl: './table-search-feature.component.html',
  styleUrls: ['./table-search-feature.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: TableFeatureComponent,
      useExisting: TableSearchFeatureComponent,
    },
  ],
})
export class TableSearchFeatureComponent extends TableFeatureComponent
  implements AfterViewInit, OnDestroy {
  @Input() location = 'top';
  placeholder = '';
  styles = { order: '99' };
  valueChangeSubject: any;
  inputSubscription?: Subscription;

  constructor() {
    super();
    this.valueChangeSubject = new Subject().pipe(
      pluck('data'),
      scan((accumulator: any, item: any) => accumulator + item),
      debounceTime(300),
      distinctUntilChanged(),
    );
  }

  ngAfterViewInit() {
    this.inputSubscription = this.valueChangeSubject.subscribe({
      next: (value: string) => this.triggerUpdate(value),
    });
  }

  ngOnDestroy() {
    this.inputSubscription?.unsubscribe();
  }

  inputValueChange(event: InputEvent): void {
    this.valueChangeSubject.next(event);
  }

  triggerUpdate(inputValue: string): void {
    if (inputValue.length > 2) {
      this.dataConfiguratorService?.update({
        search: inputValue,
      });
    } else if (!inputValue.length) {
      this.dataConfiguratorService?.update({
        search: undefined,
      });
    }
  }
}
