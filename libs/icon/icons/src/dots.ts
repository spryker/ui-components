import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
<svg viewBox="0 0 18 4" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(9.000000, 2.000000) rotate(-270.000000) translate(-9.000000, -2.000000) translate(7.000000, -7.000000)">
    <path d="M2,14 C3.1045695,14 4,14.8954305 4,16 C4,17.1045695 3.1045695,18 2,18 C0.8954305,18 0,17.1045695 0,16 C0,14.8954305 0.8954305,14 2,14 Z M2,7 C3.1045695,7 4,7.8954305 4,9 C4,10.1045695 3.1045695,11 2,11 C0.8954305,11 0,10.1045695 0,9 C0,7.8954305 0.8954305,7 2,7 Z M2,0 C3.1045695,0 4,0.8954305 4,2 C4,3.1045695 3.1045695,4 2,4 C0.8954305,4 0,3.1045695 0,2 C0,0.8954305 0.8954305,0 2,0 Z" />
  </g>
</svg>
`;

@NgModule({
    providers: [provideIcons([IconDotsModule])],
})
export class IconDotsModule {
    static icon = 'dots';
    static svg = svg;
}
