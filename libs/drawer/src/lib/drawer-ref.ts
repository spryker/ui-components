import { ReplaySubject, Observable } from 'rxjs';

import { DrawerOptions } from './drawer-options';

export class DrawerRef {
  isFullScreen = false;
  width?: string;

  private originalWidth?: string;
  private afterClosed$ = new ReplaySubject<void>();

  constructor(public options: DrawerOptions, private closeFn: () => void) {
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
    this.isFullScreen = true;
    this.originalWidth = this.width;
    this.width = '100%';
  }

  maximize(): void {
    this.isFullScreen = false;
    this.width = this.originalWidth;
  }
}
