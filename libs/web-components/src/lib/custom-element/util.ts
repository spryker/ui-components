import { as } from '../util/types';
import {
  WebComponentDeclaration,
  WebComponentDeclarationLazy,
  WebComponentDef,
  WebComponentDefs,
  WebComponentType,
} from './types';

export function isDeclarationLazy<T extends WebComponentType>(
  decl: WebComponentDeclaration<T>,
): decl is WebComponentDeclarationLazy<T> {
  as<WebComponentDeclarationLazy<T>>(decl);
  return decl.lazy === true;
}

export function componentDefsToDeclarations(
  def: WebComponentDefs,
): WebComponentDeclaration[] {
  return [
    ...def.filter(isWebComponentDeclaration),
    ...def.filter(isWebComponentType).map(
      component =>
        ({
          component,
          selector: component.selector,
        } as WebComponentDeclaration),
    ),
  ];
}

function isWebComponentType(c: WebComponentDef): c is WebComponentType {
  return !!c && typeof c === 'function';
}

function isWebComponentDeclaration(
  c: WebComponentDef,
): c is WebComponentDeclaration {
  return !!c && !!(c as WebComponentDeclaration).component;
}

export function createGetSet<T>(prop: string, obj: any) {
  const key = `__CustomElement:${prop}`;
  return {
    get: (): T => obj[key],
    set: (val: T): void => void (obj[key] = val),
  };
}

export function exposeMethod(
  obj: any,
  innerObj: any,
  method: string,
  proto: any,
) {
  const protoMethod = createGetSet<Function>(method, proto);
  const protoChecked = createGetSet<boolean>(`${method}_CHECKED`, proto);

  const innerMethod = innerObj[method];
  const overrideMethod = protoChecked.get() ? protoMethod.get() : obj[method];
  const hasOverride = !!overrideMethod;

  const externalMethod = overrideMethod || innerMethod;
  const externalMethodBound = externalMethod.bind(hasOverride ? obj : innerObj);

  innerObj[method] = externalMethodBound;
  obj[method] = externalMethodBound;

  if (!protoChecked.get()) {
    protoChecked.set(true);
    protoMethod.set(overrideMethod);

    // Add original method to prototype only once
    proto[method] = innerMethod;
  }
}
