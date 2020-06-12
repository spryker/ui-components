import { ReplaySubject, Observable } from 'rxjs';

import { DrawerOptions, DrawerData } from './drawer-options';

export class DrawerRef<D = DrawerData> {
  isFullScreen = false;

  private afterClosed$ = new ReplaySubject<void>();

  constructor(
    public options: DrawerOptions<D>,
    private closeFn: () => void,
    private maximizeFn: () => void,
    private minimizeFn: () => void,
  ) {}

  close(): void {
    this.closeFn();
    this.afterClosed$.next();
    this.afterClosed$.complete();
  }

  afterClosed(): Observable<void> {
    return this.afterClosed$.asObservable();
  }

  minimize(): void {
    this.minimizeFn();
  }

  maximize(): void {
    this.maximizeFn();
  }
}
