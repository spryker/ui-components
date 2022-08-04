import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IconRemoveModule } from '@spryker/icon/icons';
import { ApplyContextsDirective } from '@spryker/utils';
import { NzAlertComponent } from 'ng-zorro-antd/alert';

import { NotificationInputs } from '../notification-inputs';

@Component({
  selector: 'spy-notification-view',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-notification-view',
  },
  providers: [ApplyContextsDirective],
})
export class NotificationViewComponent
  extends NotificationInputs
  implements OnInit
{
  @ViewChild(NzAlertComponent) nzAlertComponent?: NzAlertComponent;

  removeIcon = IconRemoveModule.icon;

  constructor(private applyContextsDirective: ApplyContextsDirective) {
    super();
  }

  ngOnInit(): void {
    this.applyContextsDirective.ngOnInit();
  }

  onCloseHandler(event: Event) {
    if (this.floating) {
      event.stopPropagation();
    }

    this.closed.emit();
  }

  close(): void {
    this.nzAlertComponent?.closeAlert();
    this.closed.emit();
  }
}
