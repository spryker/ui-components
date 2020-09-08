import { Injectable } from '@angular/core';

import { UnsavedChangesGuardBase } from './unsaved-changes-guard-base';
import { UnsavedChangesRootGuardsToken } from './unsaved-changes-guard-root.token';
import { UnsavedChangesMonitor } from './unsaved-changes-monitor';

@Injectable({ providedIn: 'root' })
export class UnsavedChangesGuardService extends UnsavedChangesGuardBase {
  private rootGuards = this.injector.get(UnsavedChangesRootGuardsToken, null);

  attachMonitor(monitor: UnsavedChangesMonitor): void {
    super.attachMonitor(monitor);

    this.rootGuards?.forEach(guard => guard.attachMonitor(monitor));
  }

  detachMonitor(monitor: UnsavedChangesMonitor): void {
    super.detachMonitor(monitor);

    this.rootGuards?.forEach(guard => guard.detachMonitor(monitor));
  }

  dispose(): void {
    super.dispose();

    this.rootGuards?.forEach(guard => guard.dispose());
    this.rootGuards = null;
  }
}
