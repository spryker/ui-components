import { UnsavedChangesGuard } from './unsaved-changes-guard';
import { UnsavedChangesMonitor } from './unsaved-changes-monitor';

/**
 * Represents every guard capability and also acts as a DI token to be able to locate it in the Angular’s DI system so it’s represented as an abstract class.
 */
export abstract class UnsavedChangesGuardToken implements UnsavedChangesGuard {
  abstract attachMonitor(monitor: UnsavedChangesMonitor): void;
  abstract detachMonitor(monitor: UnsavedChangesMonitor): void;
  abstract init(): void;
  abstract dispose(): void;
}
