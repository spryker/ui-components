export interface TemplateIndexSignature {
  [key: string]: {
    [key: string]: string;
  };
}

export const propsTransformation = <
  T extends TemplateIndexSignature & Object,
  O
>(
  template: T,
  prop: string,
  propName: string,
): string | O => {
  const isTemplateObject = typeof template === 'object';
  const isKeyExist =
    template.hasOwnProperty(propName) &&
    template[propName].hasOwnProperty(prop);

  if (!isTemplateObject || !isKeyExist) {
    return prop;
  }

  return template[propName][prop];
};
