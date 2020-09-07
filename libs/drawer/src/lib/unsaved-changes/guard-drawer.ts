import {
  AbstractType,
  Injectable,
  InjectionToken,
  Provider,
  Type,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { DrawerContainerComponent } from '../drawer-container/drawer-container.component';
import { DrawerCloseInterceptionEvent } from '../drawer-interception';
import {
  InterceptionComposableFactory,
  InterceptorService,
} from '@spryker/interception';
import { UnsavedChangesGuardBase } from './guard-base';
import { UnsavedChangesGuardToken } from './guard.token';

@Injectable({ providedIn: 'root' })
export class UnsavedChangesDrawerGuardComposableFactory
  implements InterceptionComposableFactory {
  canApply(token: unknown): boolean {
    return token && token instanceof DrawerContainerComponent;
  }

  getServiceProviders(): Provider[] {
    return [
      {
        provide: UnsavedChangesDrawerGuard,
        useClass: UnsavedChangesDrawerGuard,
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
      .pipe(takeUntil(this.destroyed$))
      .subscribe();
  }

  dispose() {
    super.dispose();

    this.destroyed$.next();
  }
}
