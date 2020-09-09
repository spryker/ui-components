import {
  AbstractType,
  Injectable,
  InjectionToken,
  Provider,
  Type,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import {
  DrawerCloseInterceptionEvent,
  DrawerContainerComponent,
} from '@spryker/drawer';
import {
  InterceptionComposableFactory,
  InterceptorService,
} from '@spryker/interception';
import {
  UnsavedChangesGuardBase,
  UnsavedChangesGuardToken,
} from '@spryker/unsaved-changes';

/**
 * Dynamically provides {@link UnsavedChangesDrawerGuard} for the drawer component.
 */
@Injectable({ providedIn: 'root' })
export class UnsavedChangesDrawerGuardComposableFactory
  implements InterceptionComposableFactory {
  canApply(token: unknown): boolean {
    return token && token instanceof DrawerContainerComponent;
  }

  getServiceProviders(): Provider[] {
    return [
      UnsavedChangesDrawerGuard,
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
  private destroyed$ = new Subject<void>();

  private interceptorService = this.injector.get(InterceptorService);

  init(): void {
    super.init();

    this.interceptorService
      .intercept(DrawerCloseInterceptionEvent, () =>
        this.hasDirtyStatus$.pipe(filter(hasDirtyStatus => !hasDirtyStatus)),
      )
      // TODO update with ModalService.openConfirm() according to tech spec
      .pipe(takeUntil(this.destroyed$))
      .subscribe();
  }

  dispose() {
    super.dispose();

    this.destroyed$.next();
  }
}
