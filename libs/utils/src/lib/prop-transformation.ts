export interface TemplateIndexSignature {
  [key: string]: {
    [key: string]: string;
  };
}

export const propsTransformation = (
  template: TemplateIndexSignature,
  prop: string,
  propName: string,
): string | null =>
  template?.[propName]?.[prop] || prop === 'null' ? null : prop;
