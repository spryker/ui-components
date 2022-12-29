export interface ElementOffset {
    left: number;
    top: number;
}

export function getElementOffset(element: HTMLElement, toClass?: string): ElementOffset {
    let left = 0;
    let top = 0;

    while (toClass ? !element.classList.contains(toClass) : element) {
        left += element.offsetLeft;
        top += element.offsetTop;
        element = element.offsetParent as HTMLElement;
    }

    return { left, top };
}
