import { Injectable, Injector, inject } from '@angular/core';
import { InterceptorService } from '@spryker/interception';
import { I18nService } from '@spryker/locale';
import { ModalService } from '@spryker/modal';
import { NavigationRedirectInterceptionEvent } from '@spryker/navigation';
import { UnsavedChangesGuardBase, UnsavedChangesGuardService } from '@spryker/unsaved-changes';
import { combineLatest, EMPTY, of, Subject } from 'rxjs';
import { switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';

/**
 *  Responsible to intercept redirect events from the navigation component and if any monitor has dirty status - prompt a user to confirm to navigate away.
 */
@Injectable({ providedIn: 'root' })
export class UnsavedChangesNavigationGuard extends UnsavedChangesGuardBase {
    private interceptorService: InterceptorService;
    private modalService: ModalService;
    private i18nService: I18nService;

    private destroyed$ = new Subject<void>();

    constructor() {
        super();

        this.interceptorService = this.injector.get(InterceptorService);
        this.modalService = this.injector.get(ModalService);
        this.i18nService = this.injector.get(I18nService);

        const translations$ = combineLatest([
            this.i18nService.translate('unsaved-changes.confirmation-title'),
            this.i18nService.translate('unsaved-changes.confirmation-ok'),
            this.i18nService.translate('unsaved-changes.confirmation-cancel'),
        ]);

        this.interceptorService
            .intercept(NavigationRedirectInterceptionEvent, () =>
                this.hasDirtyStatus$.pipe(
                    take(1),
                    withLatestFrom(translations$),
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
                                      switchMap((isDiscard) => {
                                          if (!isDiscard) {
                                              return EMPTY;
                                          }

                                          this.injector.get(UnsavedChangesGuardService).resetMonitors();

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
