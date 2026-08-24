import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { ToJson } from '@spryker/utils';

/**
 * Shape formerly imported from `ng-zorro-antd/input` as `AutoSizeType`, which ng-zorro-antd 22
 * removed along with `NzAutosizeDirective`. Declared locally so the published `autoSize` input
 * keeps exactly the same structural type across ng-zorro-antd 20, 21 and 22.
 */
interface TextareaAutoSize {
    minRows?: number;
    maxRows?: number;
}

@Component({
    standalone: false,
    selector: 'spy-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TextareaComponent {
    @Input() name?: string;
    @Input() value = '';
    @Input({ transform: booleanAttribute }) disabled = false;
    @Input() placeholder?: string;
    @Input() rows = 4;
    @Input() cols = 4;
    @Input() @ToJson() attrs: Record<string, string> = {};
    @Input() spyId?: string;
    @Input() autoSize: boolean | TextareaAutoSize = true;
    @Output() valueChange = new EventEmitter<any>();

    /**
     * `autoSize` used to feed ng-zorro-antd's `[nzAutosize]`, which accepted
     * `boolean | { minRows, maxRows }` on one binding. ng-zorro-antd 22 removed
     * `NzAutosizeDirective`; its own deprecation notice points at the CDK's
     * `CdkTextareaAutosize`, which splits the same information across three inputs.
     * These three accessors reproduce the old semantics exactly and keep `autoSize`
     * the single public input.
     */
    protected get autoSizeEnabled(): boolean {
        return Boolean(this.autoSize);
    }

    protected get autoSizeMinRows(): number | undefined {
        return typeof this.autoSize === 'object' ? this.autoSize.minRows : undefined;
    }

    protected get autoSizeMaxRows(): number | undefined {
        return typeof this.autoSize === 'object' ? this.autoSize.maxRows : undefined;
    }
}
