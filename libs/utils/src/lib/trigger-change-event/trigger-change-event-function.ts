export function triggerChangeEvent(target: HTMLElement): void {
    target.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
}
