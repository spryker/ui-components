import {
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
    OnInit,
    inject,
} from '@angular/core';
import {
    InterceptionComposerDirective,
    InterceptorDispatcherService,
    provideInterceptionComposerToken,
    provideInterceptionService,
} from '@spryker/interception';
import { HookableInjector } from '@spryker/utils';
import { EMPTY, Observable, ReplaySubject, Subject } from 'rxjs';
import { tap, shareReplay, mergeAll, takeUntil } from 'rxjs/operators';
import { InputsType, OutputsType } from 'ng-dynamic-component';

import {
    DrawerCloseInterceptionEvent,
    DrawerMaximizeInterceptionEvent,
    DrawerMinimizeInterceptionEvent,
} from '../drawer-interception';
import { DrawerData, DrawerOptions, DrawerOptionsComponent, DrawerOptionsTemplate } from '../drawer-options';
import { DrawerRef } from '../drawer-ref';
import { DrawerWrapperComponent } from '../drawer-wrapper/drawer-wrapper.component';
import { DrawerTemplateContext } from '../types';

@Directive({
    standalone: false,
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'spy-drawer-container',
    providers: [...provideInterceptionComposerToken(forwardRef(() => DrawerContainerComponent))],
})
export class DrawerComposerDirective extends InterceptionComposerDirective {}

@Component({
    standalone: false,
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
export class DrawerContainerComponent implements OnInit, OnDestroy {
    private vcr = inject(ViewContainerRef);
    private cdr = inject(ChangeDetectorRef);
    private interceptorDispatcherService = inject(InterceptorDispatcherService);

    drawerRecord?: {
        class?: Type<any>;
        injector?: Injector;
        inputs?: InputsType;
        outputs?: OutputsType;
        template?: TemplateRef<DrawerTemplateContext>;
        context?: DrawerTemplateContext;
    };
    drawerRef?: DrawerRef;

    destroyed$ = new Subject<void>();
    addCloseObs$ = new Subject<Observable<void>>();
    closeObs$ = this.addCloseObs$.pipe(mergeAll());

    private afterClosed$ = new ReplaySubject<void>();
    private destroyed = false;

    @ViewChild(DrawerWrapperComponent)
    private drawerWrapperComponent?: DrawerWrapperComponent;

    ngOnInit(): void {
        this.closeObs$.pipe(takeUntil(this.destroyed$)).subscribe();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed = true;
        this.removeDrawer();
    }

    trackByIndex(idx: number): number {
        return idx;
    }

    refreshDrawer(): void {
        if (!this.drawerRecord) {
            return;
        }

        const drawerRecordClass = this.drawerRecord.class;
        const drawerRecordTemplate = this.drawerRecord.template;

        this.drawerRecord.class = undefined;
        this.drawerRecord.template = undefined;
        this.cdr.markForCheck();

        setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.drawerRecord!.class = drawerRecordClass;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.drawerRecord!.template = drawerRecordTemplate;
            this.cdr.markForCheck();
        }, 0);
    }

    openComponent<D, T>(
        compType: Type<T>,
        options: DrawerOptionsComponent<D, T>,
    ): DrawerRef<D, DrawerOptionsComponent<D, T>> {
        const drawerRef = this.createDrawerRef(options);
        const injector = this.createDrawerInjector(drawerRef);

        this.drawerRef = drawerRef;
        this.drawerRecord = {
            class: compType,
            injector,
            inputs: { ...options.inputs },
            outputs: { ...options.outputs },
        };

        return drawerRef;
    }

    openTemplate<D, C>(
        templateRef: TemplateRef<DrawerTemplateContext & C>,
        options: DrawerOptionsTemplate<D, C>,
    ): DrawerRef<D, DrawerOptionsTemplate<D, C>> {
        const drawerRef = this.createDrawerRef(options);
        const context = this.createDrawerContext(drawerRef);

        this.drawerRef = drawerRef;
        this.drawerRecord = { template: templateRef, context };

        return drawerRef;
    }

    maximize(): void {
        this.interceptorDispatcherService.dispatch(DrawerMaximizeInterceptionEvent).subscribe(() => {
            this.drawerWrapperComponent?.maximize();
            this.cdr.markForCheck();
        });
    }

    minimize(): void {
        this.interceptorDispatcherService.dispatch(DrawerMinimizeInterceptionEvent).subscribe(() => {
            this.drawerWrapperComponent?.minimize();
            this.cdr.markForCheck();
        });
    }

    afterClosed(): Observable<void> {
        return this.afterClosed$.asObservable();
    }

    private createDrawerRef<D, O extends DrawerOptions<D>>(options: O): DrawerRef<D, O> {
        const drawerRef = new DrawerRef<D, O>(
            options,
            () => this.removeDrawer(),
            () => this.maximize(),
            () => this.minimize(),
            () => this.refreshDrawer(),
        );

        return drawerRef;
    }

    private removeDrawer(): Observable<void> {
        if (this.destroyed) {
            return EMPTY;
        }

        const close$ = this.interceptorDispatcherService.dispatch(DrawerCloseInterceptionEvent).pipe(
            tap(() => {
                this.drawerRecord = undefined;
                this.cdr.detectChanges();
                this.emitClosed();
            }),
            shareReplay({ bufferSize: 1, refCount: true }),
        );

        this.addCloseObs$.next(close$);

        return close$;
    }

    private createDrawerInjector(drawerRef: DrawerRef<DrawerData, DrawerOptionsComponent>): Injector {
        const hookableInjector = new HookableInjector(drawerRef.options.injector ?? this.vcr.injector);

        if (drawerRef.options.injector) {
            hookableInjector.hook(this.vcr.injector);
        }

        return Injector.create({
            name: 'DrawerInjector',
            providers: [{ provide: DrawerRef, useValue: drawerRef }],
            parent: hookableInjector,
        });
    }

    private createDrawerContext(drawerRef: DrawerRef<DrawerData, DrawerOptionsTemplate>): DrawerTemplateContext {
        return {
            ...(drawerRef.options.context as object),
            $implicit: drawerRef,
        };
    }

    private emitClosed(): void {
        this.afterClosed$.next();
        this.afterClosed$.complete();
    }
}
