import {
  AbstractType,
  Injectable,
  InjectFlags,
  InjectionToken,
  Injector,
  NgModuleRef,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
  Type,
} from '@angular/core';

import {
  InterceptionComposableFactoriesToken,
  InterceptionComposableToken,
} from './interception-composable.token';
import { InterceptionComposer } from './types';

/**
 * Represents an Angular's {@link Injector} container in Ivy that supports destruction of all created entities by it.
 */
interface DestructibleInjector
  extends Injector,
    Pick<NgModuleRef<any>, 'destroy'> {}

/**
 * Allows any service to be attached to any component in view at runtime which means components do not have to know about them at compile time.
 * Attached services represent the same logical tree as component view does.
 */
@Injectable()
export class InterceptionComposerImplementation
  implements InterceptionComposer, OnDestroy, OnInit {
  private static NO_SERVICE = { __noService: true };

  private factories = this.injector.get(
    InterceptionComposableFactoriesToken,
    [],
  );
  private token = this.injector.get(InterceptionComposableToken);

  private servicesInjector?: DestructibleInjector;

  constructor(
    private injector: Injector,
    @SkipSelf()
    @Optional()
    private parent?: InterceptionComposerImplementation,
  ) {}

  ngOnDestroy(): void {
    this.servicesInjector?.destroy();
    this.servicesInjector = undefined;
  }

  ngOnInit(): void {
    const applicableFactories = this.factories.filter(factory =>
      factory.canApply(this.token),
    );

    this.servicesInjector = Injector.create({
      providers: [
        applicableFactories
          .map(factory => factory.getServiceProviders())
          .flat(),
      ],
      parent: this.injector,
    }) as DestructibleInjector;

    applicableFactories.forEach(factory =>
      // tslint:disable-next-line: no-non-null-assertion
      this.servicesInjector!.get(factory.getServiceToken()),
    );
  }

  getService<T, N = undefined>(
    token: Type<T> | AbstractType<T> | InjectionToken<T>,
    skipSelf: boolean = false,
    notFoundValue?: N,
  ): T | N {
    const resolvers = [(t: any) => this.getServiceFromParent(t)];

    if (!skipSelf) {
      resolvers.unshift((t: any) => this.getServiceFromLocal(t));
    }

    for (const resolver of resolvers) {
      const service = resolver(token);

      if (service !== InterceptionComposerImplementation.NO_SERVICE) {
        return service as T;
      }
    }

    return notFoundValue as N;
  }

  private getServiceFromLocal<T>(
    token: Type<T> | AbstractType<T> | InjectionToken<T>,
  ): any {
    if (!this.servicesInjector) {
      return InterceptionComposerImplementation.NO_SERVICE;
    }

    return this.servicesInjector.get(
      token,
      InterceptionComposerImplementation.NO_SERVICE as never,
      InjectFlags.Self,
    );
  }

  private getServiceFromParent<T>(
    token: Type<T> | AbstractType<T> | InjectionToken<T>,
  ): any {
    if (!this.parent) {
      return this.getServiceFromGlobal(token);
    }

    return this.parent.getService(
      token,
      false,
      InterceptionComposerImplementation.NO_SERVICE,
    );
  }

  private getServiceFromGlobal<T>(
    token: Type<T> | AbstractType<T> | InjectionToken<T>,
  ): any {
    return this.injector.get(
      token,
      InterceptionComposerImplementation.NO_SERVICE as never,
    );
  }
}

@Injectable()
export abstract class InterceptionComposerService
  implements InterceptionComposer {
  abstract getService<T>(
    token: Type<T> | AbstractType<T> | InjectionToken<T>,
    skipSelf?: boolean,
  ): T | undefined;
}
