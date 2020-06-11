import { ReplaySubject, Observable } from 'rxjs';

import { DrawerOptions } from './drawer-options';

export class DrawerRef {
  isFullScreen = false;
  width?: string;

  private originalWidth?: string;
  private afterClosed$ = new ReplaySubject<void>();

  constructor(
    public options: DrawerOptions,
    private closeFn: () => void,
    private maximizeFn: () => void,
    private minimizeFn: () => void,
  ) {
    this.width = this.options.width;
  }

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
