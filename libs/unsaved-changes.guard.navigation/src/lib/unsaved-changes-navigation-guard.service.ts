import { Injectable } from '@angular/core';
import { InterceptorService } from '@spryker/interception';
import { I18nService } from '@spryker/locale';
import { ModalService } from '@spryker/modal';
import { NavigationRedirectInterceptionEvent } from '@spryker/navigation';
import {
  UnsavedChangesGuardBase,
  UnsavedChangesGuardService,
} from '@spryker/unsaved-changes';
import { combineLatest, EMPTY, of, Subject } from 'rxjs';
import { switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';

/**
 *  Responsible to intercept close events from the drawer component and if it’s monitors has dirty status - prompt a user to confirm to close the drawer in the form of a modal.
 */
@Injectable({ providedIn: 'root' })
export class UnsavedChangesNavigationGuard extends UnsavedChangesGuardBase {
  private interceptorService = this.injector.get(InterceptorService);
  private modalService = this.injector.get(ModalService);
  private i18nService = this.injector.get(I18nService);

  private destroyed$ = new Subject<void>();
  private translations$ = combineLatest([
    this.i18nService.translate('unsaved-changes.guard.navigation.title'),
    this.i18nService.translate('unsaved-changes.guard.navigation.ok'),
    this.i18nService.translate('unsaved-changes.guard.navigation.cancel'),
  ]);

  init(): void {
    super.init();

    this.interceptorService
      .intercept(NavigationRedirectInterceptionEvent, () =>
        this.hasDirtyStatus$.pipe(
          take(1),
          withLatestFrom(this.translations$),
          switchMap(([hasDirtyStatus, [title, okText, cancelText]]) =>
            hasDirtyStatus
              ? this.modalService
                  .openConfirm({
                    title,
                    okText,
                    cancelText,
                  })
                  .afterDismissed()
                  .pipe(
                    switchMap(isDiscard => {
                      if (!isDiscard) {
                        return EMPTY;
                      }

                      this.injector
                        .get(UnsavedChangesGuardService)
                        .resetMonitors();

                      return of(null);
                    }),
                  )
              : of(null),
          ),
        ),
      )
      .pipe(takeUntil(this.destroyed$))
      .subscribe();
  }

  dispose() {
    super.dispose();

    this.destroyed$.next();
  }
}
