export interface DrawerData {
  [key: string]: any;
}

export class DrawerOptions {
  readonly closeable: boolean;
  readonly resizable: boolean;
  readonly width: string;
  readonly hasBackdrop: boolean;
  readonly data?: DrawerData;

  constructor({
    closeable = true,
    resizable = true,
    width = '350px',
    hasBackdrop = false,
    data,
  }: Partial<DrawerOptions> = {}) {
    this.closeable = closeable;
    this.resizable = resizable;
    this.width = width;
    this.hasBackdrop = hasBackdrop;
    this.data = data;
  }
}
