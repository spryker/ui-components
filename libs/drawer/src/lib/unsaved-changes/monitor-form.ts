import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UnsavedChangesGuardToken } from './guard.token';
import { UnsavedChangesMonitor, UnsavedChangesMonitorStatus } from './monitor';
import { UnsavedChangesMonitorToken } from './monitor.token';
import { InterceptionComposerService } from '@spryker/interception';

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
    private interceptionComposerService?: InterceptionComposerService, // @Optional() // private unsavedChangesGuard?: UnsavedChangesGuardToken,
  ) {}

  ngOnInit(): void {
    console.log('UnsavedChangesFormMonitorDirective', this);
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

  private formChanged() {
    this.status$.next(UnsavedChangesMonitorStatus.Dirty);
  }
}
