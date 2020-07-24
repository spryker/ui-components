import { ComponentPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnDestroy,
  TemplateRef,
  Type,
  ViewContainerRef,
  ViewEncapsulation,
  ViewChild,
  ApplicationRef,
} from '@angular/core';

import { DrawerOptions } from '../drawer-options';
import { DrawerRef } from '../drawer-ref';
import { DrawerTemplateContext } from '../types';
import { ReplaySubject, Observable } from 'rxjs';
import { DrawerWrapperComponent } from '../drawer-wrapper/drawer-wrapper.component';

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

    const drawerRecordTest = this.drawerRecord.portal;

    this.drawerRecord.portal = undefined;
    this.cdr.markForCheck();

    setTimeout(() => {
      // tslint:disable-next-line: no-non-null-assertion
      this.drawerRecord!.portal = drawerRecordTest;
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
    this.drawerWrapperComponent?.maximize();
    this.cdr.markForCheck();
  }

  minimize(): void {
    this.drawerWrapperComponent?.minimize();
    this.cdr.markForCheck();
  }

  afterClosed(): Observable<void> {
    return this.afterClosed$.asObservable();
  }

  private createDrawerRef(options: DrawerOptions): DrawerRef {
    const drawerRef: DrawerRef = new DrawerRef(
      options,
      () => this.removeDrawer(drawerRef),
      () => this.maximize(),
      () => this.minimize(),
      () => this.refreshDrawer(),
    );

    return drawerRef;
  }

  private addDrawer(drawer: DrawerRef, portal: Portal<any>): void {
    this.drawerRecord = { drawer, portal };
  }

  private removeDrawer(drawer: DrawerRef): void {
    if (this.destroyed) {
      return;
    }

    this.drawerRecord = undefined;
    this.cdr.detectChanges();
    this.emitClosed();
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
