import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ToJson } from '@spryker/utils';
import { merge, Subject, zip } from 'rxjs';
import {
  filter,
  map,
  pairwise,
  share,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { NotificationInputs } from '../notification-inputs';
import { NotificationViewComponent } from '../notification-view/notification-view.component';
import { NotificationService } from '../notification.service';
import {
  NotificationConfig,
  NotificationContext,
  NotificationData,
} from '../types';

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
export class NotificationComponent
  extends NotificationInputs
  implements OnChanges, OnDestroy {
  @Input() @ToJson() floatingConfig?: NotificationConfig;

  @ViewChild(NotificationViewComponent)
  notificationViewComponent?: NotificationViewComponent;

  @ContentChild('titleTpl') contentTitleTpl?: TemplateRef<NotificationContext>;
  @ContentChild('descriptionTpl') contentDescriptionTpl?: TemplateRef<
    NotificationContext
  >;

  @ViewChild('titleInnerTpl', { static: true }) innerTitleTpl?: TemplateRef<
    NotificationContext
  >;
  @ViewChild('descriptionInnerTpl', { static: true })
  innerDescriptionTpl?: TemplateRef<NotificationContext>;

  get titleTpl() {
    return this.contentTitleTpl ?? this.innerTitleTpl;
  }

  get descriptionTpl() {
    return this.contentDescriptionTpl ?? this.innerDescriptionTpl;
  }

  private destroyed$ = new Subject<void>();
  private closeFloating$ = new Subject<void>();
  private updateFloatingData$ = new Subject<void>();

  private floatingData$ = this.updateFloatingData$.pipe(
    map(
      () =>
        ({
          ...this.floatingConfig,
          type: this.type,
          title: this.titleTpl ?? '',
          description: this.descriptionTpl,
          closeable: this.closeable,
        } as NotificationData),
    ),
  );

  private floatingRef$ = this.floatingData$.pipe(
    filter(() => this.floating),
    map((data) => this.notificationService.show(data)),
    share(),
  );

  private floatingClosed$ = this.floatingRef$.pipe(
    switchMap((floatingRef) =>
      floatingRef.afterClose().pipe(take(1), takeUntil(this.closeFloating$)),
    ),
    tap(() => this.close()),
  );

  private closingFloating$ = zip(this.floatingRef$, this.closeFloating$).pipe(
    tap(([floatingRef]) => floatingRef.close()),
  );

  private closePrevFloating$ = this.floatingRef$.pipe(
    pairwise(),
    tap(([prevFloatingRef]) => prevFloatingRef.close()),
  );

  private floatingSink$ = merge(
    this.floatingClosed$,
    this.closingFloating$,
    this.closePrevFloating$,
  );

  constructor(
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnChanges(): void {
    if (this.floating) {
      this.updateFloatingData$.next();
    } else {
      this.closeFloating$.next();
    }
  }

  ngAfterViewInit(): void {
    this.floatingSink$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.cdr.markForCheck());

    this.updateFloatingData$.next();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.updateFloatingData$.complete();
    this.close();
  }

  close(): void {
    this.notificationViewComponent?.close();
    this.closeFloating$.next();
    this.closed.emit();
    this.cdr.markForCheck();
  }
}
