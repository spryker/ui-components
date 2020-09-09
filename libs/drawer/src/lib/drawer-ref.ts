import { Observable, ReplaySubject } from 'rxjs';
import { switchAll } from 'rxjs/operators';

import { DrawerData, DrawerOptions } from './drawer-options';

export class DrawerRef<D = DrawerData> {
  private setClose$ = new ReplaySubject<Observable<void>>(1);
  private afterClosed$ = this.setClose$.pipe(switchAll());

  constructor(
    public options: DrawerOptions<D>,
    private closeFn: () => Observable<void>,
    private maximizeFn: () => void,
    private minimizeFn: () => void,
    private refreshDrawerFn: () => void,
  ) {}

  close(): void {
    this.setClose$.next(this.closeFn());
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
