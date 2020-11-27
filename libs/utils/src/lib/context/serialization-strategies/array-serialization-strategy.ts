import { Injectable } from '@angular/core';
import { ContextSerializationStrategy } from '../serialization-strategy';
import { ContextSerializationService } from '../context-serialization.service';

@Injectable({
  providedIn: 'root',
})
export class ArrayContextSerializationStrategy
  implements ContextSerializationStrategy<Array<any>> {
  constructor(
    private contextSerializationService: ContextSerializationService,
  ) {}

  canSerialize(value: unknown): value is Array<any> {
    return Array.isArray(value);
  }

  serialize(value: Array<any>): string {
    const serializedValue = this.recursiveMapping(value);

    return `[${serializedValue}]`;
  }

  private recursiveMapping(value: unknown) {
    if (!this.canSerialize(value)) {
      return this.serialization(value);
    }

    return value.map((v) => {
      if (Array.isArray(v)) {
        this.recursiveMapping(v);
      }

      return this.serialization(v);
    });
  }

  private serialization(value: unknown): string {
    return this.contextSerializationService.serialize(value);
  }
}
