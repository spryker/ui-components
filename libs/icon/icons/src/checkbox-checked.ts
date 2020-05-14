import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18"><defs><path d="M14.624 6.58l-6.53 6.701a1.263 1.263 0 01-1.814 0l-2.904-2.978a1.339 1.339 0 010-1.862 1.259 1.259 0 011.814 0l1.996 2.048 5.624-5.77a1.259 1.259 0 011.814 0 1.339 1.339 0 010 1.861" id="a"/></defs><g fill="none" fill-rule="evenodd"><rect fill="#1BBEA0" width="18" height="18" rx="4"/><use fill="#FFF" xlink:href="#a"/></g></svg>
`;

@NgModule({
  providers: [provideIcons([IconCheckboxCheckedModule])],
})
export class IconCheckboxCheckedModule {
  static icon = 'checkbox-checked';
  static svg = svg;
}
