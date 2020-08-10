import { Observable } from 'rxjs';

import { UnsavedChangesMonitor, UnsavedChangesMonitorStatus } from './monitor';

export abstract class UnsavedChangesMonitorToken
  implements UnsavedChangesMonitor {
  abstract getStatus(): Observable<UnsavedChangesMonitorStatus>;
}
