import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ToJson } from '@spryker/utils';
import { NzAutocompleteComponent } from 'ng-zorro-antd/auto-complete';
import { AutocompleteValue } from './types';

@Component({
  selector: 'spy-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit {
  @Input() @ToJson() options?: AutocompleteValue[];

  @ViewChild(NzAutocompleteComponent, { static: true })
  nzAutocompleteComponent?: NzAutocompleteComponent;
  filteredOptions?: AutocompleteValue[];

  ngOnInit(): void {
    this.filteredOptions = this.options ?? [];
  }
}
