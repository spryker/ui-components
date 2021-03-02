import { Observable, ReplaySubject } from 'rxjs';
import { shareReplay, switchAll } from 'rxjs/operators';

import { DrawerData, DrawerOptions } from './drawer-options';

export class DrawerRef<
  D = DrawerData,
  O extends DrawerOptions<D> = DrawerOptions<D>
> {
  private setClose$ = new ReplaySubject<Observable<void>>(1);
  private afterClosed$ = this.setClose$.pipe(
    switchAll(),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  constructor(
    public options: O,
    private closeFn: () => Observable<void>,
    private maximizeFn: () => void,
    private minimizeFn: () => void,
    private refreshDrawerFn: () => void,
  ) {}

  close(): Observable<void> {
    const close$ = this.closeFn().pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.setClose$.next(close$);

    return close$;
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
