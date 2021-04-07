import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
  SimpleChanges,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';
import { IconErrorModule } from '@spryker/icon/icons';

@Component({
  selector: 'spy-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TabComponent {
  iconErrorReference = IconErrorModule;
  @Input() spyTitle = '';
  @Input() @ToBoolean() disabled = false;
  @Input() @ToBoolean() hasWarning = false;
  @Input() iconName = '';

  @Output() hasWarningChange = new EventEmitter<boolean>();

  @ViewChild('contentTpl') template!: TemplateRef<void>;
  @ViewChild('titleTpl') titleTemplate!: TemplateRef<void>;

  ngOnChanges(changes: SimpleChanges): void {
    if ('hasWarning' in changes) {
      this.hasWarningChange.emit(this.hasWarning);
    }
  }
}
