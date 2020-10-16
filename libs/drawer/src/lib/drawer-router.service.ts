import { Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { UrlPersistenceStrategy } from '@spryker/utils';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, pairwise, skip, switchMap, takeUntil } from 'rxjs/operators';
import { DrawerData, DrawerOptions } from './drawer-options';
import { DrawerRef } from './drawer-ref';
import { DrawerService } from './drawer.service';
import { DrawerTemplateContext } from './types';

export interface DrawerRouteDataSerializer<D = DrawerData> {
  serialize(data: D): object;
  deserialize(data: object): D;
}

export interface DrawerRouteBase {
  id: string;
  dataSerializer?: Type<DrawerRouteDataSerializer>;
}

export interface DrawerRouteComponent extends DrawerRouteBase {
  componentType: Type<any>;
}

export interface DrawerRouteTemplate extends DrawerRouteBase {
  templateRef: TemplateRef<DrawerTemplateContext>;
}

export type DrawerRoute = DrawerRouteComponent | DrawerRouteTemplate;

interface DrawerOutletRecord {
  route: DrawerRoute;
  drawer: BehaviorSubject<DrawerRef | undefined>;
  options?: Partial<DrawerOptions>;
  synching: boolean;
}

@Injectable({ providedIn: 'root' })
export class DrawerRouterService {
  private outlets: Record<string, DrawerOutletRecord> = Object.create(null);

  constructor(
    private injector: Injector,
    private drawerService: DrawerService,
    private urlPersistenceStrategy: UrlPersistenceStrategy,
  ) {}

  outlet(
    route: DrawerRoute,
    options?: Partial<DrawerOptions>,
  ): Observable<DrawerRef | undefined> {
    return new Observable(subscriber => {
      const subSink = new Subscription();

      const outletRecord: DrawerOutletRecord = {
        route,
        options,
        drawer: new BehaviorSubject<DrawerRef | undefined>(undefined),
        synching: false,
      };

      this.outlets[route.id] = outletRecord;

      // Relay opened drawers to subscriber
      subSink.add(outletRecord.drawer.subscribe(subscriber));

      outletRecord.drawer
        .pipe(
          filter(drawer => !!drawer),
          switchMap(drawer =>
            // Null checked above
            // tslint:disable-next-line: no-non-null-assertion
            drawer!
              .afterClosed()
              // Take until the next drawer is opened (skip current one)
              .pipe(takeUntil(outletRecord.drawer.pipe(skip(1)))),
          ),
        )
        .subscribe(() => {
          // Update outlet drawer
          outletRecord.drawer.next(undefined);

          // Remove outlet data from URL when drawer closed/removed
          if (!outletRecord.synching) {
            this.urlPersistenceStrategy.save(this.getKey(route.id), undefined);
          } else {
            outletRecord.synching = false;
          }
        });

      // Close previous drawer when new is opened
      subSink.add(
        outletRecord.drawer
          .pipe(pairwise())
          .subscribe(([prevDrawer]) => prevDrawer?.close()),
      );

      const drawerDataToOpen$ = this.urlPersistenceStrategy.retrieve<object>(
        this.getKey(route.id),
      );

      // Open drawer from URL
      subSink.add(
        drawerDataToOpen$.subscribe(data => {
          if (data) {
            outletRecord.synching = true;
            this.open(route.id, {
              data: this.deserializeData(data, outletRecord),
            });
          } else if (outletRecord.drawer.getValue()) {
            outletRecord.synching = true;
            outletRecord.drawer.getValue()?.close();
          }
        }),
      );

      return () => {
        outletRecord.drawer.next(undefined);
        delete this.outlets[route.id];
        subSink.unsubscribe();
      };
    });
  }

  open(id: string, options?: Partial<DrawerOptions>): DrawerRef | undefined {
    const outletRecord = this.outlets[id];

    if (!outletRecord) {
      return;
    }

    const drawerOptions = {
      ...outletRecord.options,
      ...options,
    };

    let drawerRef = outletRecord.drawer.getValue();

    if (!drawerRef) {
      drawerRef = this.openDrawer(outletRecord, drawerOptions);

      // Update outlet drawer
      outletRecord.drawer.next(drawerRef);
    } else {
      drawerRef.updateData(drawerOptions.data);
    }

    // Update outlet data in URL
    if (!outletRecord.synching) {
      this.urlPersistenceStrategy.save(
        this.getKey(id),
        this.serializeData(drawerOptions.data, outletRecord),
      );
    } else {
      outletRecord.synching = false;
    }

    return drawerRef;
  }

  private openDrawer(
    outletRecord: DrawerOutletRecord,
    options: Partial<DrawerOptions>,
  ) {
    return 'componentType' in outletRecord.route
      ? this.drawerService.openComponent(
          outletRecord.route.componentType,
          options,
        )
      : this.drawerService.openTemplate(
          outletRecord.route.templateRef,
          options,
        );
  }

  private getKey(id: string) {
    return `drawer:${id}`;
  }

  private serializeData(
    data: DrawerData | undefined = {},
    outletRecord: DrawerOutletRecord,
  ): object {
    if (!outletRecord.route.dataSerializer) {
      return data;
    }

    return this.injector.get(outletRecord.route.dataSerializer).serialize(data);
  }

  private deserializeData(
    data: object | undefined,
    outletRecord: DrawerOutletRecord,
  ): DrawerData | undefined {
    if (!outletRecord.route.dataSerializer || !data) {
      return data;
    }

    return this.injector
      .get(outletRecord.route.dataSerializer)
      .deserialize(data);
  }
}
