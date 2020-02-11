export interface TemplateIndexSignature {
  [key: string]: {
    [key: string]: string;
  };
}

export const propsTransformation = <
  T extends TemplateIndexSignature & Object,
  K extends keyof T,
  K2 extends keyof T[K]
>(
  template: T,
  prop: K2,
  propName: K,
): T[K][K2] | K2 | null => {
  const propValue = template?.[propName]?.[prop] ?? prop;

  return propValue === 'null' ? null : propValue;
};
