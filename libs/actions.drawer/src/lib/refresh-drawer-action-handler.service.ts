import { Inject, Injectable, Injector } from '@angular/core';
import { ActionHandler } from '@spryker/actions';
import { DrawerRef, DrawerData } from '@spryker/drawer';
import { ContextService, InjectionTokenType, RegistryDeclaration } from '@spryker/utils';
import { Observable, ReplaySubject } from 'rxjs';
import { DrawerActionComponentsRegistry, DrawerActionConfig } from './types';
import { DrawerActionComponentTypesToken } from './token';

@Injectable({
  providedIn: 'root',
})
export class DrawerActionHandlerService implements ActionHandler<unknown, DrawerRef> {
  drawerData$ = new ReplaySubject<DrawerData>(1);

  private components: RegistryDeclaration<DrawerActionComponentsRegistry> = this.drawerActionComponentTypes.reduce(
    (components, component) => ({ ...components, ...component }),
    {},
  );

  constructor(
    @Inject(DrawerActionComponentTypesToken)
    private drawerActionComponentTypes: InjectionTokenType<typeof DrawerActionComponentTypesToken>,
  ) {}

  handleAction<C>(injector: Injector, config: DrawerActionConfig, context: C): Observable<DrawerRef<C>> {
    const contextService = injector.get(ContextService);
    const drawerData = { ...config };

    this.drawerData$.next(drawerData.options.data);
    return {}
  }
}
