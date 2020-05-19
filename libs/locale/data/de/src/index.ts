import { I18nLocaleDataPackageModuleInlined } from '@spryker/locale';

import * as inlineData from './data/data';

export default Object.values<I18nLocaleDataPackageModuleInlined>(
  inlineData as any,
)
  .filter(d => d.data)
  .reduce(
    (acc, d) => ({
      ...acc,
      ...Object.fromEntries(
        Object.entries(d.data).map(([key, value]) => [
          `${d.name}.${key}`,
          value,
        ]),
      ),
    }),
    { locale: 'de' },
  );
