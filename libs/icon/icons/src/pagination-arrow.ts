import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
<svg viewBox="0 0 20 14">
  <defs/>
  <path fill-rule="evenodd" d="M14.302.524l.012.012 4.901 4.945c.474.321.785.864.785 1.48v.033c0 .519-.22.986-.574 1.312l-5.112 5.158a1.779 1.779 0 01-2.515.012l-.012-.012-.018-.017a1.787 1.787 0 010-2.516L13.9 8.78H1.787C.8 8.78 0 7.98 0 6.995V6.96c0-.986.8-1.786 1.787-1.786l12.067-.001-2.085-2.104a1.787 1.787 0 010-2.516l.018-.017a1.779 1.779 0 012.515-.012z"/>
</svg>
`;

@NgModule({
  providers: [provideIcons([IconPaginationArrowModule])],
})
export class IconPaginationArrowModule {
  static icon = 'pagination-arrow';
  static svg = svg;
}
