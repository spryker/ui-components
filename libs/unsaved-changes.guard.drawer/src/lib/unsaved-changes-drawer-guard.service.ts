import { AbstractType, Injectable, InjectionToken, Injector, Provider, Type, inject } from '@angular/core';
import { DrawerCloseInterceptionEvent, DrawerContainerComponent } from '@spryker/drawer';
import { InterceptionComposableFactory, InterceptorService } from '@spryker/interception';
import { I18nService } from '@spryker/locale';
import { ModalService } from '@spryker/modal';
import { UnsavedChangesGuardBase, UnsavedChangesGuardToken } from '@spryker/unsaved-changes';
import { combineLatest, EMPTY, of, Subject } from 'rxjs';
import { switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';

/**
 * Dynamically provides {@link UnsavedChangesDrawerGuard} for the drawer component.
 */
@Injectable()
export class UnsavedChangesDrawerGuardComposableFactory implements InterceptionComposableFactory {
    canApply(token: unknown): boolean {
        return token && token instanceof DrawerContainerComponent;
    }

    getServiceProviders(): Provider[] {
        return [
            {
                provide: UnsavedChangesDrawerGuard,
                useClass: UnsavedChangesDrawerGuard,
                deps: [Injector],
            },
            {
                provide: UnsavedChangesGuardToken,
                useExisting: UnsavedChangesDrawerGuard,
            },
        ];
    }

    getServiceToken(): Type<any> | AbstractType<any> | InjectionToken<any> {
        return UnsavedChangesDrawerGuard;
    }
}

/**
 *  Responsible to intercept close events from the drawer component and if it’s monitors has dirty status - prompt a user to confirm to close the drawer in the form of a modal.
 */
@Injectable()
export class UnsavedChangesDrawerGuard extends UnsavedChangesGuardBase {
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
            .intercept(DrawerCloseInterceptionEvent, () =>
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
                                  .pipe(switchMap((isDiscard) => (isDiscard ? of(null) : EMPTY)))
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
