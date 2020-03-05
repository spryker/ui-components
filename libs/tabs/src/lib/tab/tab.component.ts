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
} from '@angular/core';

@Component({
  selector: 'spy-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TabComponent {
  @Input() title = '';
  @Input() disabled = false;
  private _hasWarning = false;
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
