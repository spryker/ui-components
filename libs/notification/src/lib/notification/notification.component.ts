import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
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
  @ViewChild('titleHolder')
  titleHolder?: ElementRef<HTMLElement>;
  @ViewChild('descriptionHolder')
  descriptionHolder?: ElementRef<HTMLElement>;
  @ContentChild('titleTpl') titleTpl?: TemplateRef<NotificationRef>;
  @ContentChild('descriptionTpl') descriptionTpl?: TemplateRef<NotificationRef>;
  @ViewChild('titleElem') titleElem?: ElementRef<HTMLElement>;
  @ViewChild('descriptionElem') descriptionElem?: ElementRef<HTMLElement>;

  private notificationRef?: NotificationRef;
  private destroyed$ = new Subject<void>();

  constructor(
    public notificationService: NotificationService,
    private renderer: Renderer2,
  ) {
    super();
  }

  ngAfterViewInit(): void {
    const floating = this.floating;
    const descriptionSlot = this.descriptionElem?.nativeElement;
    const titleSlot = this.titleElem?.nativeElement;

    if (floating) {
      const data = {
        ...this.floatingConfig,
        description:
          (this.descriptionTpl as any) ?? descriptionSlot?.textContent,
        type: this.type,
        title: (this.titleTpl as any) ?? titleSlot?.textContent,
        closeable: this.closeable,
      };

      this.notificationRef = this.notificationService.show(data);
      this.notificationRef
        .afterClose()
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => this.closed.emit());
    }

    if (!floating) {
      this.renderer.setProperty(
        this.titleHolder?.nativeElement,
        'innerHTML',
        titleSlot?.innerHTML,
      );

      this.renderer.setProperty(
        this.descriptionHolder?.nativeElement,
        'innerHTML',
        descriptionSlot?.innerHTML,
      );
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
