import { Injectable } from '@angular/core';
import { ContextSerializationStrategy } from '../serialization-strategy';

@Injectable({
  providedIn: 'root',
})
export class ArrayContextSerializationStrategy
  implements ContextSerializationStrategy<Array<any>> {
  canSerialize(value: unknown): value is Array<any> {
    return Array.isArray(value);
  }

  serialize(value: Array<any>): string {
    return `[${value}]`;
  }
}
