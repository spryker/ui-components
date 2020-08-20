import { ReplaySubject, Observable } from 'rxjs';

import { DrawerOptions, DrawerData } from './drawer-options';

export class DrawerRef<D = DrawerData> {
  constructor(
    public options: DrawerOptions<D>,
    private closeFn: () => void,
    private maximizeFn: () => void,
    private minimizeFn: () => void,
    private refreshDrawerFn: () => void,
    private afterClosed$: Observable<void>,
  ) {}

  close(): void {
    this.closeFn();
  }

  afterClosed(): Observable<void> {
    return this.afterClosed$;
  }

  minimize(): void {
    this.minimizeFn();
  }

  maximize(): void {
    this.maximizeFn();
  }

  refreshDrawer(): void {
    this.refreshDrawerFn();
  }
}
