import { Injector } from '@angular/core';

export interface DrawerData {
  [key: string]: any;
}

export class DrawerOptions<D = DrawerData> {
  readonly closeable: boolean;
  readonly resizable: boolean;
  readonly width: string;
  readonly hasBackdrop: boolean;
  readonly data?: D;
  readonly injector?: Injector;

  constructor({
    closeable = true,
    resizable = true,
    width = '50%',
    hasBackdrop = false,
    data,
    injector,
  }: Partial<DrawerOptions<D>> = {}) {
    this.closeable = closeable;
    this.resizable = resizable;
    this.width = width;
    this.hasBackdrop = hasBackdrop;
    this.data = data;
    this.injector = injector;
  }
}
