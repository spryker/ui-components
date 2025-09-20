import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    TemplateRef,
    Type,
    ViewChild,
    ViewEncapsulation,
    SimpleChanges,
    inject,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ModalService } from '../modal.service';
import { ModalRef } from '../types';
import { ComponentModal, TemplateModalContext } from '../strategies';

@Component({
    standalone: false,
    selector: 'spy-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnChanges, OnDestroy {
    private modalService = inject(ModalService);

    @Input() visible = false;
    @Input() data?: unknown;
    @Input() component?: Type<ComponentModal>;

    @Output() visibleChange = new EventEmitter<boolean>();

    @ViewChild('contentTpl') contentTpl?: TemplateRef<TemplateModalContext<any>>;

    @ContentChild(TemplateRef) templateRef?: TemplateRef<TemplateModalContext<any>>;

    private modalRef?: ModalRef<any, any>;

    private destroyed$ = new Subject<void>();

    ngOnChanges(changes: SimpleChanges): void {
        if ('visible' in changes) {
            if (this.visible) {
                this.open();
            } else {
                this.close();
            }
        }

        if ('component' in changes) {
            this.open(true);
        }
    }

    open(forceReopen?: boolean): void {
        if (this.modalRef && forceReopen) {
            this.modalRef.close();
            this.modalRef = undefined;
        }

        if (this.modalRef && !forceReopen) {
            return;
        }

        if (this.component) {
            this.modalRef = this.modalService.openComponent(this.component, {
                data: this.data,
            });
        }

        const template = this.templateRef || this.contentTpl;

        if (!template) {
            return;
        }

        this.modalRef = this.modalService.openTemplate(template, {
            data: this.data,
        });
        this.visibleChange.emit(true);
        this.visible = true;

        this.modalRef
            .afterClosed()
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                this.visibleChange.emit(false);
                this.modalRef = undefined;
            });
    }

    close(): void {
        if (this.modalRef) {
            this.modalRef.close();
            this.modalRef = undefined;
            this.visible = false;
            this.visibleChange.emit(false);
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.close();
    }
}
