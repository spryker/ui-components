export interface DrawerData {
  [key: string]: any;
}

export class DrawerOptions<D = DrawerData> {
  readonly closeable: boolean;
  readonly resizable: boolean;
  readonly width: string;
  readonly hasBackdrop: boolean;
  readonly data?: D;

  constructor({
    closeable = true,
    resizable = true,
    width = '50%',
    hasBackdrop = false,
    data,
  }: Partial<DrawerOptions<D>> = {}) {
    this.closeable = closeable;
    this.resizable = resizable;
    this.width = width;
    this.hasBackdrop = hasBackdrop;
    this.data = data;
  }
}
