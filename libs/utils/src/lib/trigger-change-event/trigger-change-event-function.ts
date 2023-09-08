export function triggerChangeEvent(target: HTMLElement): void {
    target.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    target.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
}
