import {
    Directive,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Renderer2,
    SimpleChanges,
} from '@angular/core';
import { InterceptionComposerService } from '@spryker/interception';
import { ToBoolean } from '@spryker/utils';
import {
    UnsavedChangesGuardToken,
    UnsavedChangesMonitor,
    UnsavedChangesMonitorStatus,
    UnsavedChangesMonitorToken,
} from '@spryker/unsaved-changes';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Responsible to track interactions of a user with the form it is attached to.
 */
@Directive({
    standalone: false,
    selector: 'form[spyUnsavedChangesFormMonitor]',
    providers: [
        {
            provide: UnsavedChangesMonitorToken,
            useExisting: UnsavedChangesFormMonitorDirective,
        },
    ],
})
export class UnsavedChangesFormMonitorDirective implements UnsavedChangesMonitor, OnInit, OnDestroy, OnChanges {
    /**
     * Allows attaching / detaching monitor
     */
    @Input() @ToBoolean() spyUnsavedChangesFormMonitor = true;

    private disposeInputEvent?: () => void;

    private status$ = new BehaviorSubject<UnsavedChangesMonitorStatus>(UnsavedChangesMonitorStatus.Clean);

    private unsavedChangesGuard?: UnsavedChangesGuardToken;

    constructor(
        private formRef: ElementRef<HTMLFormElement>,
        private renderer: Renderer2,
        @Optional()
        private interceptionComposerService?: InterceptionComposerService,
    ) {
        this.unsavedChangesGuard = this.interceptionComposerService?.getService(UnsavedChangesGuardToken);
    }

    ngOnInit(): void {
        if (this.spyUnsavedChangesFormMonitor !== false) {
            this.unsavedChangesGuard?.attachMonitor(this);
        }

        this.disposeInputEvent = this.renderer.listen(this.formRef.nativeElement, 'input', () => this.formChanged());
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('spyUnsavedChangesFormMonitor' in changes && !changes.spyUnsavedChangesFormMonitor.firstChange) {
            if (this.spyUnsavedChangesFormMonitor !== false) {
                this.unsavedChangesGuard?.attachMonitor(this);
            } else {
                this.unsavedChangesGuard?.detachMonitor(this);
            }
        }
    }

    ngOnDestroy(): void {
        this.unsavedChangesGuard?.detachMonitor(this);

        this.disposeInputEvent?.();
        this.disposeInputEvent = undefined;
    }

    getStatus(): Observable<UnsavedChangesMonitorStatus> {
        return this.status$.asObservable();
    }

    reset(): void {
        this.status$.next(UnsavedChangesMonitorStatus.Clean);
    }

    private formChanged(): void {
        this.status$.next(UnsavedChangesMonitorStatus.Dirty);
    }
}
