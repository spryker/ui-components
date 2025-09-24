import { Observable } from 'rxjs';

import { UnsavedChangesMonitor, UnsavedChangesMonitorStatus } from './unsaved-changes-monitor';

/**
 * Represents every monitor capability and also acts as a DI token to be able to locate it in the Angular’s DI system so it’s represented as an abstract class.
 */
export abstract class UnsavedChangesMonitorToken implements UnsavedChangesMonitor {
    abstract getStatus(): Observable<UnsavedChangesMonitorStatus>;
    abstract reset(): void;
}
