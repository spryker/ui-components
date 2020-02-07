import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter,
    OnInit
} from '@angular/core';
import { Props, PropsTemplate, TransformedSize, TransformedVariant } from './button.typings';
import { propsTransformation } from '@spryker-ui/utils';

const propsTemplate: PropsTemplate = {
    size: {
        lg: 'large',
        md: 'default',
        sm: 'small',
    },
    variant: {
        secondary: 'default',
        critical: 'danger',
    },
};

@Component({
    selector: 'spy-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.theme.less', './button.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit, OnChanges {
    @Input() type: Props['type'] = 'button';
    @Input() shape: Props['shape'] = null;
    @Input() size: Props['size'] = 'md';
    @Input() disabled: Props['disabled'] = false;
    @Input() variant: Props['variant'] = 'critical';
    @Output() click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    private isMouseDown: boolean = false;

    ngOnInit() {
        this.size = <TransformedSize>propsTransformation<PropsTemplate, TransformedSize>(propsTemplate, this.size, 'size');
        this.variant = <TransformedVariant>propsTransformation<PropsTemplate, TransformedSize>(propsTemplate, this.variant, 'variant');
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('size' in changes) {
            this.size = <TransformedSize>propsTransformation<PropsTemplate, TransformedSize>(propsTemplate, this.size, 'size');
        }

        if ('variant' in changes) {
            this.variant = <TransformedVariant>propsTransformation<PropsTemplate, TransformedSize>(propsTemplate, this.variant, 'variant');
        }
    }

    private mouseDownHandler(event: MouseEvent): void {
        const isLeftMouseClick: boolean = event.buttons === 1;

        if (!isLeftMouseClick) {
            return;
        }

        event.preventDefault();
        this.isMouseDown = true;
    }

    private mouseLeaveHandler(): void {
        this.isMouseDown = false;
    }
}
