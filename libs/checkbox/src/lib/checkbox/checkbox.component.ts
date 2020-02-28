import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { ToJson } from '@spryker/utils';

@Component({
  selector: 'spy-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent implements OnInit {
  @Input() spyId = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() indeterminate = false;
  @Input() required = false;
  @Input() name = '';
  @Input() @ToJson() attrs: Record<string, string> = {};
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
