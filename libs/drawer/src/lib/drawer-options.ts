import { Injector } from '@angular/core';

export interface DrawerData {
  [key: string]: any;
}

export class DrawerOptionsBase<D = DrawerData> {
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
  }: Partial<DrawerOptionsBase<D>> = {}) {
    this.closeable = closeable;
    this.resizable = resizable;
    this.width = width;
    this.hasBackdrop = hasBackdrop;
    this.data = data;
  }
}

export class DrawerOptionsComponent<
  D = DrawerData,
  T = {}
  > extends DrawerOptionsBase<D> {
  readonly injector?: Injector;
  readonly inputs?: Partial<Record<keyof T, unknown>>;
  readonly outputs?: Partial<Record<keyof T, (event?: unknown) => void>>;

  constructor({
    injector,
    inputs,
    outputs,
    ...options
  }: Partial<DrawerOptionsComponent<D, T>> = {}) {
    super(options);
    this.injector = injector;
    this.inputs = inputs;
    this.outputs = outputs;
  }
}

export class DrawerOptionsTemplate<
  D = DrawerData,
  C = {}
  > extends DrawerOptionsBase<D> {
  readonly context?: C;

  constructor({
    context,
    ...options
  }: Partial<DrawerOptionsTemplate<D, C>> = {}) {
    super(options);
    this.context = context;
  }
}

export type DrawerOptions<D = DrawerData> =
  | DrawerOptionsComponent<D>
  | DrawerOptionsTemplate<D>;
