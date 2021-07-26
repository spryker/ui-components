import { UnsavedChangesMonitor } from './unsaved-changes-monitor';

export interface UnsavedChangesGuard {
  attachMonitor(monitor: UnsavedChangesMonitor): void;
  detachMonitor(monitor: UnsavedChangesMonitor): void;
  init(): void;
  dispose(): void;
}
