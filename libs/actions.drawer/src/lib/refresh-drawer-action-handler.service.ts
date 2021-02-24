import { Inject, Injectable, Injector } from '@angular/core';
import { ActionHandler } from '@spryker/actions';
import { DrawerRef, DrawerData, DrawerService } from '@spryker/drawer';
import { ContextService, InjectionTokenType } from '@spryker/utils';
import { Observable, ReplaySubject } from 'rxjs';
import { DrawerActionConfig, DrawerActionTypesDeclaration } from './types';
import { DrawerActionComponentTypesToken } from './token';

@Injectable({
  providedIn: 'root',
})
export class DrawerActionHandlerService implements ActionHandler<unknown, DrawerRef> {
  drawerData$ = new ReplaySubject<DrawerData>(1);
  drawerRef?: DrawerRef;

  private drawerActionHandlerTypes: DrawerActionTypesDeclaration = this.drawerActionHandlers.reduce(
    (components, component) => ({ ...components, ...component }),
    {},
  );

  constructor(
    @Inject(DrawerActionComponentTypesToken)
    private drawerActionHandlers: InjectionTokenType<typeof DrawerActionComponentTypesToken>,
    private drawerService: DrawerService,
  ) {}

  handleAction<C>(injector: Injector, config: DrawerActionConfig, context: C): Observable<DrawerRef<C>> {
    const contextService = injector.get(ContextService);
    const drawerData = { ...config };

    this.drawerData$.next(drawerData.options.data);

    if (!this.drawerRef) {
      if (drawerData.component) {
        if (typeof drawerData.component === 'string') {
          if (drawerData.component in this.drawerActionHandlerTypes) {
            // drawerData.component = this.drawerActionHandlerTypes.component;
          } else {
            throw Error(
              `DrawerActionHandlerService: ${drawerData.component} component not found`,
            );
          }
        }

        contextService.interpolate(drawerData.options.inputs, context as any);
        this.drawerRef = this.drawerService.openComponent(drawerData.component as any, drawerData.options);
      }

      if (drawerData.template) {
        contextService.interpolate(drawerData.options.context, context as any);
        this.drawerRef = this.drawerService.openTemplate(drawerData.template as any, drawerData.options);
      }
    }

    return {};
  }
}
