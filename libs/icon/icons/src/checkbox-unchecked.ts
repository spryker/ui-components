import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 18 18"><defs><rect id="a" x="0" y="0" width="18" height="18" rx="4"/><rect id="c" x="0" y="0" width="14" height="14" rx="3"/></defs><g fill="none" fill-rule="evenodd"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><use fill="#D8D8D8" xlink:href="#a"/><g mask="url(#b)" fill="#D4D5D7"><path d="M0 0h18v18H0z"/></g><g transform="translate(2 2)"><mask id="d" fill="#fff"><use xlink:href="#c"/></mask><use fill="#D8D8D8" xlink:href="#c"/><g mask="url(#d)" fill="#FFF"><path d="M0 0h14v14H0z"/></g></g></g></svg>
  `;

@NgModule({
  providers: [provideIcons([IconCheckboxUncheckedModule])],
})
export class IconCheckboxUncheckedModule {
  static icon = 'checkbox-unchecked';
  static svg = svg;
}
