import { Observable } from 'rxjs';

export enum UnsavedChangesMonitorStatus {
  Clean,
  Dirty,
}

/**
 * Responsible for tracking changes to the data from a user.
 * Attaches to the elements in the view that represent the data.
 */
export interface UnsavedChangesMonitor {
  getStatus(): Observable<UnsavedChangesMonitorStatus>;
  reset(): void;
}
