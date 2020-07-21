import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IconRemoveModule } from '@spryker/icon/icons';
import { ApplyContextsDirective, ToBoolean } from '@spryker/utils';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { Subject } from 'rxjs';

@Component({
  selector: 'spy-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-notification',
  },
  providers: [ApplyContextsDirective],
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() type: 'info' | 'error' | 'warning' | 'success' = 'info';
  @Input() @ToBoolean() closeable = false;

  @Output() closed = new EventEmitter<void>();

  @ViewChild(NzAlertComponent) nzAlertComponent?: NzAlertComponent;

  removeIcon = IconRemoveModule.icon;

  private destroyed$ = new Subject<void>();

  constructor(private applyContextsDirective: ApplyContextsDirective) {}

  ngOnInit(): void {
    this.applyContextsDirective.ngOnInit();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  close(): boolean {
    this.nzAlertComponent?.closeAlert();

    return this.closeable;
  }
}
