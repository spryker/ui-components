import { UnsavedChangesGuard } from './guard';
import { UnsavedChangesMonitor } from './monitor';

export abstract class UnsavedChangesGuardToken implements UnsavedChangesGuard {
  abstract attachMonitor(monitor: UnsavedChangesMonitor): void;
  abstract detachMonitor(monitor: UnsavedChangesMonitor): void;
  abstract init(): void;
  abstract dispose(): void;
}
