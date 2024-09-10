import { Injectable } from '@angular/core';

import { getPropByPath } from '../misc';
import { escapeRegex } from '../regex';
import { ContextSerializationService } from './context-serialization.service';

export interface AnyContext {
    [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class ContextOptions {
    interpolationStart = '${';
    interpolationEnd = '}';
    delimiter = '.';
}

@Injectable({ providedIn: 'root' })
export class ContextService {
    private interpolationStart = escapeRegex(this.options.interpolationStart);
    private interpolationEnd = escapeRegex(this.options.interpolationEnd);
    private expressionRegex = new RegExp(
        `${this.interpolationStart}([^${this.interpolationEnd}]+)${this.interpolationEnd}`,
        'g',
    );

    constructor(
        private options: ContextOptions,
        private contextSerializationService: ContextSerializationService,
    ) {}

    /**
     * Just like {@link ContextService.interpolate()} but
     * When there is only one interpolation
     * Then it returns unserialized value of it
     */
    interpolateObj(value: string, ctx: AnyContext): unknown {
        this.expressionRegex.lastIndex = 0; // Reset global regex
        const matches = value.match(this.expressionRegex);

        // When there is only one top level interpolation
        // Return value without serialization
        if (matches && matches.length === 1 && matches[0] === value) {
            return this.interpolateExpression(
                matches[0].replace(this.options.interpolationStart, '').replace(this.options.interpolationEnd, ''),
                ctx,
            );
        }

        // Otherwise fallback to serialization algorithm
        return this.interpolate(value, ctx);
    }

    interpolate(value: string, ctx: AnyContext): string {
        this.expressionRegex.lastIndex = 0; // Reset global regex
        return value.replace(this.expressionRegex, (_, expr) =>
            this.postProcess(this.interpolateExpression(expr, ctx)),
        );
    }

    wrap(value: string): string {
        return `${this.options.interpolationStart}${value}${this.options.interpolationEnd}`;
    }

    interpolateExpression(expr: string, ctx?: AnyContext): unknown {
        return getPropByPath(ctx, expr, this.options.delimiter);
    }

    splitPath(path: string): string[] {
        return path.split(this.options.delimiter);
    }

    cratePath(paths: string[]): string {
        return paths.join(this.options.delimiter);
    }

    private postProcess(value: unknown): string {
        return this.contextSerializationService.serialize(value);
    }
}
