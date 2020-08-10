import { ComponentPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  forwardRef,
  Injector,
  OnDestroy,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { EMPTY, Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  DrawerCloseInterceptionEvent,
  DrawerMaximizeInterceptionEvent,
  DrawerMinimizeInterceptionEvent,
} from '../drawer-interception';
import { DrawerOptions } from '../drawer-options';
import { DrawerRef } from '../drawer-ref';
import { DrawerWrapperComponent } from '../drawer-wrapper/drawer-wrapper.component';
import {
  InterceptorDispatcherService,
  provideInterceptionService,
} from '../interception';
import {
  InterceptionComposerDirective,
  provideInterceptionComposerToken,
} from '../interception/interception-composer.directive';
import { DrawerTemplateContext } from '../types';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'spy-drawer-container',
  providers: [
    ...provideInterceptionComposerToken(
      forwardRef(() => DrawerContainerComponent),
    ),
  ],
})
export class DrawerComposerDirective extends InterceptionComposerDirective {}

/** @internal */
@Component({
  selector: 'spy-drawer-container',
  templateUrl: './drawer-container.component.html',
  styleUrls: ['./drawer-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-drawer-container',
  },
  providers: [...provideInterceptionService()],
})
export class DrawerContainerComponent implements OnDestroy {
  drawerRecord?: { drawer: DrawerRef; portal?: Portal<any> };

  private afterClosed$ = new ReplaySubject<void>();
  private destroyed = false;

  @ViewChild(DrawerWrapperComponent)
  private drawerWrapperComponent?: DrawerWrapperComponent;

  constructor(
    private vcr: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private applicationRef: ApplicationRef,
    private interceptorDispatcherService: InterceptorDispatcherService,
  ) {}

  ngOnDestroy(): void {
    this.destroyed = true;
    this.drawerRecord = undefined;
  }

  trackByIndex(idx: number): number {
    return idx;
  }

  refreshDrawer(): void {
    if (!this.drawerRecord) {
      return;
    }

    const drawerRecord = this.drawerRecord.portal;

    this.drawerRecord.portal = undefined;
    this.cdr.markForCheck();

    setTimeout(() => {
      // tslint:disable-next-line: no-non-null-assertion
      this.drawerRecord!.portal = drawerRecord;
      this.cdr.markForCheck();
      this.applicationRef.tick();
    }, 0);
  }

  openComponent(compType: Type<any>, options: DrawerOptions): DrawerRef {
    const drawerRef = this.createDrawerRef(options);

    const portal = new ComponentPortal(
      compType,
      this.vcr,
      this.createDrawerInjector(drawerRef),
    );

    this.addDrawer(drawerRef, portal);

    return drawerRef;
  }

  openTemplate(
    templateRef: TemplateRef<DrawerTemplateContext>,
    options: DrawerOptions,
  ): DrawerRef {
    const drawerRef = this.createDrawerRef(options);

    const portal = new TemplatePortal(
      templateRef,
      this.vcr,
      this.createDrawerContext(drawerRef),
    );

    this.addDrawer(drawerRef, portal);

    return drawerRef;
  }

  maximize(): void {
    this.interceptorDispatcherService
      .dispatch(DrawerMaximizeInterceptionEvent)
      .subscribe(() => {
        this.drawerWrapperComponent?.maximize();
        this.cdr.markForCheck();
      });
  }

  minimize(): void {
    this.interceptorDispatcherService
      .dispatch(DrawerMinimizeInterceptionEvent)
      .subscribe(() => {
        this.drawerWrapperComponent?.minimize();
        this.cdr.markForCheck();
      });
  }

  afterClosed(): Observable<void> {
    return this.afterClosed$.asObservable();
  }

  private createDrawerRef(options: DrawerOptions): DrawerRef {
    const drawerRef: DrawerRef = new DrawerRef(
      options,
      () => this.removeDrawer(),
      () => this.maximize(),
      () => this.minimize(),
      () => this.refreshDrawer(),
    );

    return drawerRef;
  }

  private addDrawer(drawer: DrawerRef, portal?: Portal<any>): void {
    this.drawerRecord = { drawer, portal };
  }

  private removeDrawer(): Observable<void> {
    if (this.destroyed) {
      return EMPTY;
    }

    return this.interceptorDispatcherService
      .dispatch(DrawerCloseInterceptionEvent)
      .pipe(
        tap(() => {
          this.drawerRecord = undefined;
          this.cdr.detectChanges();
          this.emitClosed();
        }),
      );
  }

  private createDrawerInjector(drawerRef: DrawerRef): Injector {
    return Injector.create({
      name: 'DrawerInjector',
      providers: [{ provide: DrawerRef, useValue: drawerRef }],
      parent: drawerRef.options.injector ?? this.vcr.injector,
    });
  }

  private createDrawerContext(drawerRef: DrawerRef): DrawerTemplateContext {
    return { $implicit: drawerRef };
  }

  private emitClosed(): void {
    this.afterClosed$.next();
    this.afterClosed$.complete();
  }
}
