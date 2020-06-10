import { ReplaySubject, Observable } from 'rxjs';

import { DrawerOptions } from './drawer-options';

export class DrawerRef {
  private afterClosed$ = new ReplaySubject<void>();

  constructor(public options: DrawerOptions, private closeFn: () => void) {}

  close(): void {
    this.closeFn();
    this.afterClosed$.next();
    this.afterClosed$.complete();
  }

  afterClosed(): Observable<void> {
    return this.afterClosed$.asObservable();
  }

  minimize(): void {}

  maximize(): void {}
}
