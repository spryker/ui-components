import { AbstractType, InjectionToken, Provider, Type } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';

export abstract class InterceptionEvent<D = never> {
    private __capturedData: D = undefined as any;
}

export type InterceptionEventType<D> = Type<InterceptionEvent<D>>;

export type InferInterceptionEventData<T> = T extends InterceptionEvent<infer D> ? D : never;

export type InterceptionHandler<D> = (data: D) => ObservableInput<any>;

export interface InterceptorDispatcher {
    dispatch<D>(event: InterceptionEventType<D>, data: D): Observable<D>;
    dispatch<D extends never>(event: InterceptionEventType<D>): Observable<void>;

    dispatchToAll<D>(event: InterceptionEventType<D>, data: D): Observable<D>;
    dispatchToAll<D extends never>(event: InterceptionEventType<D>): Observable<void>;
}

export interface Interceptor {
    intercept<D>(event: InterceptionEventType<D>, handler: InterceptionHandler<D>): Observable<void>;
}

export interface InterceptionComposableFactory {
    canApply(token: unknown): boolean;
    getServiceProviders(): Provider[];
    getServiceToken(): Type<any> | AbstractType<any> | InjectionToken<any>;
}

export interface InterceptionComposer {
    getService<T>(token: Type<T> | AbstractType<T> | InjectionToken<T>, skipSelf?: boolean): T | undefined;
}
