import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
  <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><rect id="a" x="0" y="0" width="18" height="18" rx="4"/><path d="M13.624 5.58l-6.53 6.701a1.263 1.263 0 01-1.814 0L2.375 9.303a1.339 1.339 0 010-1.862 1.259 1.259 0 011.814 0L6.186 9.49l5.624-5.77a1.259 1.259 0 011.814 0 1.339 1.339 0 010 1.861" id="c"/></defs><g fill="none" fill-rule="evenodd"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><use fill="#D8D8D8" xlink:href="#a"/><g mask="url(#b)" fill="#1BBEA0"><path d="M0 0h18v18H0z"/><path d="M0 0h18v18H0z"/></g><g transform="translate(1 1)"><mask id="d" fill="#fff"><use xlink:href="#c"/></mask><use fill="#1BBEA0" xlink:href="#c"/><g mask="url(#d)" fill="#FFF"><path d="M0 0h16v16H0z"/></g></g></g></svg>
`;

@NgModule({
  providers: [provideIcons([IconCheckboxCheckedModule])],
})
export class IconCheckboxCheckedModule {
  static icon = 'checkbox-checked';
  static svg = svg;
}
