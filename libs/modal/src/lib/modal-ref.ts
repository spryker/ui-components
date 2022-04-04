import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  ModalRef,
  InferModalResult,
  ModalRenderingRef,
  InferModalData,
} from './types';

export type ModalRenderingFn<T> = (
  modalRef: ModalRef<T, any>,
) => ModalRenderingRef<T, any>;

export class ModalRefImpl<T> extends ModalRef<T, any> {
  private static COUNTER = 0;

  id = `modal-id-${ModalRefImpl.COUNTER++}`;

  private closed$ = new Subject<InferModalResult<T> | undefined>();
  private renderingRef!: ModalRenderingRef<T, any>;
  private disposed = false;

  constructor(
    private data: InferModalData<T> | undefined,
    private renderFn: ModalRenderingFn<T>,
    private onDestroy: () => void,
  ) {
    super();
  }

  setRenderingRef(renderingRef: ModalRenderingRef<T, any>): void {
    this.assertDisposed();

    this.renderingRef = renderingRef;
    this.extras = renderingRef.getExtras();
  }

  getData(): InferModalData<T> | undefined {
    this.assertDisposed();

    return this.data;
  }

  updateData(data: InferModalData<T>): void {
    this.assertDisposed();

    this.data = data;
    this.renderingRef.updateData(data);
  }

  close(result?: InferModalResult<T>): void {
    if (this.disposed) {
      return;
    }

    this.closed$.next(result);
    this.closed$.complete();

    this.destroy();
  }

  afterClosed(): Observable<InferModalResult<T>> {
    return this.closed$.pipe(filter((res) => !!res)) as any;
  }

  afterCancelled(): Observable<void> {
    return this.closed$.pipe(filter((res) => !res)) as any;
  }

  afterDismissed(): Observable<InferModalResult<T> | undefined> {
    return this.closed$;
  }

  reset(): void {
    this.assertDisposed();

    this.renderingRef.dispose();
    this.setRenderingRef(this.renderFn(this));
  }

  dispose(): void {
    this.close();
  }

  private destroy(): void {
    // Refs cleanup requires assignment to `undefined`
    /* eslint-disable @typescript-eslint/no-non-null-assertion */

    if (this.disposed) {
      return;
    }

    this.disposed = true;

    this.onDestroy();
    this.onDestroy = undefined!;
    this.renderingRef = undefined!;
    this.renderFn = undefined!;
    this.data = undefined;
    this.extras = undefined;

    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }

  private assertDisposed(): never | void {
    if (this.disposed) {
      throw new Error('ModalRef was already disposed!');
    }
  }
}
