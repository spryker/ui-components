import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, OnDestroy, Optional, TemplateRef, Type } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { DrawerContainerComponent } from './drawer-container/drawer-container.component';
import { DrawerOptions, DrawerOptionsBase, DrawerOptionsComponent, DrawerOptionsTemplate } from './drawer-options';
import { DrawerRef } from './drawer-ref';
import { DrawerTemplateContext, DrawerRecord } from './types';
import { DrawerContainerProxyComponent } from './drawer-container/drawer-container-proxy.component';

@Injectable({
    providedIn: 'root',
})
export class DrawerService implements OnDestroy {
    private drawerStack: DrawerRecord[] = [];
    private allClosed$ = new Subject<void>();
    canceled$ = new Subject();
    
    constructor(private overlay: Overlay, @Optional() private defaultOptions?: DrawerOptionsBase) {}

    ngOnDestroy(): void {
        this.closeAll();
    }

    openComponent<D, T>(
        compType: Type<T>,
        options?: Partial<DrawerOptionsComponent<D, T>>,
    ): DrawerRef<D, DrawerOptionsComponent<D, T>> {
        const opts = this.getOptionsComponent<D, T>(options);

        return this.getDrawerContainer<T>(opts, compType, null)?.openComponent<D, T>(compType, opts);
    }

    openTemplate<D, C>(
        templateRef: TemplateRef<DrawerTemplateContext & C>,
        options?: Partial<DrawerOptionsTemplate<D, C>>,
    ): DrawerRef<D, DrawerOptionsTemplate<D, C>> {
        const opts = this.getOptionsTemplate<D, C>(options);

        return this.getDrawerContainer<C>(opts, null, templateRef)?.openTemplate<D, C>(templateRef, opts);
    }

    closeAll(): void {
        this.allClosed$.next();
        this.drawerStack.forEach((drawer) => this.destroyDrawerRecord(drawer));
        this.drawerStack = [];
    }

    getDrawerStack(): DrawerRecord[] {
        return this.drawerStack;
    }

    private getOptionsComponent<D, T>(options?: Partial<DrawerOptionsComponent<D, T>>): DrawerOptionsComponent<D, T> {
        return new DrawerOptionsComponent<D, T>({
            ...this.defaultOptions,
            ...options,
            drawerStack: this.drawerStack,
        } as DrawerOptionsComponent<D, T>);
    }

    private getOptionsTemplate<D, C>(options?: Partial<DrawerOptionsTemplate<D, C>>): DrawerOptionsTemplate<D, C> {
        return new DrawerOptionsTemplate<D, C>({
            ...this.defaultOptions,
            ...options,
            drawerStack: this.drawerStack,
        } as DrawerOptionsTemplate<D, C>);
    }

    private getDrawerContainer<D>(options: DrawerOptions, component?: Type<D>, template?: TemplateRef<DrawerTemplateContext & D>): DrawerContainerComponent {
        const drawerToBeClosed = this.drawerStack.filter((drawer) => drawer.container.drawerRef?.isClosing);
        const drawerRecord = this.createDrawerRecord(options);
        
        this.canceled$.subscribe((isCanceled) => {
            if (isCanceled) {
                const record = this.drawerStack.filter((drawer) => drawer.component || drawer.template)[0];
                const index = this.drawerStack.indexOf(record);

                if (index !== -1) {
                    this.drawerStack.splice(index, 1);
                    this.drawerStack[0].container.drawerRef.isClosing = false;
                }
            }
        });
        
        if (drawerToBeClosed.length) {
            drawerRecord.component = component;
            drawerRecord.template = template;
            drawerRecord.options = options;

            if (this.drawerStack.at(-1)?.container.isPending) {
                this.drawerStack.pop();
            }

            drawerRecord.container.setPending(true);
            this.drawerStack.push(drawerRecord);

            return;
        }
        
        this.drawerStack.unshift(drawerRecord);
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
        overlay.hostElement.parentElement?.classList.add('spy-drawer-container-overlay');

        const drawerContainerRef = overlay.attach(new ComponentPortal(DrawerContainerProxyComponent));

        const record: DrawerRecord = {
            options,
            overlay,
            container: drawerContainerRef.instance.container,
        };

        const containerEmpty$ = record.container.afterClosed().pipe(take(1));

        merge(overlay.backdropClick(), overlay.keydownEvents().pipe(filter((e) => e.key === 'Escape')))
            .pipe(takeUntil(merge(containerEmpty$, this.allClosed$)))
            .subscribe(() => {
                this.removeDrawerRecord(record);
            });

        containerEmpty$.pipe(takeUntil(this.allClosed$)).subscribe(() => this.removeDrawerRecord(record));

        return record;
    }

    private removeDrawerRecord(record: DrawerRecord): void {
        const idx = this.drawerStack.indexOf(record);

        if (idx === -1) {
            return;
        }

        // loop is destroying all drawers opened after current drawer being removed
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
