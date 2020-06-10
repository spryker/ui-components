import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Injectable,
  OnDestroy,
  TemplateRef,
  Type,
  Optional,
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { DrawerContainerComponent } from './drawer-container/drawer-container.component';
import { DrawerOptions } from './drawer-options';
import { DrawerRef } from './drawer-ref';
import { DrawerTemplateContext } from './types';

interface DrawerRecord {
  options: DrawerOptions;
  overlay: OverlayRef;
  container: DrawerContainerComponent;
}

@Injectable({
  providedIn: 'root',
})
export class DrawerService implements OnDestroy {
  private drawerStack: DrawerRecord[] = [];
  private allClosed$ = new Subject<void>();

  constructor(
    private overlay: Overlay,
    @Optional() private defaultOptions?: DrawerOptions,
  ) {}

  ngOnDestroy(): void {
    this.closeAll();
  }

  openComponent(
    compType: Type<any>,
    options?: Partial<DrawerOptions>,
  ): DrawerRef {
    const opts = this.getOptions(options);

    return this.getDrawerContainer(opts).openComponent(compType, opts);
  }

  openTemplate(
    templateRef: TemplateRef<DrawerTemplateContext>,
    options?: Partial<DrawerOptions>,
  ): DrawerRef {
    const opts = this.getOptions(options);

    return this.getDrawerContainer(opts).openTemplate(templateRef, opts);
  }

  closeAll(): void {
    this.allClosed$.next();
    this.drawerStack.forEach(drawer => this.destroyDrawerRecord(drawer));
    this.drawerStack = [];
  }

  private getOptions(options?: Partial<DrawerOptions>): DrawerOptions {
    return new DrawerOptions({ ...this.defaultOptions, ...options });
  }

  private getDrawerContainer(options: DrawerOptions): DrawerContainerComponent {
    this.drawerStack.unshift(this.createDrawerRecord(options));
    this.drawerStack[1]?.container.maximize();

    return this.drawerStack[0].container;
  }

  private createDrawerRecord(options: DrawerOptions): DrawerRecord {
    const overlay = this.overlay.create({
      positionStrategy: this.overlay.position().global(),
      hasBackdrop: options.hasBackdrop,
      panelClass: 'spy-drawer-container-pane',
      backdropClass: 'spy-drawer-container-backdrop',
      width: '100%',
    });

    const drawerContainerRef = overlay.attach(
      new ComponentPortal(DrawerContainerComponent),
    );

    const record: DrawerRecord = {
      options,
      overlay,
      container: drawerContainerRef.instance,
    };

    const containerEmpty$ = drawerContainerRef.instance.afterAllClosed();

    merge(
      overlay.backdropClick(),
      overlay.keydownEvents().pipe(filter(e => e.key === 'Escape')),
    )
      .pipe(takeUntil(merge(containerEmpty$, this.allClosed$)))
      .subscribe(() => this.destroyDrawerRecord(record));

    containerEmpty$
      .pipe(takeUntil(this.allClosed$))
      .subscribe(() => this.removeDrawerRecord(record));

    return record;
  }

  private removeDrawerRecord(record: DrawerRecord): void {
    const idx = this.drawerStack.indexOf(record);

    if (idx === -1) {
      return;
    }

    for (let i = idx; i >= 0; i--) {
      this.destroyDrawerRecord(this.drawerStack[i]);
    }

    this.drawerStack.splice(0, idx + 1);
    this.drawerStack[0]?.container.minimize();
  }

  private destroyDrawerRecord(record: DrawerRecord): void {
    record.overlay.dispose();
  }
}
