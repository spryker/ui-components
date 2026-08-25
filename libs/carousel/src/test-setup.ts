/* eslint-disable @nx/enforce-module-boundaries */

import '../../../config/test-setup';

/**
 * `Element.part` shim — jsdom 26 does not implement CSS Shadow Parts, and swiper 14 calls
 * `el.part.add(...)` in `SwiperContainer.render()` (swiper 12 assigned the property instead).
 *
 * The guard matters: this returns a plain object, not a real `DOMTokenList`, so once jsdom ships
 * shadow parts the shim must step aside rather than keep shadowing the real implementation.
 */
if (!('part' in Element.prototype)) {
    Object.defineProperty(Element.prototype, 'part', {
        configurable: true,
        get(this: Element) {
            const tokens = () => (this.getAttribute('part') ?? '').split(/\s+/).filter(Boolean);
            const write = (next: string[]) => this.setAttribute('part', next.join(' '));

            return {
                get value(): string {
                    return tokens().join(' ');
                },
                get length(): number {
                    return tokens().length;
                },
                contains: (token: string): boolean => tokens().includes(token),
                add: (...added: string[]): void => write([...new Set([...tokens(), ...added])]),
                remove: (...removed: string[]): void => write(tokens().filter((t) => !removed.includes(t))),
                toggle: (token: string): boolean => {
                    const has = tokens().includes(token);

                    write(has ? tokens().filter((t) => t !== token) : [...tokens(), token]);

                    return !has;
                },
                toString: (): string => tokens().join(' '),
            };
        },
    });
}
