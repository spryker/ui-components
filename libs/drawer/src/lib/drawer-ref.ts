import { ReplaySubject } from 'rxjs';

import { DrawerOptions } from './drawer-options';

export class DrawerRef {
  private afterClosed$ = new ReplaySubject<void>();

  constructor(public options: DrawerOptions, private closeFn: () => void) {}

  close() {
    this.closeFn();
    this.afterClosed$.next();
    this.afterClosed$.complete();
  }

  afterClosed() {
    return this.afterClosed$.asObservable();
  }
}
