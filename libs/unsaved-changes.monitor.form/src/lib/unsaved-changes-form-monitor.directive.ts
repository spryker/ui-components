import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  UnsavedChangesGuardToken,
  UnsavedChangesMonitorToken,
  UnsavedChangesMonitor,
  UnsavedChangesMonitorStatus,
} from '@spryker/unsaved-changes';
import { InterceptionComposerService } from '@spryker/interception';

/**
 * Responsible to track interactions of a user with the form it is attached to.
 */
@Directive({
  selector: 'form[spyUnsavedChangesFormMonitor]',
  providers: [
    {
      provide: UnsavedChangesMonitorToken,
      useExisting: UnsavedChangesFormMonitorDirective,
    },
  ],
})
export class UnsavedChangesFormMonitorDirective
  implements UnsavedChangesMonitor, OnInit, OnDestroy {
  private disposeChangeEvent?: () => void;

  private status$ = new BehaviorSubject<UnsavedChangesMonitorStatus>(
    UnsavedChangesMonitorStatus.Clean,
  );

  private unsavedChangesGuard = this.interceptionComposerService?.getService(
    UnsavedChangesGuardToken,
  );

  constructor(
    private formRef: ElementRef<HTMLFormElement>,
    private renderer: Renderer2,
    @Optional()
    private interceptionComposerService?: InterceptionComposerService,
  ) {}

  ngOnInit(): void {
    this.unsavedChangesGuard?.attachMonitor(this);

    this.disposeChangeEvent = this.renderer.listen(
      this.formRef.nativeElement,
      'input',
      () => this.formChanged(),
    );
  }

  ngOnDestroy(): void {
    this.unsavedChangesGuard?.detachMonitor(this);

    this.disposeChangeEvent?.();
    this.disposeChangeEvent = undefined;
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
