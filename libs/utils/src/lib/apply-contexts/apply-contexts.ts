import { Observable } from 'rxjs';

import {
  APPLY_CONTEXTS_OBSERVE_EVENT,
  APPLY_CONTEXTS_UNOBSERVE_EVENT,
  CONTEXTS_PREFIX,
  ContextsObserveEvent,
  ContextsObserver,
  ContextsObserverData,
  ContextsUnobserveEvent,
  FULL_CONTEXTS_PREFIX,
  HOST_CONTEXTS_PREFIX,
} from './apply-contexts.directive';

const ctxRegex = new RegExp(`^${CONTEXTS_PREFIX}([^-]+)-`);

export function applyContexts(hostElem: Element) {
  function updateContexts(updateEvent?: ContextsObserverData) {
    const ctxTypes: {
      [key: string]: any;
    } = {};
    const ctxs: string[] = [];

    let elem: Element | null = hostElem;
    while ((elem = elem.parentElement)) {
      for (const cls of Array.from(elem.classList)) {
        if (!cls.startsWith(CONTEXTS_PREFIX)) {
          continue;
        }

        const ctxType = cls.match(ctxRegex)?.[1];

        if (!ctxType || ctxTypes[ctxType]) {
          continue;
        }

        ctxTypes[ctxType] = true;
        ctxs.push(cls);
      }
    }

    // Cleanup previous context classes on update event
    if (updateEvent) {
      Array.from(hostElem.classList)
        .filter(cls => cls.startsWith(`${FULL_CONTEXTS_PREFIX}`))
        .forEach(ctxCls => hostElem.classList.remove(ctxCls));
    }

    ctxs.forEach(ctx =>
      hostElem.classList.add(`${HOST_CONTEXTS_PREFIX}${ctx}`),
    );

    return ctxs;
  }

  updateContexts();

  return new Observable<string[]>(subscriber => {
    const contextObserver: ContextsObserver = data =>
      subscriber.next(updateContexts(data));

    const observeEvent: ContextsObserveEvent = new CustomEvent(
      APPLY_CONTEXTS_OBSERVE_EVENT,
      {
        bubbles: true,
        cancelable: true,
        detail: contextObserver,
      },
    );

    hostElem.dispatchEvent(observeEvent);

    return () => {
      const unobserveEvent: ContextsUnobserveEvent = new CustomEvent(
        APPLY_CONTEXTS_UNOBSERVE_EVENT,
        {
          bubbles: true,
          cancelable: true,
          detail: contextObserver,
        },
      );

      hostElem.dispatchEvent(unobserveEvent);
    };
  });
}
