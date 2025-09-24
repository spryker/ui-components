import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    Injectable,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { switchMap, take, takeUntil } from 'rxjs/operators';

import { Observable, Subject } from 'rxjs';
import { DrawerData } from '../drawer-options';
import { DrawerRef } from '../drawer-ref';
import { DrawerService } from '../drawer.service';
import { DrawerTemplateContext } from '../types';

@Injectable()
export class DrawerComponentInputs {
    @Input() isOpen?: boolean;
    @Input() closeable?: boolean;
    @Input() resizable?: boolean;
    @Input() width?: string;
    @Input() hasBackdrop?: boolean;
    @Input() closeOnBackdrop?: boolean;
    @Input() data?: DrawerData;
}

@Component({
    selector: 'spy-drawer',
    templateUrl: './drawer.component.html',
    styleUrls: ['./drawer.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class DrawerComponent extends DrawerComponentInputs implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @Output() isOpenChange = new EventEmitter<boolean>();
    @Output() closed = new EventEmitter<void>();

    @ViewChild('contentTpl') contentTpl?: TemplateRef<any>;

    @ContentChild(TemplateRef) templateRef?: TemplateRef<DrawerTemplateContext>;

    private drawerRef?: DrawerRef;

    private closed$ = new Subject<void>();
    private destroyed$ = new Subject<void>();
    private afterClosed$ = new Subject<Observable<void>>();

    constructor(
        private cdr: ChangeDetectorRef,
        private drawerService: DrawerService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.afterClosed$
            .pipe(
                switchMap((afterClosed$) => afterClosed$.pipe(take(1), takeUntil(this.closed$))),
                takeUntil(this.destroyed$),
            )
            .subscribe(() => this.close());
    }

    ngAfterViewInit(): void {
        this.updateDrawer();
    }

    ngOnChanges(): void {
        this.updateDrawer();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.close();
    }

    open(): void {
        const template = this.templateRef || this.contentTpl;

        if (!template) {
            return;
        }

        this.close();

        this.drawerRef = this.drawerService.openTemplate(template, this);

        this.afterClosed$.next(this.drawerRef.afterClosed());

        this.isOpen = true;
        this.isOpenChange.emit(true);
        this.cdr.markForCheck();
    }

    maximize(): void {
        this.drawerRef?.maximize();
    }

    minimize(): void {
        this.drawerRef?.minimize();
    }

    refreshDrawer(): void {
        this.drawerRef?.refreshDrawer();
    }

    close() {
        this.closed$.next();

        if (!this.drawerRef) {
            return;
        }

        this.drawerRef.close();
        this.drawerRef = undefined;

        this.isOpen = false;
        this.isOpenChange.emit(false);
        this.closed.emit();
        this.cdr.markForCheck();
    }

    private updateDrawer() {
        if (this.isOpen) {
            this.open();
        } else {
            this.close();
        }
    }
}
