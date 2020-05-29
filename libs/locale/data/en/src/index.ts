import { I18nLocaleDataPackageModuleInlined } from '@spryker/locale';

import * as inlineData from './data/data';

export const data = Object.values<I18nLocaleDataPackageModuleInlined>(
  inlineData as any,
)
  .filter(function(d) {
    return d.data;
  })
  .reduce(
    function(acc, d) {
      return {
        ...acc,
        ...Object.fromEntries(
          Object.entries(d.data).map(function(entries) {
            const key = d.name + '.' + entries[0];
            const value = entries[1];

            return [key, value];
          }),
        ),
      };
    },
    { locale: 'en' },
  );
