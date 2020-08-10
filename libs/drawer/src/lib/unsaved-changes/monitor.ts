import { Observable } from 'rxjs';

export enum UnsavedChangesMonitorStatus {
  Clean,
  Dirty,
}

export interface UnsavedChangesMonitor {
  getStatus(): Observable<UnsavedChangesMonitorStatus>;
}
