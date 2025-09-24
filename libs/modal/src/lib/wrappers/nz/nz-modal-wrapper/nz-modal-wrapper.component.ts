import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'spy-nz-modal-wrapper',
    templateUrl: './nz-modal-wrapper.component.html',
    styleUrls: ['./nz-modal-wrapper.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'spy-nz-modal-wrapper',
    },
})
export class NzModalWrapperComponent {
    @ViewChild('content', { static: true, read: ViewContainerRef })
    contentVcr!: ViewContainerRef;
}
