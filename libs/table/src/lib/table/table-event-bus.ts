import { Observable, Subject } from 'rxjs';

/** @private */
export class TableEventBus {
  private listeners: Record<string, Subject<unknown> | undefined> = {};

  constructor(private handler: (event: string, data: unknown) => void) {}

  emit<D = unknown>(feature: string, data: D, eventName?: string) {
    const hash = this.hashEvent(feature, eventName);
    const listener = this.listeners[hash];

    if (listener) {
      listener.next(data);
    }

    this.handler(hash, data);
  }

  on<D = unknown>(feature: string, eventName?: string): Observable<D> {
    const hash = this.hashEvent(feature, eventName);
    const listener =
      this.listeners[hash] || (this.listeners[hash] = new Subject<unknown>());

    return listener.asObservable() as Observable<D>;
  }

  private hashEvent(feature: string, eventName?: string): string {
    return eventName ? `${feature}:${eventName}` : feature;
  }
}
