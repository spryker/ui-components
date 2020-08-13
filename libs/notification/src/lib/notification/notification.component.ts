import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ToJson } from '@spryker/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotificationInputs } from '../notification-inputs';
import { NotificationRef } from '../notification-ref';
import { NotificationViewComponent } from '../notification-view/notification-view.component';
import { NotificationService } from '../notification.service';
import { NotificationConfig } from '../types';

@Component({
  selector: 'spy-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-notification',
  },
})
export class NotificationComponent extends NotificationInputs
  implements OnDestroy {
  @Input() @ToJson() floatingConfig?: NotificationConfig;

  @ViewChild(NotificationViewComponent)
  notificationViewComponent?: NotificationViewComponent;

  @ContentChild('titleTpl') titleTpl?: TemplateRef<NotificationRef>;
  @ContentChild('descriptionTpl') descriptionTpl?: TemplateRef<NotificationRef>;
  @ViewChild('titleInnerTpl') titleInnerTpl?: TemplateRef<HTMLElement>;
  @ViewChild('descriptionInnerTpl') descriptionInnerTpl?: TemplateRef<
    HTMLElement
  >;

  private notificationRef?: NotificationRef;
  private destroyed$ = new Subject<void>();

  constructor(public notificationService: NotificationService) {
    super();
  }

  ngAfterViewInit(): void {
    const floating = this.floating;

    if (floating) {
      const data = {
        ...this.floatingConfig,
        description: this.descriptionTpl ?? (this.descriptionInnerTpl as any),
        type: this.type,
        title: this.titleTpl ?? (this.titleInnerTpl as any),
        closeable: this.closeable,
      };

      this.notificationRef = this.notificationService.show(data);
      this.notificationRef
        .afterClose()
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => this.closed.emit());
    }
  }

  ngOnDestroy(): void {
    this.notificationRef?.close();
    this.destroyed$.next();
  }

  close(): void {
    this.notificationRef?.close();
    this.notificationViewComponent?.close();
  }
}
