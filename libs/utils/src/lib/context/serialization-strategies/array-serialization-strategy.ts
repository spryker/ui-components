import { Injectable, inject } from '@angular/core';
import { ContextSerializationStrategy } from '../serialization-strategy';
import { ContextSerializationService } from '../context-serialization.service';

@Injectable({
    providedIn: 'root',
})
export class ArrayContextSerializationStrategy implements ContextSerializationStrategy<Array<any>> {
    private contextSerializationService = inject(ContextSerializationService);

    canSerialize(value: unknown): value is Array<any> {
        return Array.isArray(value);
    }

    serialize(value: Array<any>): string {
        const serializedValue = value.map((el) => this.contextSerializationService.serialize(el)).join(',');

        return `[${serializedValue}]`;
    }
}
