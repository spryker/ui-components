import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { SpinnerSize } from '../types';

@Component({
    standalone: false,
    selector: 'spy-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: { class: 'spy-spinner' },
})
export class SpinnerComponent {
    @Input() delay?: number;
    @Input() size = SpinnerSize.Default;
    @Input() isSpinning = false;
    @Input() overlayContent = false;
}
