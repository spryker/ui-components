import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UnsavedChangesGuardBase } from './guard-base';

@Injectable({ providedIn: 'root' })
export class UnsavedChangesBrowserGuard extends UnsavedChangesGuardBase {
  private destroyed$ = new Subject<void>();

  private hasDirtyStatus = false;

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

  private beforeUnload(e: Event) {
    if (!this.hasDirtyStatus) {
      return;
    }

    e.preventDefault();
    (e as any).returnValue = '';
  }
}
