import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { ActionHandler } from '@spryker/actions';
import {
  DrawerRef,
  DrawerService,
  DrawerOptionsComponent,
  DrawerOptionsTemplate,
  DrawerOptions,
} from '@spryker/drawer';
import { ContextService, InjectionTokenType } from '@spryker/utils';
import { Observable } from 'rxjs';
import {
  DrawerActionComponentsRegistry,
  DrawerActionComponentType,
  DrawerActionConfig,
  DrawerActionConfigComponent,
  DrawerActionConfigTemplate,
  DrawerActionTypesDeclaration,
} from './types';
import { DrawerActionComponentTypesToken } from './token';

@Injectable({
  providedIn: 'root',
})
export class DrawerActionHandlerService
  implements ActionHandler<unknown, DrawerRef<unknown>> {
  private drawerActionHandlerTypes: DrawerActionTypesDeclaration =
    this.drawerActionHandlers?.reduce(
      (components, component) => ({ ...components, ...component }),
      {},
    ) ?? {};

  constructor(
    private drawerService: DrawerService,
    @Optional()
    @Inject(DrawerActionComponentTypesToken)
    private drawerActionHandlers?: InjectionTokenType<
      typeof DrawerActionComponentTypesToken
    >,
  ) {}

  handleAction<C>(
    injector: Injector,
    config: DrawerActionConfig,
    context: C,
  ): Observable<DrawerRef<C>> {
    return new Observable((subscriber) => {
      const contextService = injector.get(ContextService);
      const drawerData = { ...config } as DrawerActionConfig;

      drawerData.options = { ...drawerData.options };

      const drawerRef = drawerData.component
        ? this.drawerDataComponent(
            drawerData as DrawerActionConfigComponent,
            contextService,
            context,
            injector,
          )
        : this.drawerDataTemplate(
            drawerData as DrawerActionConfigTemplate,
            contextService,
            context,
          );

      subscriber.next(drawerRef as DrawerRef<C, DrawerOptions<C>>);

      return () => {
        drawerRef.close();
      };
    });
  }

  private drawerDataComponent(
    drawerData: DrawerActionConfigComponent,
    contextService: ContextService,
    context: any,
    injector: Injector,
  ): DrawerRef {
    drawerData = { ...drawerData };

    const options = new DrawerOptionsComponent({
      ...drawerData.options,
      inputs: { ...drawerData.options?.inputs },
      injector,
    });

    if (typeof drawerData.component === 'string') {
      if (!this.isDrawerActionRegisteredType(drawerData.component)) {
        throw new Error(
          `DrawerActionHandlerService: ${drawerData.component} component not found`,
        );
      }

      drawerData.component = this.drawerActionHandlerTypes[
        drawerData.component
      ];
    }

    if (options.inputs) {
      Object.entries(options.inputs).forEach(([key, value]) => {
        if (typeof value === 'string') {
          (options.inputs as any)[key] = contextService.interpolate(
            (options.inputs as any)[key],
            context,
          );
        }
      });
    }

    return this.drawerService.openComponent(
      drawerData.component as any,
      options,
    );
  }

  private drawerDataTemplate(
    drawerData: DrawerActionConfigTemplate,
    contextService: ContextService,
    context: any,
  ): DrawerRef {
    const options = new DrawerOptionsTemplate({
      ...drawerData.options,
      context: { ...drawerData.options?.context },
    });

    if (options.context) {
      Object.entries(options.context).forEach(([key, value]) => {
        if (typeof value === 'string') {
          (options.context as any)[key] = contextService.interpolate(
            (options.context as any)[key],
            context,
          );
        }
      });
    }

    return this.drawerService.openTemplate(drawerData.template as any, options);
  }

  private isDrawerActionRegisteredType(
    type: DrawerActionComponentType,
  ): type is keyof DrawerActionComponentsRegistry {
    return type in this.drawerActionHandlerTypes;
  }
}
