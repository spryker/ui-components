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
} from '@angular/core';

import { DrawerOptions } from '../drawer-options';
import { DrawerRef } from '../drawer-ref';
import { DrawerTemplateContext } from '../types';
import { ReplaySubject } from 'rxjs';

/** @internal */
@Component({
  selector: 'spy-drawer-container',
  templateUrl: './drawer-container.component.html',
  styleUrls: ['./drawer-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DrawerContainerComponent implements OnDestroy {
  drawerMap = new Map<DrawerRef, Portal<any>>();

  private drawerStack: DrawerRef[] = [];
  private afterAllClosed$ = new ReplaySubject<void>();
  private destroyed = false;

  constructor(private vcr: ViewContainerRef, private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.destroyed = true;
    this.clearAllDrawers();
  }

  trackByIndex(idx: number) {
    return idx;
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

  closeLatest() {
    if (this.drawerStack.length > 0) {
      this.drawerStack[0].close();
    }
  }

  closeAll() {
    this.clearAllDrawers();
    this.cdr.detectChanges();
    this.emitAllClosed();
  }

  afterAllClosed() {
    return this.afterAllClosed$.asObservable();
  }

  private createDrawerRef(options: DrawerOptions) {
    const drawerRef: DrawerRef = new DrawerRef(options, () =>
      this.removeDrawer(drawerRef),
    );

    return drawerRef;
  }

  private addDrawer(drawer: DrawerRef, portal: Portal<any>) {
    this.drawerMap.set(drawer, portal);
    this.drawerStack.unshift(drawer);
    this.cdr.detectChanges();
  }

  private removeDrawer(drawer: DrawerRef) {
    if (this.destroyed) {
      return;
    }

    this.drawerMap.delete(drawer);
    this.cdr.detectChanges();

    const stackIdx = this.drawerStack.indexOf(drawer);

    if (stackIdx !== -1) {
      this.drawerStack.splice(stackIdx, 1);
    }

    if (this.drawerMap.size === 0) {
      this.emitAllClosed();
    }
  }

  private clearAllDrawers() {
    this.drawerMap.clear();
    this.drawerStack = [];
  }

  private createDrawerInjector(drawerRef: DrawerRef): Injector {
    return Injector.create({
      name: 'DrawerInjector',
      providers: [{ provide: DrawerRef, useValue: drawerRef }],
      parent: this.vcr.injector,
    });
  }

  private createDrawerContext(drawerRef: DrawerRef): DrawerTemplateContext {
    return { $implicit: drawerRef };
  }

  private emitAllClosed() {
    this.afterAllClosed$.next();
    this.afterAllClosed$.complete();
  }
}
