export interface I18nLocaleData {
  locale: string;
  [token: string]: string;
}

export interface I18nLocaleInterpolationData {
  [name: string]: string | number;
}

export interface I18nLocaleDataPackage {
  name: string;
  data: { [token: string]: string };
}

export interface I18nLocaleDataPackageModule {
  default: I18nLocaleDataPackage;
}

export interface I18nLocaleDataPackageModuleInlined {
  [name: string]: I18nLocaleDataPackage;
}
