import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';
import { IconRemoveModule } from '@spryker/icon/icons';

@Component({
  selector: 'spy-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-tag',
    tabIndex: '-1',
  },
})
export class TagComponent implements OnInit {
  @Input() @ToBoolean() @HostBinding('class.spy-tag-disabled') disabled = false;
  @Input() @ToBoolean() removable = true;
  @Output() onRemove = new EventEmitter<MouseEvent>();
  icon = IconRemoveModule.icon;
  constructor() {}

  ngOnInit(): void {}

  removeTag(e: MouseEvent): void {
    this.onRemove.emit(e);
    console.log(e);
  }
}
