import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UnsavedChangesGuardBase } from '@spryker/unsaved-changes';

/**
 * Responsible to listen to beforeunload event of browser’s Window object and if it’s monitors has dirty status - trigger confirmation dialog before page will be unloaded.
 */
@Injectable({ providedIn: 'root' })
export class UnsavedChangesBrowserGuard extends UnsavedChangesGuardBase {
  private destroyed$ = new Subject<void>();

  private hasDirtyStatus = false;

  constructor(injector: Injector) {
    super(injector);
  }

  init(): void {
    super.init();

    this.hasDirtyStatus$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(hasDirtyStatus => (this.hasDirtyStatus = hasDirtyStatus));

    this.beforeUnload = this.beforeUnload.bind(this);

    window.addEventListener('beforeunload', this.beforeUnload);
  }

  dispose(): void {
    super.dispose();

    this.destroyed$.next();

    window.removeEventListener('beforeunload', this.beforeUnload);
  }

  private beforeUnload(event: Event) {
    if (!this.hasDirtyStatus) {
      return;
    }

    event.preventDefault();
    (event as any).returnValue = '';
  }
}
