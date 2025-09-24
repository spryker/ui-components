import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

export enum PopoverPosition {
    TopLeft = 'topLeft',
    Top = 'top',
    TopRight = 'topRight',

    RightTop = 'rightTop',
    Right = 'right',
    RightBottom = 'rightBottom',

    BottomLeft = 'bottomLeft',
    Bottom = 'bottom',
    BottomRight = 'bottomRight',

    LeftTop = 'leftTop',
    Left = 'left',
    LeftBottom = 'leftBottom',
}

export enum PopoverTrigger {
    Click = 'click',
    Hover = 'hover',
    Focus = 'focus',
}

@Component({
    selector: 'spy-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'spy-popover',
    },
})
export class PopoverComponent {
    @Input() open = false;
    @Input() popoverTrigger = PopoverTrigger.Click;
    @Input() position?: PopoverPosition = PopoverPosition.Bottom;
    @Input() popoverOverlayClassname? = '';
    @Output() openChange = new EventEmitter<boolean>();

    openChangeEvent(isOpen: boolean): void {
        this.open = isOpen;
        this.openChange.emit(isOpen);
    }
}
