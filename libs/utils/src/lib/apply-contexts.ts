export function applyContexts(hostElem: Element) {
  const ctxTypes: {
    [key: string]: any;
  } = {};
  const ctxs: string[] = [];

  let elem: Element | null = hostElem;
  while ((elem = elem.parentElement)) {
    for (const cls of Array.from(elem.classList)) {
      if (!cls.startsWith('ctx-')) {
        continue;
      }

      const ctxType = cls.match(/^ctx-([^-]+)-/)?.[1];

      if (!ctxType) {
        continue;
      }

      if (ctxTypes[ctxType]) {
        continue;
      }

      ctxTypes[ctxType] = true;
      ctxs.push(cls);
    }
  }

  ctxs.forEach(ctx => hostElem.classList.add(`host-${ctx}`));
}
