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
  return typeof decl.component === 'function';
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
  return !!c && !!(c as any).component;
}
