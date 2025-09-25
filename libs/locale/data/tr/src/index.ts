import { I18nLocaleDataPackageModuleInlined } from '@spryker/locale';

import * as inlineData from './data/index.js';

export const data = Object.values<I18nLocaleDataPackageModuleInlined>(inlineData as any)
    .map((d) => d.default)
    .reduce(
        (acc, d) => ({
            ...acc,
            ...Object.fromEntries(Object.entries(d.data).map(([key, value]) => [`${d.name}.${key}`, value])),
        }),
        { locale: 'tr' },
    );
