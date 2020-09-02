import { Option, OptionConfig } from '@orchestrator/core';
import { anyOf, arrayOf, typeOf } from '@orchestrator/gen-io-ts';

export enum ColumnTypeOptionsType {
  /** Value will be compared with strict equality */
  Literal = 'literal',
  /** Value must be any Javascript type (String, Number, etc.)  */
  TypeOf = 'typeOf',
  /** Value will be compared with every array item. May be recursive */
  ArrayOf = 'arrayOf',
  /** Value must be an array of other types. May be recursive */
  AnyOf = 'anyOf',
}

export interface ColumnTypeOptions {
  /** Is it required */
  required?: boolean;
  /** Expected type. Specify exact type in {@link value} prop */
  type?: ColumnTypeOptionsType;
  /** Value type. See {@link ColumnTypeOptionsType} for more details.
   * May be recursive for some types */
  value?: unknown | ColumnTypeOptions;
}

export function ColumnTypeOption(
  options?: ColumnTypeOptions,
): PropertyDecorator {
  return Option(mapOptions(options));
}

function mapOptions(options?: ColumnTypeOptions): OptionConfig | undefined {
  if (!options) {
    return;
  }

  return {
    required: options.required,
    type: mapOptionsType(options),
  };
}

function mapOptionsType(options: ColumnTypeOptions): any {
  if (!options.type) {
    return;
  }

  switch (options.type) {
    case ColumnTypeOptionsType.Literal:
      return options.value;
    case ColumnTypeOptionsType.TypeOf:
      return typeOf(options.value);
    case ColumnTypeOptionsType.ArrayOf:
      return arrayOf(mapOptionsTypeRecurse(options.value));
    case ColumnTypeOptionsType.AnyOf:
      if (!Array.isArray(options.value)) {
        throw new Error(
          `ColumnTypeOption: Value is not an array for type '${ColumnTypeOptionsType.AnyOf}'`,
        );
      }
      return anyOf(...options.value.map(mapOptionsTypeRecurse));
    default:
      throw new Error(
        `ColumnTypeOption: Unknown type '${options.type}'!
        Please use one of types defined in enum 'ColumnTypeOptionsType'!`,
      );
  }
}

function mapOptionsTypeRecurse(value: unknown): any {
  if (
    typeof value === 'object' &&
    value &&
    'type' in value &&
    'value' in value
  ) {
    return mapOptionsType(value as ColumnTypeOptions);
  }

  return value;
}
