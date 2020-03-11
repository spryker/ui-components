import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';

@Component({
  selector: 'spy-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TabComponent {
  @Input() title = '';
  @Input() @ToBoolean() disabled = false;
  @ToBoolean() private _hasWarning = false;
  @Input()
  set hasWarning(value: boolean) {
    this._hasWarning = value;

    this.hasWarningChange.emit(this._hasWarning);
    this.cdr.detectChanges();
  }

  get hasWarning(): boolean {
    return this._hasWarning;
  }

  @Output() hasWarningChange = new EventEmitter<boolean>();

  @ViewChild('contentTpl') template!: TemplateRef<void>;
  @ViewChild('titleTpl') titleTemplate!: TemplateRef<void>;

  constructor(private cdr: ChangeDetectorRef) {}
}
